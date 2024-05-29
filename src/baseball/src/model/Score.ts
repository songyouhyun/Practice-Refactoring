export class Score {

    private _strikeCount: number;
    private _ballCount: number;

    constructor() {
        this._strikeCount = 0;
        this._ballCount = 0;
    }

    countStrikeOrBall(computerNumbers: number[], playerNumbers: number[]): void {
        this._strikeCount = 0;
        this._ballCount = 0;

        computerNumbers.forEach((computerNumber, computerIndex) => {
            playerNumbers.forEach((playerNumber, playerIndex) => {
                if (playerNumber === computerNumber) {
                    if (playerIndex === computerIndex) {
                        this._strikeCount++;
                    } else {
                        this._ballCount++;
                    }
                }
            });
        });
    }

    getResult(): string {
        let message: string = '';

        if (this._ballCount > 0) {
            message += `${this._ballCount}볼`;
        }

        if (this._strikeCount > 0) {
            if (message.length > 0) {
                message += ' ';
            }
            message += `${this._strikeCount}스트라이크`;
        }

        if (message.length === 0) {
            message += '낫싱';
        }

        return message;
    }

    isRoundEnd(): boolean {
        return this._strikeCount === 3;
    }

    get strikeCount(): number {
        return this._strikeCount;
    }

    get ballCount(): number {
        return this._ballCount;
    }

    set strikeCount(value: number) {
        this._strikeCount = value;
    }

    set ballCount(value: number) {
        this._ballCount = value;
    }
}
