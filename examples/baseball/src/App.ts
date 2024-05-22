import { Player } from "./domain/Player";
import { Score } from "./domain/Score";
import Random from '../../../utils/Random';
import { Input } from "./utils/Input";

const GAME_STATUS = {
    START: 1,
    END: 2
}

export class App {

    private inputAboutRestartOrEnd: number | undefined;
    private score: Score | undefined;

    async play() {
        console.log('숫자 야구 게임을 시작합니다');

        do {
            const computer: number[] = this.pickUniqueRandomNumbers(3);
            await this.playRound(computer);
            this.inputAboutRestartOrEnd = await Input.getRestartOrEnd();
        } while (this.inputAboutRestartOrEnd != GAME_STATUS.END);

        console.log('게임 종료');
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
            const numbers: number[] = await Input.getNumbers();
            const player: Player = new Player(numbers);

            this.score = new Score();
            this.score.countStrikeOrBall(computer, player.numbers)

            const result: string = this.score.getResultOfScore();
            console.log(result);
        } while (this.score.strike !== 3);
    }
}
