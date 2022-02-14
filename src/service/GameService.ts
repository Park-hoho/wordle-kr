import GameServiceInterface from "./GameServiceInterface";

class GameService implements GameServiceInterface {
  boardState: string[][];
  evaluations: (string[] | null)[];
  rowIndex: number;
  solution: string[];
  gameStatus: string;

  constructor() {
    if (localStorage.getItem("my-wordle-data")) {
      const data = JSON.parse(<string>localStorage.getItem("my-wordle-data"));
      this.boardState = data.boardState;
      this.evaluations = data.evaluations;
      this.rowIndex = data.rowIndex;
      this.solution = data.solution;
      this.gameStatus = data.gameStatus;

    } else {

      this.boardState = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ];
      this.evaluations = [
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      this.rowIndex = 0;
      this.solution = this.getTodaySolution();
      this.gameStatus = "IN_PROGRESS";
    }
  }

  getTodaySolution(): string[] {
    // todo 서버와 통신하여 값을 가지고올 함수
    return ["ㅎ", "ㅏ", "ㄴ", "ㅡ", "ㄹ"];
  }

  setInitData() {

  }

  setLocalStorage() {
    const data = {
      boardState: this.boardState,
      evaluations: this.evaluations,
      rowIndex: this.rowIndex,
      solution: this.solution,
      gameStatus: this.gameStatus,
    }
    localStorage.setItem("my-wordle-data", JSON.stringify(data))
  }
}

export default GameService;