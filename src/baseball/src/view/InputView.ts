import ValidationPipe from "./ValidationPipe";
import Console from "../../../utils/Console";

export class InputView {
    static async getNumbers(): Promise<number[]> {
        const numbers: string = await Console.readLineAsync('숫자를 입력해주세요 : ');
        return ValidationPipe.parseNumberArray(numbers);
    }

    static async getRestartOrEnd(): Promise<number> {
        const input: string = await Console.readLineAsync(
            '3개의 숫자를 모두 맞히셨습니다! 게임 종료 \n' +
            '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요. \n'
        );
        return ValidationPipe.parseNumber(input);
    }
}
