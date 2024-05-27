import {Player} from "../src/model/Player";

describe('Player', () => {
    it('유효한 숫자들로 Player를 생성할 수 있다.', () => {
        const player: Player = new Player([1, 2, 3]);
        expect(player).toBeInstanceOf(Player);
        expect(player.numbers).toEqual([1, 2, 3]);
    });

    it('숫자 배열의 길이가 3이 아니면 오류를 발생한다.', () => {
        expect(() => new Player([1, 2])).toThrow('[ERROR] 숫자 3개를 입력해주세요.');
        expect(() => new Player([1, 2, 3, 4])).toThrow('[ERROR] 숫자 3개를 입력해주세요.');
    });

    it('숫자 배열에 NaN이 포함되어 있으면 오류를 발생한다.', () => {
        expect(() => new Player([1, NaN, 3])).toThrow('[ERROR] 숫자를 입력해주세요.');
    });

    it('숫자 배열에 양수가 아닌 숫자가 포함되어 있으면 오류를 발생한다.', () => {
        expect(() => new Player([1, -2, 3])).toThrow('[ERROR] 양수를 입력해주세요.');
        expect(() => new Player([1, 0, 3])).toThrow('[ERROR] 양수를 입력해주세요.');
    });

    it('숫자 배열에 중복된 숫자가 포함되어 있으면 오류를 발생한다.', () => {
        expect(() => new Player([1, 2, 2])).toThrow('[ERROR] 서로 다른 숫자를 입력해주세요.');
    });
});
