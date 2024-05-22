import { Player } from "../model/Player";
import { Score } from "../model/Score";
import Random from '../../../utils/Random';
import { InputView } from "../view/InputView";
import {OutputView} from "../view/OutputView";

const GAME_STATUS = {
    START: 1,
    END: 2
}

export class App {

    private inputAboutRestartOrEnd: number | undefined;
    private score: Score | undefined;
    private outputView: OutputView = new OutputView();

    async play() {
        this.outputView.startGame();

        do {
            const computer: number[] = this.pickUniqueRandomNumbers(3);
            await this.playRound(computer);
            this.inputAboutRestartOrEnd = await InputView.getRestartOrEnd();
        } while (this.inputAboutRestartOrEnd != GAME_STATUS.END);

        this.outputView.endGame();
    }

    pickUniqueRandomNumbers(count: number) {
        const uniqueArray: number[] = [];
        while (uniqueArray.length < count) {
            const number: number = Random.pickNumberInRange(1, 9);
            if (!uniqueArray.includes(number)) {
                uniqueArray.push(number);
            }
        }
        return uniqueArray;
    }

    async playRound(computer: number[]): Promise<void> {
        do {
            const numbers: number[] = await InputView.getNumbers();
            const player: Player = new Player(numbers);

            this.score = new Score();
            this.score.countStrikeOrBall(computer, player.numbers)

            const result: string = this.score.getResultOfScore();
            console.log(result);
        } while (this.score.strike !== 3);
    }
}
