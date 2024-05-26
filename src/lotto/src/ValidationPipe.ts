class ValidationPipe {
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