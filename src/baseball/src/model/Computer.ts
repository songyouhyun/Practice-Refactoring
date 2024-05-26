import Random from "../../../utils/Random";

export class Computer {
    private readonly _numbers: number[] = [];

    constructor() {
        this.pickUniqueRandomNumbers(3)
    }

    private pickUniqueRandomNumbers(count: number): number[] {
        while (this._numbers.length < count) {
            const number: number = Random.pickNumberInRange(1, 9);
            if (!this._numbers.includes(number)) {
                this._numbers.push(number);
            }
        }
        return this._numbers;
    }

    get numbers(): number[] {
        return this._numbers;
    }
}
