import {OutputView} from "./OutputView";
import Console from "../../../utils/Console";

export class ConsoleOutputView implements OutputView {
    printWelcomeMessage(): void {
        Console.print('숫자 야구 게임을 시작합니다.');
    }

    printResult(result: string): void {
        Console.print(result);
    }

    printGoodbyeMessage(): void {
        Console.print('게임 종료');
    }
}
