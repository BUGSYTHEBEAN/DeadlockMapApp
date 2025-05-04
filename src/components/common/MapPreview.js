import { Image, Layer, Line, Stage } from "react-konva"
import useImage from "use-image"
import mapOutline from '../../assets/map/map_outline.png'
import mapLaneObjectives from '../../assets/map/map_laneobjectives.png'
import { getUrlFromAgentId } from "../editor/AgentPannel"
import { getFormattedDate } from "../../utils/dateUtils"
import { useNavigate } from "react-router"

const CANVAS_HEIGHT = 256
const CANVAS_WIDTH = 256

const MapOutline = () => {
    const [image] = useImage(mapOutline)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} fill={'#171717'}/>)
}

const MapLaneObjectives = () => {
    const [image] = useImage(mapLaneObjectives)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const Agent = (props) => {
    const [image] = useImage(getUrlFromAgentId(props.agentId))
    return(
        <Image
            onDragEnd={(e) => {}}
            image={image}
            width={30}
            height={40}
            x={(props.x ?? CANVAS_WIDTH / 2) - 15}
            y={(props.y ?? CANVAS_HEIGHT / 2) - 20}
            cornerRadius={5}
            fill={props.team === 'sapphire' ? '#0ea5e9' : props.team === 'amber' ? '#f59e0b' : undefined}
        />)
}

export default function MapPreview(props) {
    const navigate = useNavigate()
    const lines = JSON.parse(props?.map?.lines)
    const agents = JSON.parse(props?.map?.agents).map((a, i) => <Agent agentId={a.agentId} key={i} team={a.team} index={i} x={a.x * 256/800} y={a.y * 256/700} />)

    return(
        <div className="bg-neutral-200 h-64 w-64 rounded-lg border-2 overflow-hidden hover:border-sky-500 relative z-0 cursor-pointer" onClick={() => {
            navigate(`/strats?map=${props?.map?.id}`)
        }}>
            <Stage
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="z-0"
            >
                <Layer>
                    <MapOutline />
                    <MapLaneObjectives />
                    {lines.map((line, i) => (
                        // Code to handle drawing on the map
                        <Line
                            key={i}
                            points={line.points.map((p, i) => i % 2 == 0 ? p * 256/800 : p * 256 / 700)}
                            stroke={line.color}
                            strokeWidth={line.size - 2}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation="source-over"
                        />
                    ))}
                    {agents}
                </Layer>
            </Stage>
            <div className="bg-neutral-900 h-64 w-64 opacity-0 hover:opacity-75 absolute inset-0 flex justify-center items-center z-10">
                <div className="text-white">
                    Created on: {getFormattedDate(Date.parse(props?.map?.created_at))}
                </div>
            </div>
        </div>
    )
}