import { Boss } from "./Boss";
import Room from "./Room";

// A match is basically a room + Boss Information
export default class Match {
    readonly Room: Room;
    readonly BossList: Boss[];
    readonly p1Boss: Boss;
    readonly p2Boss: Boss;

    constructor(Room: Room, BossList: Boss[]) {
        const seededRNG = this.splitmix32(Room.Seed);

        let newBossList = BossList.slice(); //clone array
        this.shuffle(newBossList, seededRNG);

        this.Room = Room;
        this.BossList = newBossList;
        this.p1Boss = this.BossList[Math.floor(seededRNG() * this.BossList.length)];
        this.p2Boss = this.BossList[Math.floor(seededRNG() * this.BossList.length)];
    }

    // I love javascript and how it doesn't have a fucking seedable RNG function by default. Thanks!
    // I took this off stack overflow - License - CC BY-SA 4.0 by bryc
    private splitmix32(a:number) {
        return function() {
            a |= 0;
            a = a + 0x9e3779b9 | 0;
            let t = a ^ a >>> 16;
            t = Math.imul(t, 0x21f0aaad);
            t = t ^ t >>> 15;
            t = Math.imul(t, 0x735a2d97);
            return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
        }
    }

    // The classic Knuth Shuffle (okay Fisher-Yates technically but I'm not in college anymore and I'm old chief)
    private shuffle<T>(array: T[], rng:Function) {
        let currentIndex = array.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(rng() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }
}
