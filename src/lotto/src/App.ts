import Lotto from "./Lotto";
import Console from "../../utils/Console";
import Random from "../../utils/Random";
import ValidationPipe from "../../baseball/src/model/ValidationPipe";

class App {
  async play(): Promise<void> {
    const purchaseAmountInput: string = await Console.readLineAsync('구입금액을 입력해주세요.\n');
    const purchaseAmount: number = Number(purchaseAmountInput);

    if (isNaN(purchaseAmount)) {
      Console.print("[ERROR]");
    }

    const lottoCount: number = purchaseAmount / 1000;

    Console.print(`${lottoCount}개를 구매했습니다.`);
    let lottoArray: number[][] = [];
    for (let i = 0; i < lottoCount; i++) {
      const randomNumbers: number[] = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto: Lotto = new Lotto(randomNumbers);
      lottoArray.push(lotto.numbers);
      Console.print(`[${lotto.numbers.join(', ')}]`);
    }

    const winningNumbersInput: string = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
    const winningNumbers: number[] = ValidationPipe.parseNumberArray(winningNumbersInput);

    const bonusNumberInput: string = await Console.readLineAsync('\n보너스 번호를 입력해주세요.\n');
    const bonusNumber: number = parseInt(bonusNumberInput);

    let winningCountMap: Map<string, number> = new Map();
    let winningCount: number;

    // 사용자가 구매한 로또 번호와 당첨 번호를 비교
    lottoArray.forEach((lottoNumber: number[]): void => {
      const matchingCount = lottoNumber.filter(num => winningNumbers.includes(num)).length;
      const isBonusMatch = lottoNumber.includes(bonusNumber);

      if (matchingCount === 6) {
        winningCount = winningCountMap.get('1등') || 0;
        winningCount++;
        winningCountMap.set('1등', winningCount);
      } else if (matchingCount === 5 && isBonusMatch) {
        winningCount = winningCountMap.get('2등') || 0;
        winningCount++;
        winningCountMap.set('2등', winningCount);
      } else if (matchingCount === 5) {
        winningCount = winningCountMap.get('3등') || 0;
        winningCount++;
        winningCountMap.set('3등', winningCount);
      } else if (matchingCount === 4) {
        winningCount = winningCountMap.get('4등') || 0;
        winningCount++;
        winningCountMap.set('4등', winningCount);
      } else if (matchingCount === 3) {
        winningCount = winningCountMap.get('5등') || 0;
        winningCount++;
        winningCountMap.set('5등', winningCount);
      }
    })

    const totalWinningAmount: number = this.calculateTotalWinningAmount(winningCountMap);
    const revenue: string = this.calculateRevenue(purchaseAmount, totalWinningAmount);

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

  private calculateTotalWinningAmount(winningCountMap: Map<string, number>): number {
    let winningAmount: number = 0;
    winningCountMap.forEach((value, key) => {
      switch (key) {
        case '1등':
          winningAmount += 2000000000;
          break;
        case '2등':
          winningAmount += 30000000;
          break;
        case '3등':
          winningAmount += 1500000;
          break;
        case '4등':
          winningAmount += 50000;
          break;
        case '5등':
          winningAmount += 5000;
          break;
      }
    });
    return winningAmount;
  }

  private calculateRevenue(purchaseAmount: number, totalAmount: number): string {
    return ((totalAmount / purchaseAmount) * 100).toFixed(1);
  }
}

export default App;
