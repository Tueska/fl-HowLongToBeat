const open = require('./node_modules/open')
let hltb = require('howlongtobeat');

const { method, parameters } = JSON.parse(process.argv[2]);
const hltbService = new hltb.HowLongToBeatService();

if (method === "query") {
    let query = parameters[0];
    let result = {
        "result": []
    };

    hltbService.search(query).then(hltbentries => hltbentries.forEach(element => {
        result.result.push({
            "Title": element.name,
            "Subtitle": `Main: ${element.gameplayMain} | Main + Extra: ${element.gameplayMainExtra} | Completionist: ${element.gameplayCompletionist}`,
            "JsonRPCAction": {
                "method": "do_something_for_query",
                "parameters": [`https://howlongtobeat.com/game/${element.id}`]
            },
            "IcoPath": element.imageUrl,
            "score": 0
        });
    })).then(() => {
        console.log(JSON.stringify(result));
    });
}

if (method === "do_something_for_query") {
    open(parameters[0])
}