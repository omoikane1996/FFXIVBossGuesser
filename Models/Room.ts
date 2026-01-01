import { Difficulty, parseDifficulty } from "./Difficulty.js";

export default class Room {
    readonly Expansions: Uint8Array;
    readonly Types: Uint8Array;
    readonly Difficulty: Difficulty;
    readonly Seed: number;

    static readonly ASCII = 33;

    constructor(e: Uint8Array, t: Uint8Array, d: Difficulty, s?: number) {
        this.Expansions = e;
        this.Types = t;
        this.Difficulty = d;
    
        const seed = (Date.now() % Math.pow(2,16));
        this.Seed = s ?? seed;
    }


    public getRoomCode(): string {
        let code = "";

        let secret = (this.Seed % Math.pow(2,10)) + 32;
        
        code += (Room.ASCII + this.Expansions[0] + secret).toString(36)
        code += (Room.ASCII + this.Types[0] + secret).toString(36)
        code += this.Difficulty.toString();
        code += this.Seed.toString(36);

        return code;
    }


    public hasExpansion(expansion: number): boolean {
        if ( (this.Expansions[0] & (1 << expansion)) ) {
           return true;
        }

        return false;
    }

    public hasType(type: number): boolean {
        if ( (this.Types[0] & (1 << type)) ) {
           return true;
        }

        return false;
    }

    public describeRoom(): string {
        let description = "";

        // Expansions
        let expansionDescription = "";
        for(let i = 0; i < 8; i++) {
            if ( (this.Expansions[0] & (1 << i)) ) {
                if ( Math.pow(2,i) == EXPANSION_ARR ) {
                    expansionDescription += "A Realm Reborn,";
                } else if (Math.pow(2,i) == EXPANSION_HW) {
                    expansionDescription += "Heavensward,";
                } else if (Math.pow(2,i) == EXPANSION_STB) {
                    expansionDescription += "Stormblood,";
                } else if (Math.pow(2,i) == EXPANSION_SHB) {
                    expansionDescription += "Shadowbringers,";
                } else if (Math.pow(2,i) == EXPANSION_EW) {
                    expansionDescription += "Endwalker,";
                } else if (Math.pow(2,i) == EXPANSION_DT) {
                    expansionDescription += "Dawntrail,";
                } else {
                    expansionDescription += "Huh?!";
                }
            }
        }

        description += expansionDescription.slice(0,-1);
        description += "\n";

        // Types
        let typeDescription = "";
        for(let i = 0; i < 8; i++) {
            if ( (this.Types[0] & (1 << i)) ) {
                if ( Math.pow(2,i) == TYPE_DUNGEON ) {
                    typeDescription += "Dungeons,";
                } else if (Math.pow(2,i) == TYPE_TRIAL) {
                    typeDescription += "Trials,";
                } else if (Math.pow(2,i) == TYPE_NORMAL_RAID) {
                    typeDescription += "Normal Raids,";
                } else if (Math.pow(2,i) == TYPE_ALLIANCE_RAID) {
                    typeDescription += "Alliance Raids,";
                } else {
                    typeDescription += "Huh?!";
                }
            }
        }

        description += typeDescription.slice(0,-1)
        description += "\n";

        return description;

    }

    public static createRoomFromCode(Code: string): Room {
        let Seed = Number.parseInt(Code.slice(5), 36);
        let secret = (Seed % Math.pow(2,10)) + 32;

        let Expansions = new Uint8Array([Number.parseInt(Code.slice(0,2), 36) - Room.ASCII - secret] )
        let Types = new Uint8Array([Number.parseInt(Code.slice(2,4), 36) - Room.ASCII - secret] )
        let Difficulty = parseDifficulty(Code.slice(4,5));

        // TODO - Sanity Check these Values
        
        return new Room(Expansions, Types, Difficulty, Seed)
    }

    public static getExpansionFromString(expansion: string): number {
        if ( expansion == "ARR" ) {
            return EXPANSION_ARR;
        } else if ( expansion == "Heanvensward" ) {
            return EXPANSION_HW;
        } else if ( expansion == "Stormblood" ) {
            return EXPANSION_STB;
        } else if ( expansion == "Shadowbrigners" ) {
            return EXPANSION_SHB;
        } else if ( expansion == "Endwalker" ) {
            return EXPANSION_EW;
        } else if ( expansion == "Dawntrail" ) {
            return EXPANSION_DT;
        }

        return -1;
    }
}

const EXPANSION_ARR = 1;
const EXPANSION_HW = 2;
const EXPANSION_STB = 4;
const EXPANSION_SHB = 8;
const EXPANSION_EW = 16;
const EXPANSION_DT = 32;

const TYPE_DUNGEON = 1;
const TYPE_TRIAL = 2;
const TYPE_NORMAL_RAID = 4;
const TYPE_ALLIANCE_RAID = 8;