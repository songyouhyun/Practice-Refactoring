import {Score} from "../src/model/Score";

describe('Score', () => {
    it.each([
        { playerNumbers: [1, 2, 3], expected: { strikeCount: 3, ballCount: 0 } },
        { playerNumbers: [1, 3, 2], expected: { strikeCount: 1, ballCount: 2 } },
        { playerNumbers: [4, 5, 6], expected: { strikeCount: 0, ballCount: 0 } },
    ])('같은 수가 같은 자리에 있으면 스트라이크, 다른 자리에 있으면 볼의 카운트가 증가된다.',
    ({ playerNumbers, expected }) => {
        // given
        const computerNumbers: number[] = [1, 2, 3];
        const sut: Score = new Score();

        // when
        sut.countStrikeOrBall(computerNumbers, playerNumbers);

        // then
        expect(sut.strikeCount).toBe(expected.strikeCount);
        expect(sut.ballCount).toBe(expected.ballCount);
    });

    it.each([
        { strikeCount: 3, ballCount: 0, expected: '3스트라이크' },
        { strikeCount: 1, ballCount: 2, expected: '2볼 1스트라이크' },
        { strikeCount: 0, ballCount: 0, expected: '낫싱' },
    ])('결과를 반환한다.',
    ({ strikeCount, ballCount, expected }) => {
        // given
        const sut: Score = new Score();
        sut.strikeCount = strikeCount;
        sut.ballCount = ballCount;

        // when
        const actual: string = sut.getResult();

        // then
        expect(actual).toBe(expected);
    });

    it('스트라이크가 3개인 경우, 라운드가 종료된다.', () => {
        // given
        const sut: Score = new Score();
        sut.strikeCount = 3;

        // when
        const actual: boolean = sut.isRoundEnd();

        // then
        expect(actual).toBe(true);
    });
});
