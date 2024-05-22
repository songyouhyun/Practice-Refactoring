export class Player {
    private readonly _numbers;

    constructor(numbers) {
        this.validate(numbers);
        this._numbers = numbers;
    }

    private validate(numbers) {
        this.validateLength3(numbers);
        this.validateNaN(numbers);
        this.validatePositive(numbers);
        this.validateDuplicate(numbers);
    }

    private validateLength3(numbers) {
        if (numbers.length !== 3) {
            throw new Error('[ERROR] 숫자 3개를 입력해주세요.');
        }
    }

    private validateNaN(numbers) {
        if (numbers.includes(NaN)) {
            throw new Error('[ERROR] 숫자를 입력해주세요.');
        }
    }

    private validatePositive(numbers) {
        const isPositive = numbers.every((value) => value > 0);
        if (!isPositive) {
            throw new Error('[ERROR] 양수인 정수를 입력해주세요.')
        }
    }

    private validateDuplicate(numbers) {
        const uniqueArray = [];
        numbers.forEach((value) => {
            if (uniqueArray.includes(value)) {
                throw new Error('[ERROR] 서로 다른 숫자를 입력해주세요.');
            }
            uniqueArray.push(value);
        })
    }

    get numbers() {
        return this._numbers;
    }
}