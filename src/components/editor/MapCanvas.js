import React from 'react';
import { useSelector } from 'react-redux'
import { Stage, Layer, Text, Image, Line, Rect, Group, Arrow } from 'react-konva';
import useImage from 'use-image';
import { useDispatch } from 'react-redux'
import { setAgentList, setDroppedCoordinates, setIsClearAgents, setIsClearAll, setIsClearLines, setIsDownload, setIsSaveMap, setMapId, setSelectedAgent } from '../../redux/editorSlice'

// map imports
import mapOutline from '../../assets/map/map_outline.png'
import mapDetails from '../../assets/map/map_details.png'
import mapLaneObjectives from '../../assets/map/map_laneobjectives.png'
import mapJungle from '../../assets/map/map_jg.png'
import midBoss from '../../assets/other/mid_boss.png'
import { createMap, getMap } from '../../tables/maps';
import { getMapFromQueryParams } from '../../utils/queryUtils';
import { getAgentIdFromNumericId, getUrlFromAgentId } from './AgentPannel';
import { Button, Description, Dialog, DialogPanel, DialogTitle, Input } from '@headlessui/react';
import { getFormattedMatchTime } from '../../utils/dateUtils';
import { getMatchById } from '../../utils/deadlockApi';

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 700

const MapOutline = () => {
    const [image] = useImage(mapOutline)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const MapDetails = () => {
    const [image] = useImage(mapDetails)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const MapLaneObjectives = () => {
    const [image] = useImage(mapLaneObjectives)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const MapJungle = () => {
    const [image] = useImage(mapJungle)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const FeedIcon_MidBoss = (props) => {
    const [image] = useImage(midBoss)
    const primaryColor = props.team === 1 ? '#0ea5e9' : '#f59e0b'
    return(
        <Group x={CANVAS_WIDTH-110} y={10}>
            <Image image={image} width={100} stroke={primaryColor} height={42} strokeWidth={2} cornerRadius={10} />
            {props.steal && <Text text="STEAL" fill="#fff" x={7} y={12} fontSize={26} fontFamily='sans-serif' fontStyle='bold'/>}
        </Group>
    )
}

const FeedIcon_Kill = (props) => {
    const [image1] = useImage(getUrlFromAgentId(props.agent1.agentId))
    const [image2] = useImage(getUrlFromAgentId(props.agent2.agentId))
    const primaryColor = props.agent2.team === 'sapphire' ? '#0ea5e9' : '#f59e0b'
    return(
        <Group x={CANVAS_WIDTH-110} y={10} >
            <Rect cornerRadius={10} stroke={primaryColor} fill={primaryColor} strokeWidth={4} width={100} height={42} />
            <Image image={image2} width={30} height={40} x={1} y={1} cornerRadius={10} fill={primaryColor }/>
            <Image image={image1} width={30} height={40} x={69} y={1} cornerRadius={10} fill={props.agent1.team === 'sapphire' ? '#075985' : '#92400e' }/>
            <Arrow x={33} y={20} points={[0,0,30,0]} strokeWidth={6} pointerLength={8} stroke={'#171717'} fill={'#171717'}/>
            <Text text="X" fill="#171717" x={74} y={10} fontSize={30} fontFamily='sans-serif'/>
        </Group>
    )
}

const Agent = (props) => {
    const dispatch = useDispatch()
    const agentList = useSelector((state) => state.editor.agentList)
    const [image] = useImage(getUrlFromAgentId(props.agentId))
    return(
        <Image
            onDragEnd={(e) => {
                dispatch(setAgentList(agentList.map((v, i) => i === props.index 
                    ? {x: Math.floor(e.target.x()), y: Math.floor(e.target.y()), agentId: props.agentId, team: props.team}
                    : v)))
            }}
            image={image}
            width={42}
            height={57}
            x={(props.x ?? CANVAS_WIDTH / 2) - 21}
            y={(props.y ?? CANVAS_HEIGHT / 2) - 28}
            cornerRadius={5}
            draggable
            fill={props.team === 'sapphire' ? '#0ea5e9' : props.team === 'amber' ? '#f59e0b' : undefined}
        />)
}

export default function MapCanvas(props) {
    const dispatch = useDispatch()
    // State vars
    const drawingColor = useSelector((state) => state.editor.drawingColor)
    const drawingSize = useSelector((state) => state.editor.drawingSize)
    const selectedAgent = useSelector((state) => state.editor.selectedAgent)
    const droppedCoordinates = useSelector((state) => state.editor.droppedCoordinates)
    const selectedTeam = useSelector((state) => state.editor.selectedTeam)
    const isMapDetail = useSelector((state) => state.editor.isMapDetail)
    const isMapLaneObjectives = useSelector((state) => state.editor.isMapLaneObjectives)
    const isMapJungle = useSelector((state) => state.editor.isMapJungle)
    const isClearAll = useSelector((state) => state.editor.isClearAll)
    const isClearAgents = useSelector((state) => state.editor.isClearAgents)
    const isClearLines = useSelector((state) => state.editor.isClearLines)
    const isDownload = useSelector((state) => state.editor.isDownload)
    const isSaveMap = useSelector((state) => state.editor.isSaveMap)
    const agentList = useSelector((state) => state.editor.agentList)
    const matchId = useSelector((state) => state.editor.matchId)

    const [isMatchById, setIsMatchById] = React.useState(false);
    const [isMatchByIdError, setIsMatchByIdError] = React.useState(false);
    const [matchResponse, setMatchResponse] = React.useState({});
    const [matchTime, setMatchTime] = React.useState(0);
    const [lines, setLines] = React.useState([]);
    const [agents, setAgents] = React.useState([]);
    const [feed, setFeed] = React.useState([]);

    const isDrawing = React.useRef(false);
    const stageRef = React.useRef(null);

    const deathTimes = isMatchById && matchResponse && matchResponse.match_info.players.map(p => {
        const deathSet = p.death_details.reduce((acc, cur) => {
            for (let i = 0; i < cur.death_duration_s + 5; i++) {
                acc.set((cur.game_time_s + i).toString(), cur.killer_player_slot)
            }
            return acc
        }, new Map())

        return {slot: p.player_slot, deaths: deathSet}
    })

    React.useEffect(() => {
        const mapId = getMapFromQueryParams()
        if (mapId) {
            getMap(mapId).then((map) => {
                // console.log(map.at(0))
                setLines(JSON.parse(map.at(0).lines))
                const agentsDownloaded = JSON.parse(map.at(0).agents)
                dispatch(setAgentList(agentsDownloaded))
                setAgents(agentsDownloaded.map((a, i) => <Agent agentId={a.agentId} key={i} team={a.team} index={i} x={a.x} y={a.y} />))
            })
        }
    }, [])

    const getMousePosOnCanvas = (mousePos) => {
        const stagePos = stageRef.current.position()
        const stageScale = stageRef.current.scaleX()
        return {x: (mousePos.x - stagePos.x) / stageScale, y: (mousePos.y - stagePos.y) / stageScale}
    }

    React.useEffect(() => {
        if(selectedAgent.length > 0 && droppedCoordinates.x && droppedCoordinates.y && stageRef != null) {
            const canvaspos = stageRef.current.attrs.container.getBoundingClientRect()
            const dropPos = getMousePosOnCanvas({x: droppedCoordinates.x - canvaspos.x, y: droppedCoordinates.y - canvaspos.y})
            if (dropPos.x < 0 || dropPos.x > CANVAS_WIDTH || dropPos.y < 0 || dropPos.y > CANVAS_HEIGHT) {
                dispatch(setSelectedAgent(""))
                dispatch(setDroppedCoordinates({x: undefined, y: undefined}))
                return
            }
            dispatch(setAgentList([...agentList, {x: dropPos.x, y: dropPos.y, agentId: selectedAgent, team: selectedTeam}]))
            setAgents(agents.concat(<Agent
                agentId={selectedAgent}
                key={agents.length}
                team={selectedTeam}
                x={dropPos.x}
                y={dropPos.y}
                index={agentList.length}
            />))
            dispatch(setSelectedAgent(""))
            dispatch(setDroppedCoordinates({x: undefined, y: undefined}))
            return
        }
        if(selectedAgent.length > 0) {
            const x = Math.floor(CANVAS_WIDTH / 2)
            const y = Math.floor(CANVAS_HEIGHT / 2)
            dispatch(setAgentList([...agentList, {x: x, y: y, agentId: selectedAgent, team: selectedTeam}]))
            setAgents(agents.concat(<Agent agentId={selectedAgent} key={agents.length} team={selectedTeam} index={agentList.length} x={x} y={y}/>))
            dispatch(setSelectedAgent(""))
        }
    }, [selectedAgent])

    React.useEffect(() => {
        if(isClearAll) {
            setLines([])
            setAgents([])
            setAgentList([])
            dispatch(setIsClearAll(false))
        }
        if(isClearAgents) {
            setAgents([])
            setAgentList([])
            dispatch(setIsClearAgents(false))
        }
        if(isClearLines) {
            setLines([])
            dispatch(setIsClearLines(false))
        }
    }, [isClearAll, isClearAgents, isClearLines])

    React.useEffect(() => {
        if(isDownload) {
            handleExport()
            dispatch(setIsDownload(false))
        }
    }, [isDownload])

    React.useEffect(() => {
        if(isSaveMap) {
            createMap(lines, agentList, props.session?.user?.id).then(id => {
                dispatch(setMapId(id))
        })
            dispatch(setIsSaveMap(false))
        }
    }, [isSaveMap])

    const handleMouseDown = (e) => {
        isDrawing.current = true
        const pos = getMousePosOnCanvas(e.target.getStage().getPointerPosition())
        setLines([...lines, { points: [pos.x, pos.y], color: drawingColor, size: drawingSize }])
    }

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = getMousePosOnCanvas(stage.getPointerPosition());
        let lastLine = lines[lines.length - 1];
        //skip adding if points are very close
        if(lastLine.points.length >= 2) {
            const lastPointx = lastLine.points[lastLine.points.length - 2]
            const lastPointy = lastLine.points[lastLine.points.length - 1]
            if (Math.abs(lastPointx - point.x) < 10 && Math.abs(lastPointy - point.y) < 10) {
                return
            }
        }
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = (e) => {
        isDrawing.current = false;
    };

    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        var link = document.createElement('a');
        link.download = 'example.png';
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleWheel = (e) => {
        e.evt.preventDefault();

        const stage = stageRef.current;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const direction = e.evt.deltaY > 0 ? -1 : 1;

        const scaleBy = 1.03;
        let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        if (newScale <= 1) {
            stage.scale({ x: 1, y: 1 });
            stage.position({x: 0, y: 0});
            return
        } else if (newScale > 2.5) {
            newScale = 2.5
        }
        stage.scale({ x: newScale, y: newScale });

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
    };

    // Loading match by ID
    React.useEffect(() => {
        if (matchId) {
            getMatchById(matchId).then((v) => {
                setMatchResponse(v)
                // console.log(v)
                setIsMatchById(true)
                setMatchTime(15)
            }).catch(e => {
                setIsMatchById(false)
                setIsMatchByIdError(true)
            })
        }
    }, [matchId])

    React.useEffect(() => {
        if (isMatchById && matchResponse) {
            let matchAgents = matchResponse.match_info.players.map(
                    p => { return {agentId: getAgentIdFromNumericId(p.hero_id), slot: p.player_slot, team: p.team === 1 ? 'sapphire' : 'amber'} }
                ).sort((a, b) => a.slot - b.slot)
            matchResponse.match_info.match_paths.paths.map(p => {
                matchAgents[p.player_slot - 1] = {
                    ...matchAgents[p.player_slot - 1],
                    x: (p.x_min + ((p.x_max - p.x_min) * (p.x_pos[matchTime] ?? 0) / matchResponse.match_info.match_paths.x_resolution)) * CANVAS_WIDTH / (matchResponse.match_info.match_paths.x_resolution + 2400) + CANVAS_WIDTH / 2,
                    y: -(p.y_min + ((p.y_max - p.y_min) * (p.y_pos[matchTime] ?? 0) / matchResponse.match_info.match_paths.y_resolution)) * CANVAS_HEIGHT / matchResponse.match_info.match_paths.y_resolution + CANVAS_HEIGHT / 2
                }
            })
            setFeed(deathTimes.map(e => {
                if (e.deaths.has(matchTime.toString())) {
                    return <FeedIcon_Kill agent1={matchAgents[e.slot - 1]} agent2={matchAgents[e.deaths.get(matchTime.toString()) - 1]}/>
                }
            }).concat(matchResponse.match_info?.mid_boss.map(v => v.destroyed_time_s <= matchTime && v.destroyed_time_s + 45 > matchTime
                && <FeedIcon_MidBoss team={v.team_claimed} steal={v.team_claimed != v.team_killed}/>)).filter(Boolean))
            dispatch(setAgentList(matchAgents.map(p => {return {x: p.x, y: p.y, agentId: p.agentId, team: p.team}})))
            setAgents(matchAgents.map((p, i) => <Agent
                agentId={p.agentId}
                key={i}
                team={p.team}
                x={p.x}
                y={p.y}
                index={i}
            />).filter(Boolean))
        }
    }, [matchTime])

    return(
        <div>
            <div onDragOver={(e) => e.preventDefault()} onMouseLeave={handleMouseUp} className='size-min'>
            <Stage
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                onWheel={handleWheel}
                ref={stageRef}
            >
                <Layer>
                    <MapOutline />
                    {isMapDetail && <MapDetails />}
                    {isMapLaneObjectives && <MapLaneObjectives />}
                    {isMapJungle && <MapJungle />}
                    {lines.map((line, i) => (
                        // Code to handle drawing on the map
                        <Line
                            key={i}
                            points={line.points}
                            stroke={line.color}
                            strokeWidth={line.size}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation="source-over"
                        />
                    ))}
                    {agents}
                    <Text text="dlkmap.com" fill="#fff" x={CANVAS_WIDTH - 120} y={CANVAS_HEIGHT - 20} fontSize={18} fontFamily='serif'/>
                    {
                      isMatchById && <Text text={getFormattedMatchTime(matchTime)} fill="#fff" x={20} y={20} fontSize={38} fontFamily='serif'/>
                    }
                    { isMatchById && feed.map((v, i) => <Group y={i*50} key={i}>{v}</Group>) }
                </Layer>
            </Stage>
            </div>
            {
                isMatchById && <Input 
                    className={'w-[800px] accent-red-700'}
                    type='range'
                    value={matchTime}
                    onChange={e => {setMatchTime(e.target.value)}}
                    min={0}
                    max={matchResponse.match_info.duration_s}
                />
            }
            <Dialog open={isMatchByIdError} onClose={() => setIsMatchByIdError(false)} className={''}>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border-2 bg-neutral-950 p-8 text-white rounded-3xl">
                        <DialogTitle className="flex flex-row font-bold text-2xl">
                            <div className='px-1 text-transparent bg-clip-text bg-gradient-to-br from-orange-700 to-purple-500 font-bold'>BETA</div>
                            Load Match from ID
                            <Button className="rounded-md py-0.5 px-3 ml-auto mr-0 text-sm/6 font-semibold text-neutral-100 shadow-inner shadow-white/20 focus:outline-none data-[hover]:bg-white/10"
                                onClick={() => setIsMatchByIdError(false)}
                            >
                                Close
                            </Button>
                        </DialogTitle>
                        <Description className={'text-gray-400 text-md'}>Error loading match from ID. Try another id, or if this was a valid id you can contact @bugsythebean on discord or bugsythebean@gmail.com</Description>
                        <Input className={'rounded-md h-8 w-full px-2 mr-2 bg-neutral-800'} type='text' disabled value={`Match ID: ${matchId}`}/>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}