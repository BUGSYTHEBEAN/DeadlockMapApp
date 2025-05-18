export async function getMatchById(id) {
    const url = `https://api.deadlock-api.com/v1/matches/${id}/metadata`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json()
}
