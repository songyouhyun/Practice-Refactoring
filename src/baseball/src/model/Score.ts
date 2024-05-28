export class Score {

    private _strike: number;
    private _ball: number;

    constructor() {
        this._strike = 0;
        this._ball = 0;
    }

    countStrikeOrBall(computerNumbers: number[], playerNumbers: number[]): void {
        this._strike = 0;
        this._ball = 0;

        computerNumbers.forEach((computerNumber, computerIndex) => {
            playerNumbers.forEach((playerNumber, playerIndex) => {
                if (playerNumber === computerNumber) {
                    if (playerIndex === computerIndex) {
                        this._strike++;
                    } else {
                        this._ball++;
                    }
                }
            });
        });
    }

    getResultOfScore(): string {
        let message: string = '';

        if (this._ball > 0) {
            message += `${this._ball}볼`;
        }

        if (this._strike > 0) {
            if (message.length > 0) {
                message += ' ';
            }
            message += `${this._strike}스트라이크`;
        }

        if (message.length === 0) {
            message += '낫싱';
        }

        return message;
    }

    isRoundEnd(): boolean {
        return this._strike === 3;
    }
}
