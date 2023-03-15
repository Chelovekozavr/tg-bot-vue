export function getUrlParam(param) {
    function urlStringToBool(value) {
        return value === 'true';
    }

    const urlParams = new URLSearchParams(window.location.search);

    const res = {
        url: urlParams.get('url'),
        parsedDate: urlParams.get('parsedDate'),
        time: urlParams.get('time'),
        date: urlParams.get('date'),
        homeTeam: urlParams.get('homeTeam'),
        awayTeam: urlParams.get('awayTeam'),
        topMatch: urlStringToBool(urlParams.get('topMatch')),
    }

    return res[param];
}
