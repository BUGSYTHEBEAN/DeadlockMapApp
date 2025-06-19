import { Group, Image } from "react-konva"
import useImage from "use-image"

import yellowGuardianBot from '../../assets/map/yellow_guardian_bot.png'
import yellowWalkerBot from '../../assets/map/yellow_walker_bot.png'
import yellowBaseBot from '../../assets/map/yellow_base_bot.png'
import blueGuardianBot from '../../assets/map/blue_guardian_bot.png'
import blueWalkerBot from '../../assets/map/blue_walker_bot.png'
import blueBaseBot from '../../assets/map/blue_base_bot.png'
import greenGuardianBot from '../../assets/map/green_guardian_bot.png'
import greenWalkerBot from '../../assets/map/green_walker_bot.png'
import greenBaseBot from '../../assets/map/green_base_bot.png'
import yellowGuardianTop from '../../assets/map/yellow_guardian_top.png'
import yellowWalkerTop from '../../assets/map/yellow_walker_top.png'
import yellowBaseTop from '../../assets/map/yellow_base_top.png'
import blueGuardianTop from '../../assets/map/blue_guardian_top.png'
import blueWalkerTop from '../../assets/map/blue_walker_top.png'
import blueBaseTop from '../../assets/map/blue_base_top.png'
import greenGuardianTop from '../../assets/map/green_guardian_top.png'
import greenWalkerTop from '../../assets/map/green_walker_top.png'
import greenBaseTop from '../../assets/map/green_base_top.png'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 700

const YellowGuardianBot = () => {
    const [image] = useImage(yellowGuardianBot)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const YellowWalkerBot = () => {
    const [image] = useImage(yellowWalkerBot)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const YellowBaseBot = () => {
    const [image] = useImage(yellowBaseBot)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const BlueGuardianBot = () => {
    const [image] = useImage(blueGuardianBot)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const BlueWalkerBot = () => {
    const [image] = useImage(blueWalkerBot)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const BlueBaseBot = () => {
    const [image] = useImage(blueBaseBot)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const GreenGuardianBot = () => {
    const [image] = useImage(greenGuardianBot)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const GreenWalkerBot = () => {
    const [image] = useImage(greenWalkerBot)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const GreenBaseBot = () => {
    const [image] = useImage(greenBaseBot)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const YellowGuardianTop = () => {
    const [image] = useImage(yellowGuardianTop)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const YellowWalkerTop = () => {
    const [image] = useImage(yellowWalkerTop)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const YellowBaseTop = () => {
    const [image] = useImage(yellowBaseTop)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const BlueGuardianTop = () => {
    const [image] = useImage(blueGuardianTop)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const BlueWalkerTop = () => {
    const [image] = useImage(blueWalkerTop)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const BlueBaseTop = () => {
    const [image] = useImage(blueBaseTop)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const GreenGuardianTop = () => {
    const [image] = useImage(greenGuardianTop)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const GreenWalkerTop = () => {
    const [image] = useImage(greenWalkerTop)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

const GreenBaseTop = () => {
    const [image] = useImage(greenBaseTop)
    return(<Image image={image} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />)
}

export const getObjectiveGroup = (objectives, matchTime) => {
    const amberObjectives = Array.from({length: 13}, () => 10000) // Fill max obj time
    const sapphireObjectives = Array.from({length: 13}, () => 10000) // Fill max obj time

    objectives && objectives.forEach(obj => {
        if (obj.team === 0 && obj.team_objective_id != null && obj.team_objective_id < 13 && obj.destroyed_time_s) {
            amberObjectives[obj.team_objective_id] = obj.destroyed_time_s
        } else if (obj.team === 1 && obj.team_objective_id != null && obj.team_objective_id < 13 && obj.destroyed_time_s) {
            sapphireObjectives[obj.team_objective_id] = obj.destroyed_time_s
        }
    })

    return (
        <Group>
            {amberObjectives[1] > matchTime && <YellowGuardianBot />}
            {amberObjectives[5] > matchTime && <YellowWalkerBot />}
            {amberObjectives[9] > matchTime && <YellowBaseBot />}
            {amberObjectives[3] > matchTime && <BlueGuardianBot />}
            {amberObjectives[7] > matchTime && <BlueWalkerBot />}
            {amberObjectives[11] > matchTime && <BlueBaseBot />}
            {amberObjectives[4] > matchTime && <GreenGuardianBot />}
            {amberObjectives[8] > matchTime && <GreenWalkerBot />}
            {amberObjectives[12] > matchTime && <GreenBaseBot />}
            {sapphireObjectives[1] > matchTime && <YellowGuardianTop />}
            {sapphireObjectives[5] > matchTime && <YellowWalkerTop />}
            {sapphireObjectives[9] > matchTime && <YellowBaseTop />}
            {sapphireObjectives[3] > matchTime && <BlueGuardianTop />}
            {sapphireObjectives[7] > matchTime && <BlueWalkerTop />}
            {sapphireObjectives[11] > matchTime && <BlueBaseTop />}
            {sapphireObjectives[4] > matchTime && <GreenGuardianTop />}
            {sapphireObjectives[8] > matchTime && <GreenWalkerTop />}
            {sapphireObjectives[12] > matchTime && <GreenBaseTop />}
        </Group>
    )
}