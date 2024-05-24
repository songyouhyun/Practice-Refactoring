class Lotto {
  private readonly _numbers: number[];

  constructor(numbers: number[]) {
    this.validate(numbers);
    this._numbers = numbers;
  }

  private validate(numbers: number[]): void {
    this.validateLength6(numbers);
    this.validateDuplicate(numbers);
  }

  private validateDuplicate(numbers: number[]): void {
    const uniqueArray: number[] = [];
    numbers.forEach((number) => {
      if (uniqueArray.includes(number)) {
        throw new Error("[ERROR] 중복되지 않는 숫자여야 합니다.")
      }
      uniqueArray.push(number);
    });
  }

  private validateLength6(numbers: number[]): void {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  get numbers() {
    return this._numbers;
  }
}

export default Lotto;
