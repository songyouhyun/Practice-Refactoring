export class GameStatus {
    static readonly START: GameStatus = new GameStatus(1);
    static readonly END: GameStatus = new GameStatus(2);

    private constructor(readonly _code: number) {}

    private static values(): GameStatus[] {
        return [GameStatus.START, GameStatus.END];
    }

    static findByCode(code: number): GameStatus {
        const status: GameStatus = this.values().find((e) => e.equals(code));
        if (!status) {
            throw new Error('[ERROR] GameStatus를 찾을 수 없습니다.');
        }
        return status;
    }

    isGameEnd(): boolean {
        return this._code === GameStatus.END._code;
    }

    private equals(code: number): boolean {
        return this._code === code;
    }
}
