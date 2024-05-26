import {GameStatus} from "../model/GameStatus";

export interface InputView {
    getNumbers(): Promise<number[]>;
    getRestartOrEnd(): Promise<GameStatus>;
}
