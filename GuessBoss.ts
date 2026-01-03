import Room from "./Models/Room.js";
import { Boss } from "./Models/Boss.js";
import { Difficulty, parseDifficulty } from "./Models/Difficulty.js";
import Match from "./Models/Match.js";

import DawntrailData from "./Data/Dawntrail/Bosses.json" with { type: "json" };
import EndwalkerData from "./Data/Endwalker/Bosses.json" with { type: "json" };
import ShadowbringersData from "./Data/Shadowbringers/Bosses.json" with { type: "json" };
import StormbloodData from "./Data/Stormblood/Bosses.json" with { type: "json"};
import HeavenswardData from "./Data/Heavensward/Bosses.json" with { type: "json" };
import ARRData from "./Data/ARR/Bosses.json" with { type: "json" };


let expansionCheckboxes = document.querySelectorAll("#Expansions input[type=checkbox]");
let expansionSettings: string[] = [];

let bossTypeCheckboxes = document.querySelectorAll("#BossTypes input[type=checkbox]")
let bossTypeSettings: string[] = [];

let globalBossList:Boss[] = [];
let globalRoom:Room;
let globalMatch:Match;

let currentState:gameState = gameState.CREATION; //This probably will not be needed but who knows.


document.querySelector("#JoinCode")?.addEventListener('change', function(e) {
    let room = Room.createRoomFromCode((<HTMLInputElement>e.currentTarget).value);

    console.log(room);
});

expansionCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        expansionSettings = Array.from(expansionCheckboxes).filter(i => (<HTMLInputElement>i).checked).map(i => (<HTMLInputElement>i).value);

        generateRoomCode();
    })
});
bossTypeCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        bossTypeSettings = Array.from(bossTypeCheckboxes).filter(i => (<HTMLInputElement>i).checked).map(i => (<HTMLInputElement>i).value);

        generateRoomCode();
    })
});

document.querySelector("#Difficulty")?.addEventListener('change', function(e) {
    generateRoomCode();
});

document.querySelector("#CreateRoom")?.addEventListener('click', function(e) {
    globalMatch = new Match(globalRoom, globalBossList);
    currentState = gameState.HOST;
    console.log(globalMatch);
    // Todo - Transisition website to Match as Host
});

document.querySelector("#JoinRoom")?.addEventListener('click', function(e) {
    globalMatch = new Match(globalRoom, globalBossList);
    currentState = gameState.JOIN;
    console.log(globalMatch);
    // Todo - Transisition website to Match as Join
});

generateRoomCode();

function generateRoomCode() {
    let expansion:number = 0;
    let type:number = 0;
    let difficulty:Difficulty = parseDifficulty((document.querySelector("#Difficulty") as HTMLInputElement).value);

    expansionSettings.forEach(function(i) {
        expansion += Room.getExpansionFromString(i);
    });

    bossTypeSettings.forEach(function(i) {
        type += Room.getTypeFromString(i);
    })

    globalRoom = new Room(
         new Uint8Array([expansion]),  new Uint8Array([type]), difficulty
    );

    (document.querySelector("#Code") as HTMLInputElement).value = globalRoom.getRoomCode();
    console.log(globalRoom);
}

const enum gameState {
    CREATION,
    HOST,
    JOIN
}


// function parseFromJsonTest() {
//     let bossList = new Array<Boss>();

//     DawntrailData.list.forEach((List) => {
//         let type = List.Type;

//         List.Bosses.forEach((bossObject) => {

//             let newBoss = new Boss(
//                 bossObject.Name,
//                 new Array<string>(bossObject.Picture.Large, bossObject.Picture.Small),
//                 new Uint8Array([Room.getExpansionFromString("Dawntrail")]),
//                 type,
//                 bossObject.BGM,
//                 bossObject.Patch
//             )
//             bossList.push(newBoss);
//         })
//     })

//     return bossList;
// }

// function roomTest() {
//     let RoomTest: Room = new Room (
//     new Uint8Array([Date.now() % 64]),
//     new Uint8Array([Date.now() % 16]),
//     Difficulty.Normal
//     )

//     let code = RoomTest.getRoomCode()

//     return RoomTest;

//     console.log(RoomTest);
//     console.log(code, "Length:", code.length);
//     console.log(Room.createRoomFromCode(code))
//     console.log(RoomTest.describeRoom());
// }

// function matchTest() {

//     // We need the room information...
//     let room:Room = roomTest();

//     // We need a list of Bosses...
//     let bossList:Boss[] = parseFromJsonTest();

//     // We need a match...
//     let matchOne:Match = new Match(room, bossList);
//     let matchTwo:Match = new Match(room, bossList);

//     console.log(matchOne, matchTwo);
//     console.log(matchOne == matchTwo);

// }