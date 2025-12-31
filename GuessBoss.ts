import Room from "./Models/Room";
import { Boss, bossesParseInterface, bossParseInterface, bossPictureParseInterface } from "./Models/Boss";
import { Difficulty } from "./Models/Difficulty";
import * as fs from 'fs';
import Match from "./Models/Match";


matchTest();

function parseFromJsonTest() {
    let expansion = "Dawntrail";
    const filePath: string = "./data/" + expansion + "/Bosses.json";
    let json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    let bossList = new Array<Boss>();
    
    json.list.forEach((List: bossesParseInterface) => {
        let type = Number.parseInt(List.Type);

        List.Bosses.forEach((b: object) => {
            let bossObject = b as bossParseInterface;
            let pictureObject = bossObject.Picture as bossPictureParseInterface;

            let newBoss = new Boss(
                bossObject.Name,
                new Array<string>(pictureObject.Large, pictureObject.Small),
                new Uint8Array([Room.getExpansionFromString(expansion)]),
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