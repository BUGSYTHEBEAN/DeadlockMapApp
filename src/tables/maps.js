import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function createMap(lines, agents) {
    const id = generateRandomId8()
    const { error } = await supabase
        .from('maps')
        .insert({ id: id, agents: JSON.stringify(agents), lines: JSON.stringify(lines)})
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