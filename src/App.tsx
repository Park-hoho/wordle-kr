import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import Header from './components/Header';
import styled from "styled-components";

function App() {
  const keyShiftRow1 = ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ'];
  const keyRow1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'];
  const keyRow2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
  const keyRow3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];
  const [keyRowFirst, setKeyRowFirst] = useState(keyRow1);
  const [boardState, setBoardState] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [tileState, setTileState] = useState(Array(5));
  let currentRow = useRef(0);
  let position = useRef(0);
  const result = ['ㅎ', 'ㅏ', 'ㄴ', 'ㅡ', 'ㄹ']
  const [isShift, setIsShift] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, [])

  const handleClick = (word: string): void => {
    if (!checkEnterBackspaceShift(word)) onClickWord(word)
  }

  const handleKeyDown = (e: any): void => {
    if (!checkEnterBackspaceShift(e.key)) onClickWord(changeKeyWord(e.key))
  }

  const checkEnterBackspaceShift = (word: string): boolean => {
    switch (word) {
      case 'Enter':
        onClickEnter();
        return true;
      case 'Backspace':
        onClickBackspace();
        return true;
      case 'virtualKeyboardShift':
        onClickShift();
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
  const onClickWord = (word: string | undefined) => {
    if (word) {
      if (position.current < 5) {
        updateBoardState(word).then(() => {
          position.current += 1;
        })
      } else {
        console.log('더 이상 입력할 수 없습니다.');
      }
    }
  }

  const updateBoardState = async (word: string) => {
    await setBoardState((prev) => {
      const news = [...prev];
      console.debug("Insert: [" + currentRow.current + "][" + position.current + "]");
      news[currentRow.current][position.current] = word;
      return news;
    })
  }

  // 엔터입력
  const onClickEnter = (): void => {
    // 사전에 있는 단어인지 체크 메서드
    // 오늘의 단어와 맞는지 체크 메서드

    // true
    // modal창으로 기록 표시

    // false
    // 정답과 글자의 위치 체크 후 keyboadr, board에 표시 ( 같은위치 같은값, 다른위치 같은값 )
    // 다음 행으로 넘어감
    // 만약 다음 행이없으면 게임 끝
    if (position.current === 5) {
      console.log(boardState[currentRow.current]);
      if (JSON.stringify(boardState[currentRow.current]) === JSON.stringify(result)) {
        console.log('정답');
      } else {
        currentRow.current += 1;
        position.current = 0;
      }
    } else {
      if (currentRow.current < 6) {
        console.log('꽉채워주세요');
      } else {
        console.log('오늘 게임 완료');
      }
    }
    console.log('Enter!');
  }

  // 백스페이스 입력
  const onClickBackspace = (): void => {
    if (0 <= position.current) {
      position.current = position.current === 0 ? 0 : position.current - 1;

      setBoardState((prev) => {
        const news = [...prev];
        news[currentRow.current][position.current] = '';
        return news;
      });
      console.log('Backspace!');
    }
  }

  const onClickShift = (): void => {
    console.log('Shift!!');
    setIsShift(!isShift);
    if (!isShift) {
      setKeyRowFirst(keyShiftRow1);
    } else {
      setKeyRowFirst(keyRow1);
    }
  }

  return (
    <>
      <Header/>
      <Main>
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
      </Main>

      <div className="keyboard">
        <div className="row">
          {
            keyRowFirst.map(i =>
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
          <button
            className={(isShift && 'key-shift--active') + ' key' + ' key-shift'}
            id="Shift"
            onClick={() => handleClick('virtualKeyboardShift')}
          >Shift
          </button>
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
          <button className="key key-enter" id="Enter" onClick={() => handleClick('Enter')}>Enter</button>
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
          <button className="key key-bcksp" id="Backspace" onClick={() => handleClick('Backspace')}>Bcksp</button>
        </div>
      </div>



    </>
  );
}

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
`;

export default App;
