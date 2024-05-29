import readline from "readline";
import Console from "../Console";

describe('Console', () => {
    describe('print', () => {
        it('주어진 메시지를 콘솔에 출력해야 한다.', () => {
            // given
            const message = 'test';
            const logSpy = jest.spyOn(console, "log");

            // when
            Console.print(message);

            // then
            expect(logSpy).toHaveBeenCalledWith(message);
        });
    });

    describe('readLineAsync', () => {
        it('사용자가 입력한 값을 반환해야 한다.', async () => {
            // given
            const query = "test";
            const userInput: string = "user input";
            const createInterfaceMock = jest.spyOn(readline, "createInterface");
            const readlineMock = {
                question: jest.fn((query: string, callback: (input: string) => void) => {
                    callback(userInput);
                }),
                close: jest.fn(),
            };
            createInterfaceMock.mockReturnValue(readlineMock as unknown as readline.Interface);

            // when
            const result: string = await Console.readLineAsync(query);

            // then
            expect(result).toBe(userInput);
            expect(readlineMock.question).toHaveBeenCalledWith(query, expect.any(Function));
            expect(readlineMock.close).toHaveBeenCalled();

            createInterfaceMock.mockRestore();
        });
    });
});
