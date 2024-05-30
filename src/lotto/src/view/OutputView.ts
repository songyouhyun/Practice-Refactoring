export interface OutputView {
    printLottoCount(count: number): void;
    printLottoNumbers(lottoNumbers: number[]): void;
    printWinningStatistics(winningCountMap: Map<string, number>, revenue: string): void;
    printError(message: string): void;
}
