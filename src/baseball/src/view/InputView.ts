export interface InputView {
    getNumbers(): Promise<number[]>;
    getRestartOrEnd(): Promise<number>;
}
