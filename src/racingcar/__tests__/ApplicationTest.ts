import Console from "../../utils/Console";
import Random from "../../utils/Random";
import App from "../src/App";

jest.mock('../../utils/Random');
jest.mock('../../utils/Console');

const mockQuestions = (inputs: string[]) => {
  const mockReadLineAsync = <jest.Mock>Console.readLineAsync;

  mockReadLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers: number[]): void => {
  const mockPickNumberInRange = <jest.Mock>Random.pickNumberInRange;

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, mockPickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주 게임", () => {
  test("전진-정지", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const outputs = ["pobi : -"];
    const randoms = [MOVING_FORWARD, STOP];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([...randoms]);

    // when
    const app: App = new App();
    await app.play();

    // then
    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test.each([
    [["pobi,javaji"]],
    [["pobi,eastjun"]]
  ])("이름에 대한 예외 처리", async (inputs) => {
    // given
    mockQuestions(inputs);

    // when
    const app: App = new App();

    // then
    await expect(app.play()).rejects.toThrow("[ERROR]");
  });
});
