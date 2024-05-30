import Lotto from "../model/Lotto";
import Random from "../../../utils/Random";
import {InputView} from "../view/InputView";
import {OutputView} from "../view/OutputView";

class App {

  constructor(
      private readonly inputView: InputView,
      private readonly outputView: OutputView
  ) {}

  async play(): Promise<void> {
    let purchaseAmount: number;

    while (true) {
      try {
        purchaseAmount = await this.inputView.inputPurchaseAmount();
        break;
      } catch (error: any) {
        this.outputView.printError(error.message);
      }
    }

    const lottoCount: number = purchaseAmount / 1000;
    this.outputView.printLottoCount(lottoCount);

    let lottoArray: number[][] = this.issueLotto(lottoCount);

    const winningNumbers: number[] = await this.inputView.inputWinningNumbers();
    const bonusNumber: number = await this.inputView.inputBonusNumber();

    // 사용자가 구매한 로또 번호와 당첨 번호를 비교
    const winningCountMap: Map<string, number> = this.calculateWinningCounts(lottoArray, winningNumbers, bonusNumber);

    const totalWinningAmount: number = this.calculateTotalWinningAmount(winningCountMap);
    const revenue: string = this.calculateRevenue(purchaseAmount, totalWinningAmount);
    this.outputView.printWinningStatistics(winningCountMap, revenue);
  }

  private calculateWinningCounts(lottoArray: number[][], winningNumbers: number[], bonusNumber: number): Map<string, number> {
    let winningCount: number;
    let winningCountMap: Map<string, number> = new Map();

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
    return winningCountMap;
  }

  private issueLotto(lottoCount: number): number[][] {
    let lottoArray: number[][] = [];
    for (let i = 0; i < lottoCount; i++) {
      const randomNumbers: number[] = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto: Lotto = new Lotto(randomNumbers);
      lottoArray.push(lotto.numbers);
      this.outputView.printLottoNumbers(lotto.numbers);
    }
    return lottoArray;
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
