import Console from "../../utils/Console";
import Random from "../../utils/Random";
import App from "../src/controller/App";
import {ConsoleInputView} from "../src/view/ConsoleInputView";
import {ConsoleOutputView} from "../src/view/ConsoleOutputView";

jest.mock('../../utils/Random');
jest.mock('../../utils/Console');

const mockQuestions = (inputs: string[]) => {
  const mockReadLineAsync = <jest.Mock>Console.readLineAsync;

  mockReadLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers: number[][]): void => {
  const mockPickUniqueNumbersInRange = <jest.Mock>Random.pickUniqueNumbersInRange;
  numbers.forEach((number) => {
    mockPickUniqueNumbersInRange.mockReturnValueOnce(number);
  })
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("숫자 야구 게임", (): void => {
  test("게임 종료 후 재시작", async (): Promise<void> => {
    // given
    const randoms: number[][] = [[1, 3, 5], [5, 8, 9]];
    const answers: string[] = ["246", "135", "1", "597", "589", "2"];
    const logSpy = getLogSpy();
    const messages: string[] = ["낫싱", "3스트라이크", "1볼 1스트라이크", "3스트라이크", "게임 종료"];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when
    const app: App = new App(new ConsoleInputView(), new ConsoleOutputView());
    await expect(app.play()).resolves.not.toThrow();

    // then
    messages.forEach((output: string): void => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test("예외 테스트", async () => {
    // given
    const randoms: number[] = [1, 3, 5];
    const answers: string[] = ["1234"];

    mockRandoms([randoms]);
    mockQuestions(answers);

    const app: App = new App(new ConsoleInputView(), new ConsoleOutputView());

    // when & then
    await expect(app.play()).rejects.toThrow("[ERROR]");
  });
});
