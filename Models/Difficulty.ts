export const enum Difficulty {
    Unknown = -1,
    Normal = 1,
    Extreme = 2,
    Savage = 3,
    Ultimate = 4
}

export function parseDifficulty(Diff: string): Difficulty {
    let num = +Diff;
    if (num == 1) {
        return Difficulty.Normal;
    } else if (num == 2) {
        return Difficulty.Extreme;
    } else if (num == 3) {
        return Difficulty.Savage;
    } else if (num == 4) {
        return Difficulty.Ultimate;
    }

    return Difficulty.Unknown;
}