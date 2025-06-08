export function getMapFromQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('map')
}

export function getMatchFromQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('match')
}

export function getTimeFromQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('time')
}
