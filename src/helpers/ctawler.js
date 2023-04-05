import axios from "axios";

async function getTeamLogo(matchUrl) {
    const [, matchID] = matchUrl.split("match/");
    const url = 'https://flashscore.ua/' + matchUrl;

    let matchInfo = {}
    await axios.get(matchUrl).then(res => {
        const regex = /window.environment = (.*?)<\/script>/
        const rawData = res.data.replace(/\n/g, '').match(regex)[0].replace("window.environment = ", "").replace(/<\/script>/, "")
        const parsedData = JSON.parse(rawData.substr(0, rawData.lastIndexOf(";")))
        // matchInfo.date = parsedData.common_feed.find(obj => obj.hasOwnProperty('DC'))['DC']
        matchInfo.home = parsedData.participantsData.home
        matchInfo.away = parsedData.participantsData.away
        matchInfo.tournament = parsedData.header.tournament
        // console.log(matchInfo);
    }).catch((error) => {console.log('Error: ', error.message)});
    const statsUrl = "https://d.flashscore.ua/x/feed/df_st_2_" + matchID
    let stats = []

    axios.get(statsUrl, {headers: {"x-fsign": "SW9D1eZo"}}).then(res => {
        let writeData = true
        const rawData = res.data.split('¬~')
        for (let i in rawData) {
            if (rawData[i].includes("SE÷") && !rawData[i].includes("SE÷Матч")) writeData = false
            if (rawData[i].includes("SG÷") && writeData == true) {
                let line = rawData[i].split("¬").map(l => l.replace("SG÷", "").replace("SI÷", "").replace("SH÷", ""))
                stats.push(line)
            }
        }
        // console.log(stats)
    })

    return matchInfo;
}


export default getTeamLogo;
