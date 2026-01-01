export const enum Difficulty {
    Unknown = -1,
    Normal = 0,
    Hard = 1,
    Extreme = 2,
    Savage = 3,
    Ultimate = 4
}

export function parseDifficulty(Diff: string): Difficulty {
    let num = +Diff;
    if (num == Difficulty.Normal || Diff == "Normal") {
        return Difficulty.Normal;
    } else if (num == Difficulty.Hard || Diff == "Hard") {
        return Difficulty.Hard;
    } else if (num == Difficulty.Extreme || Diff == "Extreme") {
        return Difficulty.Extreme;
    } else if (num == Difficulty.Savage || Diff == "Savage") {
        return Difficulty.Savage;
    } else if (num == Difficulty.Ultimate || Diff == "Ultimate") {
        return Difficulty.Ultimate;
    }

    return Difficulty.Unknown;
}