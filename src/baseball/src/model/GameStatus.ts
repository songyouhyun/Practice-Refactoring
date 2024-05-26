export class GameStatus {
    static readonly START: GameStatus = new GameStatus(1);
    static readonly END: GameStatus = new GameStatus(2);

    private constructor(readonly _code: number) {}

    static values(): GameStatus[] {
        return [GameStatus.START, GameStatus.END];
    }

    static valueOf(code: number): GameStatus {
        return this.values().find((e) => e.equals(code));
    }

    isEnd(): boolean {
        return this._code === GameStatus.END._code;
    }

    private equals(code: number): boolean {
        return this._code === code;
    }
}
