import { Player } from "../model/Player";
import { Score } from "../model/Score";
import { InputView } from "../view/InputView";
import { OutputView } from "../view/OutputView";
import {GameStatus} from "../model/GameStatus";
import Random from "../../../utils/Random";
import Computer from "../model/Computer";

class App {

    private restartOrEnd: GameStatus;

    constructor(
        private readonly inputView: InputView,
        private readonly outputView: OutputView,
    ) {}

    async play(): Promise<void> {
        this.outputView.printWelcomeMessage();

        do {
            const randoms: number[] = Random.pickUniqueNumbersInRange(1, 9, 3);
            const computer: Computer = new Computer(randoms);
            await this.playRound(computer);
        } while (!this.restartOrEnd.isGameEnd());

        this.outputView.printGoodbyeMessage();
    }

    private async playRound(computer: Computer): Promise<void> {
        const score: Score = new Score();

        do {
            const numbers: number[] = await this.inputView.getNumbers();
            const player: Player = new Player(numbers);

            score.countStrikeOrBall(computer.numbers, player.numbers)

            const result: string = score.getResultOfScore();
            this.outputView.printResult(result);
        } while (!score.isRoundEnd());

        this.restartOrEnd = await this.inputView.getRestartOrEnd();
    }
}

export default App;