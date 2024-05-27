import Random from "../../utils/Random";
import {Computer} from "../src/model/Computer";

jest.mock('../../utils/Random');

describe('Computer', () => {
    let mockPickNumberInRange: jest.Mock;

    beforeEach(() => {
        mockPickNumberInRange = jest.fn();
        Random.pickNumberInRange =  mockPickNumberInRange;
    });

    it('1과 9 사이의 3개의 고유한 랜덤 숫자를 생성한다.', () => {
        // given
        mockPickNumberInRange
            .mockImplementationOnce(() => 1)
            .mockImplementationOnce(() => 2)
            .mockImplementationOnce(() => 3);

        const computer: Computer = new Computer();

        // when
        const numbers: number[] = computer.numbers;

        // then
        expect(numbers).toHaveLength(3);
        expect(new Set(numbers).size).toBe(3);
        expect(numbers).toEqual(expect.arrayContaining([1, 2, 3]));
    });

    it('중복 숫자를 선택했을 경우, 다시 시도하여 고유한 숫자를 생성한다.', () => {
        // given
        mockPickNumberInRange
            .mockImplementationOnce(() => 1)
            .mockImplementationOnce(() => 2)
            .mockImplementationOnce(() => 2)
            .mockImplementationOnce(() => 3);

        const computer: Computer = new Computer();

        // when
        const numbers: number[] = computer.numbers;

        // then
        expect(numbers).toHaveLength(3);
        expect(new Set(numbers).size).toBe(3);
        expect(numbers).toEqual(expect.arrayContaining([1, 2, 3]));
    });
});
