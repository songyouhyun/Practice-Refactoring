import {GameStatus} from "../src/model/GameStatus";

describe('GameStatus', () => {
    it('코드를 통해 GameStatus를 찾는다.', () => {
        expect(GameStatus.findByCode(1)).toBe(GameStatus.START);
        expect(GameStatus.findByCode(2)).toBe(GameStatus.END);
    });

    it('존재하지 않는 코드는 에러를 반환한다.', () => {
        expect(() => GameStatus.findByCode(null)).toThrow('[ERROR] GameStatus를 찾을 수 없습니다.');
    });

    it('END 상태에서 isGameEnd()를 호출하면 true를 반환한다.', () => {
        expect(GameStatus.END.isGameEnd()).toBe(true);
    });

    it('START 상태에서 isGameEnd()를 호출하면 false를 반환한다.', () => {
        expect(GameStatus.START.isGameEnd()).toBe(false);
    });
});