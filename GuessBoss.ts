import Room from "./Models/Room";
import { Boss, bossesParseInterface, bossParseInterface, bossPictureParseInterface } from "./Models/Boss";
import { Difficulty } from "./Models/Difficulty";
import * as fs from 'fs';

let RoomTest: Room = new Room (
    new Uint8Array([Date.now() % 64]),
    new Uint8Array([Date.now() % 16]),
    Difficulty.Normal
)

let code = RoomTest.getRoomCode()

// console.log(RoomTest);
// console.log(code, "Length:", code.length);
// console.log(Room.createRoomFromCode(code))
// console.log(RoomTest.describeRoom());

parseFromJsonTest();

function parseFromJsonTest() {
    let expansion = "Dawntrail";
    const filePath: string = "./data/" + expansion + "/Bosses.json";
    let json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    
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

            console.log(newBoss);
        })
    })
}

