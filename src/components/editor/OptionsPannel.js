import React from 'react';
import { useSelector } from 'react-redux'
import { Tab, TabGroup, TabList, Disclosure, DisclosureButton, DisclosurePanel, Button, RadioGroup, Radio, Dialog, DialogPanel, DialogTitle, Description, Input } from '@headlessui/react'
import {
    PencilIcon, ChevronDownIcon, TrashIcon,
    BookmarkIcon,
    ArrowDownTrayIcon,
    LinkIcon,
    GlobeAmericasIcon,
    ArrowUpTrayIcon
  } from '@heroicons/react/16/solid'
import { useDispatch } from 'react-redux'
import { setDrawingColor, setDrawingSize, setIsClearAgents, setIsClearAll, setIsClearLines, setIsDownload, setIsMapDetail, setIsMapJungle, setIsMapLaneObjectives, setIsSaveMap, setMatchId } from '../../redux/editorSlice'
import { useNavigate } from 'react-router';

export default function OptionsPannel(props) {
    const dispatch = useDispatch()
    const mapId = useSelector((state) => state.editor.mapId)
    const navigate = useNavigate()

    const [color, setColor] = React.useState('#fff')
    const [isSaveModalOpen, setIsSaveModalOpen] = React.useState(false)
    const [saveModalButtonText, setSaveModalButtonText] = React.useState('Save Map')
    const [isLoading, setIsLoading] = React.useState(false)
    const [mapLinkText, setMapLinkText] = React.useState('dlkmap.com?map=your-map-here')
    const [matchIdText, setMatchIdText] = React.useState('')

    React.useEffect(() => {
        dispatch(setDrawingColor(color))
    }, [color])

    React.useEffect(() => {
        if (mapId) {
            setMapLinkText(`dlkmap.com/strats?map=${mapId}`)
            setIsLoading(false)
            setSaveModalButtonText('Copy')
        }
    }, [mapId])

    const handleSaveButton = () => {
        if (mapId) {
            navigator.clipboard.writeText(mapLinkText)
            try {
                setSaveModalButtonText('Copied')
                setTimeout(() => {
                    setSaveModalButtonText('Copy')
                }, 1000);
            } catch {
                console.log('Error copying to clipboard!')
            }
            return
        }
        dispatch(setIsSaveMap(true))
        setSaveModalButtonText('Loading...')
        setIsLoading(true)
    }

    return(
        <div className="place-items-center">
            <div className="mx-auto w-72 max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                <Disclosure as="div" className="p-3" defaultOpen={false}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="flex items-center text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                            <ArrowUpTrayIcon className="size-4 fill-white/30 mr-1" />
                            <div className='px-1 text-transparent bg-clip-text bg-gradient-to-br from-orange-700 to-purple-500 font-bold'>BETA</div>
                            Load Match ID
                        </span>
                        <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                        <Input className={'rounded-md h-8 w-full px-2 mr-2 bg-neutral-700'} type='text' placeholder='12345678' value={matchIdText} onChange={e => setMatchIdText(e.target.value)}/>
                        <Button className="rounded-full flex items-center mt-2 w-full py-1 justify-center text-sm/6 font-semibold text-neutral-100 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-sky-700"
                            onClick={() => dispatch(setMatchId(matchIdText))}
                        >
                            <ArrowUpTrayIcon className="size-4 fill-white/30 mr-1" />
                            {matchIdText.length > 0 ? 'Load Match' : 'Enter Match ID'}
                        </Button>
                    </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="p-3" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="flex items-center text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                            <GlobeAmericasIcon className="size-4 fill-white/30 mr-1" />
                            Map Options
                        </span>
                        <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                    <TabGroup className={"rounded-full bg-white/5 p-2 my-2"}>
                        {
                        // https://headlessui.com/react/tabs
                        }
                        <TabList className="flex gap-4">
                            <Tab className="rounded-full py-1 px-3 w-1/2 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={() => dispatch(setIsMapDetail(true))}
                            >
                                Show Details
                            </Tab>
                            <Tab className="rounded-full py-1 px-3 w-1/2 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={() => dispatch(setIsMapDetail(false))}
                            >
                                Disabled
                            </Tab>
                        </TabList>
                    </TabGroup>
                    <TabGroup className={"rounded-full bg-white/5 p-2 my-2"}>
                        <TabList className="flex gap-4">
                            <Tab className="rounded-full py-1 px-3 w-1/2 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={() => dispatch(setIsMapLaneObjectives(true))}
                            >
                                Show Lanes
                            </Tab>
                            <Tab className="rounded-full py-1 px-3 w-1/2 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={() => dispatch(setIsMapLaneObjectives(false))}
                            >
                                Disabled
                            </Tab>
                        </TabList>
                    </TabGroup>
                    <TabGroup className={"rounded-full bg-white/5 p-2 my-2"} defaultIndex={1}>
                        <TabList className="flex gap-4">
                            <Tab className="rounded-full py-1 px-3 w-1/2 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={() => dispatch(setIsMapJungle(true))}
                            >
                                Show Jungle
                            </Tab>
                            <Tab className="rounded-full py-1 px-3 w-1/2 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={() => dispatch(setIsMapJungle(false))}
                            >
                                Disabled
                            </Tab>
                        </TabList>
                    </TabGroup>
                    </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="p-3" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="flex items-center text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                            <PencilIcon className="size-4 fill-white/30 mr-1" />
                            Draw
                        </span>
                        <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel>
                        <RadioGroup value={color} onChange={setColor} className="grid grid-cols-5 gap-2 w-full my-2">
                            <Radio className="bg-white h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-neutral-500" key={'white'} value={'#fff'}/>
                            <Radio className="bg-zinc-500 h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-sky-200" key={'grey'} value={'#71717a'}/>
                            <Radio className="bg-black h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-sky-200" key={'black'} value={'#000'}/>
                            <Radio className="bg-orange-500 h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-sky-200" key={'orange'} value={'#f97316'}/>
                            <Radio className="bg-yellow-500 h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-sky-200" key={'yellow'} value={'#eab308'}/>
                            <Radio className="bg-green-500 h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-sky-200" key={'green'} value={'#22c55e'}/>
                            <Radio className="bg-sky-500 h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-sky-200" key={'blue'} value={'#0ea5e9'}/>
                            <Radio className="bg-purple-500 h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-sky-200" key={'purple'} value={'#a855f7'}/>
                            <Radio className="bg-pink-500 h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-sky-200" key={'pink'} value={'#ec4899'}/>
                            <Radio className="bg-rose-500 h-10 rounded-lg data-[checked]:border-2 data-[checked]:border-solid box-border hover:border-2 hover:cursor-pointer border-dashed border-sky-200" key={'red'} value={'#f43f5e'}/>
                        </RadioGroup>
                        <TabGroup className={"rounded-full bg-white/5 p-0.5 my-1"} defaultIndex={2}>
                            <TabList className="flex gap-4 items-center justify-between">
                                <Tab className="rounded-full py-2 px-3 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                    onClick={() => dispatch(setDrawingSize(4))}
                                >
                                    <div className='rounded-full bg-white h-1 w-1'/>
                                </Tab>
                                <Tab className="rounded-full py-2 px-3 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                    onClick={() => dispatch(setDrawingSize(6))}
                                >
                                    <div className='rounded-full bg-white h-1.5 w-1.5'/>
                                </Tab>
                                <Tab className="rounded-full py-1.5 px-3 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                    onClick={() => dispatch(setDrawingSize(8))}
                                >
                                    <div className='rounded-full bg-white h-2 w-2'/>
                                </Tab>
                                <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                    onClick={() => dispatch(setDrawingSize(12))}
                                >
                                    <div className='rounded-full bg-white h-3 w-3'/>
                                </Tab>
                                <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-neutral-100 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                    onClick={() => dispatch(setDrawingSize(14))}
                                >
                                    <div className='rounded-full bg-white h-3.5 w-3.5'/>
                                </Tab>
                            </TabList>
                        </TabGroup>
                    </DisclosurePanel>
                </Disclosure>
                {/*
                <Disclosure as="div" className="p-3" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="flex items-center text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                            <Square2StackIcon className="size-4 fill-white/30 mr-1" />
                            Shapes
                        </span>
                        <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                        <div className="grid grid-cols-5 gap-2 w-full my-2">
                            <div className="flex items-center justify-between rounded-lg box-border hover:border-2 border-dashed border-sky-200" draggable>
                                <div className="ml-1 w-0 h-0 border-t-[15px] border-t-transparent border-r-[35px] border-r-sky-500 border-b-[15px] border-b-transparent" />
                            </div>
                            <div className="h-10 rounded-lg box-border hover:border-2 border-dashed border-sky-200" draggable>
                                <p className="text-4xl text-sky-500 ml-1.5 mb-1">&#9733;</p>
                            </div>
                            <div className="bg-zinc-400 h-10 rounded-lg box-border hover:border-2 border-dashed border-sky-200" draggable />
                            <div className="bg-zinc-400 h-10 rounded-lg box-border hover:border-2 border-dashed border-sky-200" draggable />
                            <div className="bg-zinc-400 h-10 rounded-lg box-border hover:border-2 border-dashed border-sky-200" draggable />
                        </div>
                    </DisclosurePanel>
                </Disclosure>
                */}
                <Disclosure as="div" className="p-3" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="flex items-center text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                            <TrashIcon className="size-4 fill-white/30 mr-1" />
                            Delete
                        </span>
                        <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                        <div className="grid grid-cols-2 gap-2">
                            <Button className="rounded-full py-1 px-3 text-sm/6 font-semibold text-neutral-100 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600"
                                onClick={() => dispatch(setIsClearAll(true))}
                            >
                                Clear All
                            </Button>
                            <Button className="rounded-full py-1 px-3 text-sm/6 font-semibold text-neutral-100 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white/10"
                                onClick={() => dispatch(setIsClearAgents(true))}
                            >
                                Agents
                            </Button>
                            <Button className="rounded-full py-1 px-3 text-sm/6 font-semibold text-neutral-100 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white/10"
                                onClick={() => dispatch(setIsClearLines(true))}
                            >
                                Lines
                            </Button>
                        </div>
                    </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="p-3" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="flex items-center text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                            <BookmarkIcon className="size-4 fill-white/30 mr-1" />
                            Save
                        </span>
                        <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                        <div className="grid grid-cols-1 gap-2">
                            <Button className="rounded-full flex items-center py-1 justify-center text-sm/6 font-semibold text-neutral-100 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-sky-700"
                                onClick={() => dispatch(setIsDownload(true))}
                            >
                                <ArrowDownTrayIcon className="size-4 fill-white/30 mr-1" />
                                Download as PNG
                            </Button>
                            <Button className="flex flex-row justify-center place-items-center rounded-full py-1 px-3 text-sm/6 font-semibold text-neutral-100 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white/10"
                                onClick={() => setIsSaveModalOpen(true)}
                            >
                                <LinkIcon className="size-4 fill-white/30 mr-1" />
                                <div className='pr-2 text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-sky-500 font-bold'>NEW</div>
                                Save & Create Link
                            </Button>
                        </div>
                    </DisclosurePanel>
                </Disclosure>
                <Dialog open={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} className={''}>
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel className="max-w-lg space-y-4 border-2 bg-neutral-950 p-8 text-white rounded-3xl">
                            <DialogTitle className="flex flex-row font-bold text-2xl">
                                <div className='pr-2 text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-sky-500'>NEW</div>
                                Save & Create Link
                                <Button className="rounded-md py-0.5 px-3 ml-auto mr-0 text-sm/6 font-semibold text-neutral-100 shadow-inner shadow-white/20 focus:outline-none data-[hover]:bg-white/10"
                                    onClick={() => setIsSaveModalOpen(false)}
                                >
                                    Close
                                </Button>
                            </DialogTitle>
                            <Description className={'text-gray-400 text-md'}>Save this map on dlkmap and generate a permalink to it.</Description>
                            <div className='flex flex-row'>
                                <Input className={'rounded-md h-8 w-full px-2 mr-2 bg-neutral-800'} type='text' disabled value={mapLinkText}/>
                                <Button 
                                    className={`rounded-md py-0.5 px-3 ml-auto mr-0 w-32 text-sm/6 font-semibold text-neutral-100 border-2 shadow-inner shadow-white/20 focus:outline-none ${saveModalButtonText === 'Copied' ? 'bg-green-500 data-[hover]:bg-green-500' : 'data-[hover]:bg-sky-700'}`}
                                    onClick={handleSaveButton}
                                    disabled={isLoading}
                                >
                                    {saveModalButtonText}
                                </Button>
                            </div>
                            {
                                props?.session ? null :
                                <div className='text-xs text-rose-400'>
                                    Alert:
                                    <span className='text-sky-300 cursor-pointer' onClick={() => {
                                        setIsSaveModalOpen(false)
                                        navigate('/login')
                                    }}> log in </span>
                                    for your link to save forever, anonymous links are ephemeral.
                                </div>
                            }
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}