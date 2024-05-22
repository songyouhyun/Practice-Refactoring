import Console from "../../../utils/Console";
import Random from "../../../utils/Random";

class App {
  async play(): Promise<void> {
    const playerNamesInput: string = await Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분\n');
    const playerNames: string[] = playerNamesInput.trim().split(',');

    playerNames.forEach((playerName) => {
      if (playerName.length >= 5) {
        throw new Error('[ERROR] 이름은 5자 이하이여야 합니다.')
      }
    })

    const attemptCountInput: string = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    const attemptCount: number = parseInt(attemptCountInput);

    if (isNaN(attemptCount)) {
      throw new Error('[ERROR] 숫자가 잘못된 형식입니다.')
    }

    let advanceMap: Map<string, string> = new Map();
    let advance;

    Console.print('실행 결과');
    for (let i = 0; i < attemptCount; i++) {
      playerNames.forEach((playerName) => {

        advance = advanceMap.get(playerName);
        if (!advance) {
          advance = '';
        }

        const random: number = Random.pickNumberInRange(1, 9);
        if (random >= 4) {
          advance += '-';
        }

        advanceMap.set(playerName, advance);
        Console.print(`${playerName} : ${advance}`);
      })
      Console.print('\n');
    }

    let champion: string = '';
    let max: number = 0;

    // 사용자별 전진 횟수를 비교해서 전진 횟수가 가장 큰 사용자 이름을 출력
    advanceMap.forEach((value, key) => {
      if (max < value.length) {
        max = value.length;
        champion = key;
      } else if (max === value.length) {
        champion += ', ' + key;
      }
    });

    Console.print('최종 우승자 : ' + champion);
  }
}

export default App;
