import { Player } from "../model/Player";
import { Score } from "../model/Score";
import { InputView } from "../view/InputView";
import { OutputView } from "../view/OutputView";
import {Computer} from "../model/Computer";
import {GameStatus} from "../model/GameStatus";

class App {

    private restartOrEnd: GameStatus;

    constructor(
        private readonly inputView: InputView,
        private readonly outputView: OutputView,
    ) {}

    async play(): Promise<void> {
        this.outputView.printWelcomeMessage();

        do {
            const computer: Computer = new Computer();
            await this.playRound(computer.numbers);
        } while (!this.restartOrEnd.isEnd());

        this.outputView.printGoodbyeMessage();
    }

    private async playRound(computer: number[]): Promise<void> {
        const score: Score = new Score();
        do {
            const numbers: number[] = await this.inputView.getNumbers();
            const player: Player = new Player(numbers);

            score.countStrikeOrBall(computer, player.numbers)
            const result: string = score.getResultOfScore();
            this.outputView.printResult(result);
        } while (!score.isGameEnd());
        this.restartOrEnd = await this.inputView.getRestartOrEnd();
    }
}

export default App;