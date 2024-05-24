import Console from "../../../utils/Console";

export class OutputView {
    public static startGame() {
        Console.print('숫자 야구 게임을 시작합니다');
    }

    public static endGame() {
        Console.print('게임 종료');
    }

    public static printResult(result: string) {
        Console.print(result);
    }
}
