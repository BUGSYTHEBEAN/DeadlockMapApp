import React from 'react';
import { useSelector } from 'react-redux'
import abrams from "../../assets/agents/abrams_card.png"
import bebop from "../../assets/agents/bebop_card.png"
import calico from "../../assets/agents/calico_card.png"
import dynamo from "../../assets/agents/dynamo_card.png"
import greyTalon from "../../assets/agents/grey_talon_card.png"
import haze from "../../assets/agents/haze_card.png"
import holliday from "../../assets/agents/holliday_card.png"
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
import tms from "../../assets/agents/tms_card.png"
import vindicta from "../../assets/agents/vindicta_card.png"
import viscous from "../../assets/agents/viscous_card.png"
import vyper from "../../assets/agents/vyper_card.png"
import warden from "../../assets/agents/warden_card.png"
import wraith from "../../assets/agents/wraith_card.png"
import yamato from "../../assets/agents/yamato_card.png"
import { useDispatch } from 'react-redux'
import { setDroppedCoordinates, setSelectedAgent, setSelectedTeam } from '../../redux/editorSlice'
import { Tab, TabGroup, TabList } from '@headlessui/react'

export function getUrlFromAgentId(id) {
    switch(id) {
        case 'abrams': return abrams
        case 'bebop': return bebop
        case 'calico': return calico
        case 'dynamo': return dynamo
        case 'greyTalon': return greyTalon
        case 'haze': return haze
        case 'holliday': return holliday
        case 'infernus': return infernus
        case 'ivy': return ivy
        case 'kelvin': return kelvin
        case 'ladyGeist': return ladyGeist
        case 'lash': return lash
        case 'mcginnis': return mcginnis
        case 'mirage': return mirage
        case 'moNKrill': return moNKrill
        case 'paradox': return paradox
        case 'pocket': return pocket
        case 'seven': return seven
        case 'shiv': return shiv
        case 'tms': return tms
        case 'vindicta': return vindicta
        case 'viscous': return viscous
        case 'vyper': return vyper
        case 'warden': return warden
        case 'wraith': return wraith
        case 'yamato': return yamato
        default: return abrams
    }
}

function Agent(props) {
    const dispatch = useDispatch()

    const background = props.team === 'sapphire' ? 'bg-sky-500' : props.team === 'amber' ? 'bg-amber-500' : ''

    return(
        <div className={`rounded-lg ${background} w-full max-w-16 overflow-hidden hover:bg-zinc-100`}>
            <img
                src={props.src}
                className={`cursor-grab w-full transition-transform duration-700 ease-out scale-105 hover:scale-125`}
                onClick={(e) => {
                    dispatch(setSelectedAgent(props.agent))
                }}
                draggable={true}
                onDragEnd={(e) => {
                    dispatch(setSelectedAgent(props.agent))
                    dispatch(setDroppedCoordinates({x: e.pageX, y: e.pageY}))
                }}
            />
        </div>
    )
}

export default function AgentPannel() {
    const dispatch = useDispatch()
    const selectedTeam = useSelector((state) => state.editor.selectedTeam)
    return(
        <div className='h-full place-items-center'>
            <TabGroup className={"rounded-full bg-white/5 p-2"}>
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
                        None
                    </Tab>
                </TabList>
            </TabGroup>
            <div className='overflow-y-auto w-full 2xl:w-4/5 p-2'>
                <div className="grid grid-cols-4 gap-2">
                    <Agent src={abrams} agent={'abrams'} team={selectedTeam} />
                    <Agent src={bebop} agent={'bebop'} team={selectedTeam} />
                    <Agent src={calico} agent={'calico'} team={selectedTeam} />
                    <Agent src={dynamo} agent={'dynamo'} team={selectedTeam} />
                    <Agent src={greyTalon}  agent={'greyTalon'} team={selectedTeam} />
                    <Agent src={haze} agent={'haze'} team={selectedTeam} />
                    <Agent src={holliday} agent={'holliday'} team={selectedTeam} />
                    <Agent src={infernus} agent={'infernus'} team={selectedTeam} />
                    <Agent src={ivy} agent={'ivy'} team={selectedTeam} />
                    <Agent src={kelvin}  agent={'kelvin'} team={selectedTeam} />
                    <Agent src={ladyGeist} agent={'ladyGeist'} team={selectedTeam} />
                    <Agent src={lash} agent={'lash'} team={selectedTeam} />
                    <Agent src={mcginnis} agent={'mcginnis'} team={selectedTeam} />
                    <Agent src={mirage} agent={'mirage'} team={selectedTeam} />
                    <Agent src={moNKrill} agent={'moNKrill'} team={selectedTeam} />
                    <Agent src={paradox} agent={'paradox'} team={selectedTeam} />
                    <Agent src={pocket} agent={'pocket'} team={selectedTeam} />
                    <Agent src={seven} agent={'seven'} team={selectedTeam} />
                    <Agent src={shiv} agent={'shiv'} team={selectedTeam} />
                    <Agent src={tms} agent={'tms'} team={selectedTeam} />
                    <Agent src={vindicta} agent={'vindicta'} team={selectedTeam} />
                    <Agent src={viscous} agent={'viscous'} team={selectedTeam} />
                    <Agent src={vyper} agent={'vyper'} team={selectedTeam} />
                    <Agent src={warden} agent={'warden'} team={selectedTeam} />
                    <Agent src={wraith} agent={'wraith'} team={selectedTeam} />
                    <Agent src={yamato} agent={'yamato'} team={selectedTeam} />
                </div>
            </div>
        </div>
    )
}