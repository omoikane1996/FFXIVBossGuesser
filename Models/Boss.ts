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
