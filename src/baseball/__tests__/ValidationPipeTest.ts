import ValidationPipe from "../src/view/ValidationPipe";

describe('ValidationPipe', () => {
    describe('parseNumberArray', () => {
        it('숫자 문자열을 숫자 배열로 반환한다.', () => {
            // given
            const input = '12345';
            const expectedOutput = [1, 2, 3, 4, 5];

            // when
            const result = ValidationPipe.parseNumberArray(input);

            // then
            expect(result).toEqual(expectedOutput);
        });

        it('입력에 숫자가 아닌 문자가 포함되면 오류가 발생한다.', () => {
            // given
            const input = '12a45';

            // when & then
            expect(() => {
                ValidationPipe.parseNumberArray(input);
            }).toThrow('[ERROR] 숫자를 입력해주세요.');
        });

        it('선행 및 후행 공백을 제거한다.', () => {
            // given
            const input = ' 12345 ';
            const expectedOutput = [1, 2, 3, 4, 5];

            // when
            const result = ValidationPipe.parseNumberArray(input);

            // then
            expect(result).toEqual(expectedOutput);
        });

        it('입력이 비었을 경우 오류가 발생한다.', () => {
            // given
            const input = '';

            // when & then
            expect(() => {
                ValidationPipe.parseNumberArray(input)
            }).toThrow('[ERROR] 숫자를 입력해주세요.');
        });
    });

    describe('parseNumber', () => {
        it('숫자 문자열을 숫자로 변환한다.', () => {
            const input = '123';
            const expectedOutput = 123;
            const result = ValidationPipe.parseNumber(input);
            expect(result).toBe(expectedOutput);
        });

        it('숫자가 아닌 문자열을 입력하면 오류가 발생한다.', () => {
            const input = 'abc';
            expect(() => {
                ValidationPipe.parseNumber(input);
            }).toThrow('[ERROR] 숫자를 입력해주세요.');
        });

        it('선행 및 후행 공백을 제거한다.', () => {
            const input = ' 123 ';
            const expectedOutput = 123;
            const result = ValidationPipe.parseNumber(input);
            expect(result).toBe(expectedOutput);
        });

        it('입력이 비었을 경우 오류가 발생한다.', () => {
            const input = '';
            expect(() => {
                ValidationPipe.parseNumber(input);
            }).toThrow('[ERROR] 숫자를 입력해주세요.');
        });
    });
});
