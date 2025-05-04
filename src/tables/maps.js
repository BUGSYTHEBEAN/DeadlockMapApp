import supabase from "../clients/supabase"

export async function createMap(lines, agents, userId) {
    const id = generateRandomId8()
    const { error } = await supabase
        .from('maps')
        .insert({ id: id, agents: JSON.stringify(agents), lines: JSON.stringify(lines), user_id: userId})
    return id
}

export async function getMap(id) {
    const { data, error } = await supabase
        .from('maps')
        .select()
        .eq('id', id)
    return data
}

function generateRandomId8() {
    return Math.floor(Math.random() * 10000000);
}