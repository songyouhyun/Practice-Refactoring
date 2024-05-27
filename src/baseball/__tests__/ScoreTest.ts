import {Score} from "../src/model/Score";

describe('Score', () => {
    it.each([
        { computer: [1, 2, 3], player: [1, 2, 3], expected: '3스트라이크' },
        { computer: [1, 2, 3], player: [1, 3, 2], expected: '2볼 1스트라이크' },
        { computer: [1, 2, 3], player: [4, 5, 6], expected: '낫싱' },
    ])('같은 수가 같은 자리에 있으면 스트라이크, 다른 자리에 있으면 볼, 같은 수가 전혀 없으면 낫싱을 반환한다.',
        ({ computer, player, expected }) => {
        // given
        const score: Score = new Score();

        // when
        score.countStrikeOrBall(computer, player);
        const resultOfScore: string = score.getResultOfScore();

        // then
        expect(resultOfScore).toBe(expected);
    });

    it('스트라이크가 3개인 경우, 라운드가 종료된다.', () => {
        const score: Score = new Score();

        score.countStrikeOrBall([1, 2, 3], [1, 3, 2]);
        expect(score.isRoundEnd()).toBe(false);

        score.countStrikeOrBall([1, 2, 3], [1, 2, 3]);
        expect(score.isRoundEnd()).toBe(true);
    });
});
