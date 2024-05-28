class ValidationPipe {
    static parseNumberArray(value: any): number[] {
        const numbers: number[] = value.trim()
            .split('')
            .map(
                (value: string) => parseInt(value)
            );

        if (numbers.includes(NaN) || numbers.length === 0) {
            throw new Error('[ERROR] 숫자를 입력해주세요.');
        }
        return numbers;
    }

    static parseNumber(value: any): number {
        const number: number = parseInt(value);
        if (isNaN(number)) {
            throw new Error('[ERROR] 숫자를 입력해주세요.');
        }
        return number;
    }
}

export default ValidationPipe;