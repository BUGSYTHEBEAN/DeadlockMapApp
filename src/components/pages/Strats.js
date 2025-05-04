import Header from "../common/Header";
import AgentPannel from "../editor/AgentPannel";
import MapCanvas from "../editor/MapCanvas";
import OptionsPannel from "../editor/OptionsPannel";

export default function Home(props) {
    return(
        <div className="bg-neutral-900 min-h-screen">
            <Header session={props.session} />
            <div className="flex flex-row">
                <div className="basis-1/4"><OptionsPannel session={props.session} /></div>
                <div className="basis-2/4"><MapCanvas session={props.session} /></div>
                <div className="basis-1/4"><AgentPannel /></div>
            </div>
        </div>
    )
}