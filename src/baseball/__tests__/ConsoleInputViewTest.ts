import {ConsoleInputView} from "../src/view/ConsoleInputView";
import ValidationPipe from "../src/view/ValidationPipe";
import Console from "../../utils/Console";
import {GameStatus} from "../src/model/GameStatus";

describe('ConsoleInputView', () => {
    it('입력받은 문자열을 숫자 배열로 파싱한다.', async () => {
        // given
        const answers: string[] = ["1,2,3"];
        const outputs: number[] = [1, 2, 3];

        Console.readLineAsync = jest.fn();
        const mockReadLineAsync = Console.readLineAsync as jest.Mock;
        mockReadLineAsync.mockImplementation(() => {
            const input = answers.shift();
            return Promise.resolve(input);
        });

        ValidationPipe.parseNumberArray = jest.fn();
        const mockParseNumberArray = ValidationPipe.parseNumberArray as jest.Mock;
        mockParseNumberArray.mockReturnValue(outputs);

        // when
        const consoleInputView: ConsoleInputView = new ConsoleInputView();
        const numbers: number[] = await consoleInputView.getNumbers();

        // then
        expect(Console.readLineAsync).toHaveBeenCalledWith('숫자를 입력해주세요 : ');
        expect(ValidationPipe.parseNumberArray).toHaveBeenCalledWith("1,2,3");
        expect(numbers).toEqual([1, 2, 3]);
    });

    it.each([
        { answer: "1", output: 1, expected: GameStatus.START },
        { answer: "2", output: 2, expected: GameStatus.END },
    ])('입력받은 코드를 GameStatus 객체로 변환한다.',
    async ({ answer, output, expected}) => {
        // given
        Console.readLineAsync = jest.fn();
        const mockReadLineAsync = Console.readLineAsync as jest.Mock;
        mockReadLineAsync.mockImplementation(() => {
            return Promise.resolve(answer);
        });

        ValidationPipe.parseNumber = jest.fn();
        const mockParseNumber = ValidationPipe.parseNumber as jest.Mock;
        mockParseNumber.mockReturnValue(output);

        GameStatus.findByCode = jest.fn();
        const mockFindByCode = GameStatus.findByCode as jest.Mock;
        mockFindByCode.mockReturnValue(expected);

        // when
        const consoleInputView: ConsoleInputView = new ConsoleInputView();
        const gameStatus: GameStatus = await consoleInputView.getRestartOrEnd();

        // then
        expect(Console.readLineAsync).toHaveBeenCalledWith(
            '3개의 숫자를 모두 맞히셨습니다! 게임 종료 \n' +
            '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요. \n'
        );
        expect(ValidationPipe.parseNumber).toHaveBeenCalledWith(answer);
        expect(GameStatus.findByCode).toHaveBeenCalledWith(output);
        expect(gameStatus).toEqual(expected);
    });
});
