class Computer {
    private readonly _numbers: number[];

    constructor(numbers: number[]) {
        this._numbers = numbers;
        this.validate();
    }

    private validate() {
        if (!this._numbers) {
            throw new Error("[ERROR] 숫자가 없습니다.");
        }

        if (this._numbers.length !== 3) {
            throw new Error("[ERROR] 숫자는 3개여야 합니다.");
        }

        if (new Set(this._numbers).size !== 3) {
            throw new Error("[ERROR] 중복되는 숫자가 없어야 합니다.");
        }
    }

    get numbers(): number[] {
        return this._numbers;
    }
}

export default Computer;
