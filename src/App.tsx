import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const keyRow1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ']
  const keyRow2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
  const keyRow3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];
  const boardRow = ['first', 'second', 'third', 'fourth', 'fifth']
  const [boardState, setBoardState] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  let currentRow = 0;
  let position = 0;
  const [w, setW] = useState('');


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, [])

  const handleClick = (word: string): void => {
    if (!checkEnterAndBackspace(word)) onClickWord(word);
  }

  const handleKeyDown = (e: any): void => {
    if (!checkEnterAndBackspace(e.key)) onClickWord(changeKeyWord(e.key));
  }

  const checkEnterAndBackspace = (word: string): boolean => {
    switch (word) {
      case 'Enter':
        onClickEnter();
        return true;
      case 'Backspace':
        onClickBackspace();
        return true;
      case 'Shift':
        console.log('Shift!!');
        return true;
      default:
        return false;
    }
  }

  const changeKeyWord = (word: string): string => {
    const map = new Map();
    map.set('Q', 'ㅃ');
    map.set('W', 'ㅉ');
    map.set('E', 'ㄸ');
    map.set('R', 'ㄲ');
    map.set('T', 'ㅆ');
    map.set('Y', 'ㅂ');
    map.set('O', 'ㅒ');
    map.set('P', 'ㅖ');

    map.set('q', 'ㅂ');
    map.set('w', 'ㅈ');
    map.set('e', 'ㄷ');
    map.set('r', 'ㄱ');
    map.set('t', 'ㅅ');
    map.set('y', 'ㅛ');
    map.set('u', 'ㅕ');
    map.set('i', 'ㅑ');
    map.set('o', 'ㅐ');
    map.set('p', 'ㅔ');
    map.set('a', 'ㅁ');
    map.set('s', 'ㄴ');
    map.set('d', 'ㅇ');
    map.set('f', 'ㄹ');
    map.set('g', 'ㅎ');
    map.set('h', 'ㅗ');
    map.set('j', 'ㅓ');
    map.set('k', 'ㅏ');
    map.set('l', 'ㅣ');
    map.set('z', 'ㅋ');
    map.set('x', 'ㅌ');
    map.set('c', 'ㅊ');
    map.set('v', 'ㅍ');
    map.set('b', 'ㅠ');
    map.set('n', 'ㅜ');
    map.set('m', 'ㅡ');
    return map.get(word);
  }

  // 글자입력
  const onClickWord = (word: string | undefined): void => {
    if (word) {
      // 입력값 화면에 렌더
      // console.log(word);
      if (position < 5) {
        setBoardState(prevState => {
          prevState[currentRow][position] = word;
          return prevState;
        })
        position++;
      } else {
        console.log('더 이상 입력할 수 없습니다.');
      }

      console.log(boardState);
      console.log(currentRow);
      console.log(position);
    }
  }

  // 엔터입력
  const onClickEnter = (): void => {
    console.log('Enter!!');
    // 진행중인 행의 단어 추출
    // 사전에 있는 단어인지 체크 메서드
      // 오늘의 단어와 맞는지 체크 메서드

      // true
        // modal창으로 기록 표시

      // false
        // 정답과 글자의 위치 체크 후 keyboadr, board에 표시 ( 같은위치 같은값, 다른위치 같은값 )
        // 다음 행으로 넘어감
        // 만약 다음 행이없으면 게임 끝
    if (position === 5 && currentRow < 6) {
      currentRow++;
      position = 0;
    } else {
      console.log('더 이상 게임을 할 수 없습니다.');
    }
    console.log(currentRow);
  }

  // 백스페이스 입력
  const onClickBackspace = (): void => {
    // 입력값 화면에 지움
    console.log('Backspace!!');
    if (position > 0) {
      position--;
    }
  }

  return (
    <div className="wrap">

      <header>
        <h1>WORDLE KR</h1>
        {currentRow}
      </header>

      <main>
        <div className="board">
          {
            boardState.map((row, i) => (
              <div
                className="board-row"
                key={"row" + i}
              >
                <div className="tile">{row[0]}</div>
                <div className="tile">{row[1]}</div>
                <div className="tile">{row[2]}</div>
                <div className="tile">{row[3]}</div>
                <div className="tile">{row[4]}</div>
              </div>
            ))
          }
        </div>
      </main>

      <div className="keyboard">
        <div className="row">
          {
            keyRow1.map(i =>
              <button
                className="key"
                key={i}
                id={i}
                onClick={() => handleClick(i)}
              >{i}</button>
            )
          }
        </div>
        <div className="row">
          <button className="key" onClick={() => handleClick('Shift')}>Shift</button>
          {
            keyRow2.map(i =>
              <button
                className="key"
                key={i}
                id={i}
                onClick={() => handleClick(i)}
              >{i}</button>
            )
          }
        </div>
        <div className="row">
          <button className="key" onClick={() => handleClick('Enter')}>Enter</button>
          {
            keyRow3.map(i =>
              <button
                className="key"
                key={i}
                id={i}
                onClick={() => handleClick(i)}
              >{i}</button>
            )
          }
          <button className="key" onClick={() => handleClick('Backspace')}>Bcksp</button>
        </div>
      </div>

    </div>
  );
}

export default App;
