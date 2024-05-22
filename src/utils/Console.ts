import { createInterface, Interface } from "readline";

class Console {
    constructor() {}

    static readLine(query: string, callback: (input) => void): void {
        const rl: Interface = createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(query, callback);
    }

    static readLineAsync(query: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const rl: Interface = createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question(query, (input) => {
                rl.close();
                resolve(input);
            });
        });
    }

    static print(message): void {
        console.log(message);
    }
}

export default Console;
