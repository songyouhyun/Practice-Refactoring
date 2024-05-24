import Console from "../../utils/Console";
import Random from "../../utils/Random";
import App from "../src/controller/App";

const mockQuestions = (inputs: string[]) => {
  Console.readLineAsync = jest.fn();
  const mockReadLineAsync = Console.readLineAsync as jest.Mock;

  mockReadLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers: number[]): void => {
  Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return (acc as jest.Mock).mockReturnValueOnce(number);
  }, Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("숫자 야구 게임", (): void => {
  test("게임 종료 후 재시작", async (): Promise<void> => {
    // given
    const randoms: number[] = [1, 3, 5, 5, 8, 9];
    const answers: string[] = ["246", "135", "1", "597", "589", "2"];
    const logSpy: jest.SpyInstance = getLogSpy();
    const messages: string[] = ["낫싱", "3스트라이크", "1볼 1스트라이크", "3스트라이크", "게임 종료"];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when
    const app: App = new App();
    await expect(app.play()).resolves.not.toThrow();

    // then
    messages.forEach((output: string): void => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test("예외 테스트", async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ["1234"];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when & then
    const app: App = new App();

    await expect(app.play()).rejects.toThrow("[ERROR]");
  });
});
