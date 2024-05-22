export class Pipe {
    static parseInputToNumbers(value: any): number[] {
        return value.trim().split('').map((value: string) => parseInt(value));
    }
}