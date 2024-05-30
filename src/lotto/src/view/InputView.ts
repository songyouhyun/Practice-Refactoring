export interface InputView {
    inputPurchaseAmount(): Promise<number>;
    inputWinningNumbers(): Promise<number[]>;
    inputBonusNumber(): Promise<number>;
}
