import Room from "./Models/Room.js";
import { Boss } from "./Models/Boss.js";
import { Difficulty } from "./Models/Difficulty.js";
import DawntrailData from "./Data/Dawntrail/Bosses.json" assert {type: "json"};
import Match from "./Models/Match.js";

matchTest();

function parseFromJsonTest() {
    let bossList = new Array<Boss>();

    DawntrailData.list.forEach((List) => {
        let type = List.Type;

        List.Bosses.forEach((bossObject) => {

            let newBoss = new Boss(
                bossObject.Name,
                new Array<string>(bossObject.Picture.Large, bossObject.Picture.Small),
                new Uint8Array([Room.getExpansionFromString("Dawntrail")]),
                type,
                bossObject.BGM,
                bossObject.Patch
            )
            bossList.push(newBoss);
        })
    })

    return bossList;
}

function roomTest() {
    let RoomTest: Room = new Room (
    new Uint8Array([Date.now() % 64]),
    new Uint8Array([Date.now() % 16]),
    Difficulty.Normal
    )

    let code = RoomTest.getRoomCode()

    return RoomTest;

    console.log(RoomTest);
    console.log(code, "Length:", code.length);
    console.log(Room.createRoomFromCode(code))
    console.log(RoomTest.describeRoom());
}

function matchTest() {

    // We need the room information...
    let room:Room = roomTest();

    // We need a list of Bosses...
    let bossList:Boss[] = parseFromJsonTest();

    // We need a match...
    let matchOne:Match = new Match(room, bossList);
    let matchTwo:Match = new Match(room, bossList);

    console.log(matchOne, matchTwo);
    console.log(matchOne == matchTwo);

}