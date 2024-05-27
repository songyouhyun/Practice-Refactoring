import Console from "../../../utils/Console";
import ValidationPipe from "./ValidationPipe";
import {InputView} from "./InputView";
import {GameStatus} from "../model/GameStatus";

export class ConsoleInputView implements InputView {
    async getNumbers(): Promise<number[]> {
        const numbers: string = await Console.readLineAsync('숫자를 입력해주세요 : ');
        return ValidationPipe.parseNumberArray(numbers);
    }

    async getRestartOrEnd(): Promise<GameStatus> {
        const input: string = await Console.readLineAsync(
            '3개의 숫자를 모두 맞히셨습니다! 게임 종료 \n' +
            '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요. \n'
        );
        const number: number = ValidationPipe.parseNumber(input);
        return GameStatus.findByCode(number);
    }
}