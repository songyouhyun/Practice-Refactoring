import {OutputView} from "./OutputView";
import Console from "../../../utils/Console";

export class ConsoleOutputView implements OutputView {
    printLottoCount(count: number): void {
        Console.print(`${count}개를 구매했습니다.`);
    }

    printLottoNumbers(lottoNumbers: number[]): void {
        Console.print(`[${lottoNumbers.join(', ')}]`);
    }

    printWinningStatistics(winningCountMap: Map<string, number>, revenue: string): void {
        Console.print(
            '\n당첨 통계\n' +
            '---\n' +
            `3개 일치 (5,000원) - ${winningCountMap.get('5등') || 0}개\n` +
            `4개 일치 (50,000원) - ${winningCountMap.get('4등') || 0}개\n` +
            `5개 일치 (1,500,000원) - ${winningCountMap.get('3등') || 0}개\n` +
            `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningCountMap.get('2등') || 0}개\n` +
            `6개 일치 (2,000,000,000원) - ${winningCountMap.get('1등') || 0}개\n` +
            `총 수익률은 ${revenue}%입니다.`
        );
    }

    printError(message: string): void {
        Console.print(message);
    }
}
