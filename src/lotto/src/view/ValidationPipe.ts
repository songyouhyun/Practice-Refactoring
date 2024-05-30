class ValidationPipe {
    static parseNumber(value: any): number {
        const number: number = Number(value.trim());

        if (Number.isNaN(number)) {
            throw new Error('[ERROR] 숫자를 입력해주세요.');
        }
        return number;
    }

    static parseNumberArray(value: any): number[] {
        const numbers: number[] = value.trim()
            .split(',')
            .map(
                (value: string) => Number(value)
            );

        if (numbers.includes(NaN)) {
            throw new Error('[ERROR] 숫자를 입력해주세요.');
        }
        return numbers;
    }
}

export default ValidationPipe;