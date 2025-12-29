export class Boss {
    readonly Name: string;
    readonly Picture: string[];
    readonly Expansion: Uint8Array;
    readonly Type: number;
    readonly BGM: string[];
    readonly Patch: string;

    constructor(n: string, p: string[], e: Uint8Array, t: number, b: string[], v: string) {
        this.Name = n;
        this.Picture = p;
        this.Expansion = e;
        this.Type = t;
        this.BGM = b;
        this.Patch = v;
    }
}

export interface bossesParseInterface {
    Type: string;
    Bosses: Array<object>;
}

export interface bossParseInterface {
    Name: string,
    Picture: object,
    BGM: Array<string>,
    Patch: string
}

export interface bossPictureParseInterface {
    Large: string,
    Small: string,
}




/*
    Json Schema for Boss
    - Expansion is given by folder
    {
        0: {
            "Type": 1|2|4|8,
            "Bosses": {
                0: {
                    Name: "Generic Boss",
                    Picture: {
                        large: "./data/<expansion>/name.png",
                        small: "./data/<expansion>/name_small.png"
                    },
                    BGM: {
                        "BGM1",
                        "BGM2",
                        ...
                    },
                    Patch: "x.y"
                },
                1: {},
                2: {},
                ...
        },
        1: {},
        ...
    }

*/