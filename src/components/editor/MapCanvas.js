import React from 'react';
import { useSelector } from 'react-redux'
import { Stage, Layer, Text, Image, Line } from 'react-konva';
import useImage from 'use-image';
import { useDispatch } from 'react-redux'
import { setAgentList, setDroppedCoordinates, setIsClearAgents, setIsClearAll, setIsClearLines, setIsDownload, setIsSaveMap, setMapId, setSelectedAgent } from '../../redux/editorSlice'

// map imports
import mapOutline from '../../assets/map/map_outline.png'
import mapDetails from '../../assets/map/map_details.png'
import mapLaneObjectives from '../../assets/map/map_laneobjectives.png'
import mapJungle from '../../assets/map/map_jg.png'
import { createMap, getMap } from '../../tables/maps';
import { getMapFromQueryParams } from '../../utils/queryUtils';
import { getUrlFromAgentId } from './AgentPannel';

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

    const [lines, setLines] = React.useState([]);
    const [agents, setAgents] = React.useState([]);

    const isDrawing = React.useRef(false);

    const stageRef = React.useRef(null);

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

    return(
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
            </Layer>
        </Stage>
        </div>
    )
}