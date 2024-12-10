import React from 'react';
import { useSelector } from 'react-redux'
import { Stage, Layer, Star, Text, Image, Line } from 'react-konva';
import useImage from 'use-image';
import { useDispatch } from 'react-redux'
import { setIsClearAgents, setIsClearAll, setIsClearLines, setIsDownload, setSelectedAgent } from '../../redux/editorSlice'

// map imports
import mapOutline from '../../assets/map/map_outline.png'
import mapDetails from '../../assets/map/map_details.png'
import mapLaneObjectives from '../../assets/map/map_laneobjectives.png'

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

const Agent = (props) => {
    const [image] = useImage(props.url)
    return(
        <Image
            image={image}
            width={42}
            height={57}
            x={CANVAS_WIDTH / 2 - 21}
            y={CANVAS_HEIGHT / 2 - 28}
            cornerRadius={5}
            draggable
            fill={props.team === 'sapphire' ? '#0ea5e9' : props.team === 'amber' ? '#f59e0b' : undefined}
        />)
}

export default function MapCanvas() {
    const dispatch = useDispatch()
    // State vars
    const drawingColor = useSelector((state) => state.editor.drawingColor)
    const selectedAgent = useSelector((state) => state.editor.selectedAgent)
    const selectedTeam = useSelector((state) => state.editor.selectedTeam)
    const isMapDetail = useSelector((state) => state.editor.isMapDetail)
    const isMapLaneObjectives = useSelector((state) => state.editor.isMapLaneObjectives)
    const isClearAll = useSelector((state) => state.editor.isClearAll)
    const isClearAgents = useSelector((state) => state.editor.isClearAgents)
    const isClearLines = useSelector((state) => state.editor.isClearLines)
    const isDownload = useSelector((state) => state.editor.isDownload)

    const [lines, setLines] = React.useState([]);
    const [agents, setAgents] = React.useState([]);
    const isDrawing = React.useRef(false);

    const stageRef = React.useRef(null);

    React.useEffect(() => {
        if(selectedAgent.length > 0) {
            setAgents(agents.concat(<Agent url={selectedAgent} key={agents.length} team={selectedTeam}/>))
            dispatch(setSelectedAgent(""))
        }
    }, [selectedAgent])

    React.useEffect(() => {
        if(isClearAll) {
            setLines([])
            setAgents([])
            dispatch(setIsClearAll(false))
        }
        if(isClearAgents) {
            setAgents([])
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

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { points: [pos.x, pos.y], color: drawingColor }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
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

    return(
        <Stage
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            ref={stageRef}
        >
            <Layer>
                <MapOutline />
                {isMapDetail && <MapDetails />}
                {isMapLaneObjectives && <MapLaneObjectives />}
                {lines.map((line, i) => (
                    // Code to handle drawing on the map
                    <Line
                        key={i}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={12}
                        tension={0.5}
                        lineCap="round"
                        lineJoin="round"
                        globalCompositeOperation="source-over"
                    />
                ))}
                {agents}
                <Text text="exampleurl.gg" fill="#fff" x={CANVAS_WIDTH - 120} y={CANVAS_HEIGHT - 20} fontSize={18}/>
            </Layer>
        </Stage>
    )
}