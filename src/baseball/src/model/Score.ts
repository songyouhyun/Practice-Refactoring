export class Score {

    private _strike: number;
    private _ball: number;

    constructor() {
        this._strike = 0;
        this._ball = 0;
    }

    countStrikeOrBall(computer: number[], player: number[]): void {
        this._strike = 0;
        this._ball = 0;

        computer.forEach((computerValue, computerIndex) => {
            player.forEach((playerValue, playerIndex) => {
                if (playerValue === computerValue) {
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


    get strike(): number {
        return this._strike;
    }
}
