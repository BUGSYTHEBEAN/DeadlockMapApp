import React from 'react';
import { useSelector } from 'react-redux'
import abrams from "../../assets/agents/abrams_card.png"
import bebop from "../../assets/agents/bebop_card.png"
import dynamo from "../../assets/agents/dynamo_card.png"
import greyTalon from "../../assets/agents/grey_talon_card.png"
import haze from "../../assets/agents/haze_card.png"
import infernus from "../../assets/agents/infernus_card.png"
import ivy from "../../assets/agents/ivy_card.png"
import kelvin from "../../assets/agents/kelvin_card.png"
import ladyGeist from "../../assets/agents/lady_geist_card.png"
import lash from "../../assets/agents/lash_card.png"
import mcginnis from "../../assets/agents/mcginnis_card.png"
import mirage from "../../assets/agents/mirage_card.png"
import moNKrill from "../../assets/agents/mo_n_krill_card.png"
import paradox from "../../assets/agents/paradox_card.png"
import pocket from "../../assets/agents/pocket_card.png"
import seven from "../../assets/agents/seven_card.png"
import shiv from "../../assets/agents/shiv_card.png"
import vindicta from "../../assets/agents/vindicta_card.png"
import viscous from "../../assets/agents/viscous_card.png"
import warden from "../../assets/agents/warden_card.png"
import wraith from "../../assets/agents/wraith_card.png"
import yamato from "../../assets/agents/yamato_card.png"
import { useDispatch } from 'react-redux'
import { setDroppedCoordinates, setSelectedAgent, setSelectedTeam } from '../../redux/editorSlice'
import { Tab, TabGroup, TabList } from '@headlessui/react'

function Agent(props) {
    const dispatch = useDispatch()

    const background = props.team === 'sapphire' ? 'bg-sky-500' : props.team === 'amber' ? 'bg-amber-500' : ''

    return(
        <img
            src={props.agent}
            className={`rounded-lg ${background} hover:bg-zinc-100 cursor-grab`}
            onClick={(e) => {
                dispatch(setSelectedAgent(props.agent))
            }}
            draggable={true}
            onDragEnd={(e) => {
                dispatch(setSelectedAgent(props.agent))
                dispatch(setDroppedCoordinates({x: e.pageX, y: e.pageY}))
            }}
        />
    )
}

export default function AgentPannel() {
    const dispatch = useDispatch()
    const selectedTeam = useSelector((state) => state.editor.selectedTeam)
    return(
        <div className='min-h-full place-items-center'>
            <TabGroup className={"rounded-full bg-white/5 p-2 my-2"}>
                <TabList className="flex gap-4">
                    <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-sky-500 data-[hover]:bg-sky-200 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        onClick={() => dispatch(setSelectedTeam('sapphire'))}
                    >
                        Sapphire
                    </Tab>
                    <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-amber-500 data-[hover]:bg-amber-200 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        onClick={() => dispatch(setSelectedTeam('amber'))}
                    >
                        Amber
                    </Tab>
                    <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-zinc-600 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        onClick={() => dispatch(setSelectedTeam(''))}
                    >
                        No Background
                    </Tab>
                </TabList>
            </TabGroup>
            <div className="grid grid-cols-4 gap-2 w-4/5 max-h-full">
                <Agent agent={abrams} team={selectedTeam} />
                <Agent agent={bebop} team={selectedTeam} />
                <Agent agent={dynamo} team={selectedTeam} />
                <Agent agent={greyTalon} team={selectedTeam} />
                <Agent agent={haze} team={selectedTeam} />
                <Agent agent={infernus} team={selectedTeam} />
                <Agent agent={ivy} team={selectedTeam} />
                <Agent agent={kelvin} team={selectedTeam} />
                <Agent agent={ladyGeist} team={selectedTeam} />
                <Agent agent={lash} team={selectedTeam} />
                <Agent agent={mcginnis} team={selectedTeam} />
                <Agent agent={mirage} team={selectedTeam} />
                <Agent agent={moNKrill} team={selectedTeam} />
                <Agent agent={paradox} team={selectedTeam} />
                <Agent agent={pocket} team={selectedTeam} />
                <Agent agent={seven} team={selectedTeam} />
                <Agent agent={shiv} team={selectedTeam} />
                <Agent agent={vindicta} team={selectedTeam} />
                <Agent agent={viscous} team={selectedTeam} />
                <Agent agent={warden} team={selectedTeam} />
                <Agent agent={wraith} team={selectedTeam} />
                <Agent agent={yamato} team={selectedTeam} />
            </div>
        </div>
    )
}