import Computer from "../src/model/Computer";

describe('Computer', () => {
    it('중복 숫자가 들어오면 오류가 발생한다.', () => {
        // when & then
        expect(() => new Computer([1, 1, 3])).toThrow('[ERROR]');
    });
});
