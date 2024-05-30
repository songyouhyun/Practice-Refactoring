import {InputView} from "./InputView";
import Console from "../../../utils/Console";
import ValidationPipe from "./ValidationPipe";

export class ConsoleInputView implements InputView {
    async inputPurchaseAmount(): Promise<number> {
        const input: string = await Console.readLineAsync('구입금액을 입력해주세요.\n');
        return ValidationPipe.parseNumber(input);
    }

    async inputWinningNumbers(): Promise<number[]> {
        const input: string = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
        return ValidationPipe.parseNumberArray(input);
    }

    async inputBonusNumber(): Promise<number> {
        const input: string = await Console.readLineAsync('\n보너스 번호를 입력해주세요.\n');
        return ValidationPipe.parseNumber(input);
    }
}
