import React, {useState} from 'react';

type props = {
  onClickWord(word: string): void,
  onClickBackspace(): void,
  onClickEnter(): void
}

function KeyBoard({ onClickWord, onClickBackspace, onClickEnter }: props) {
  const keyShiftRow1 = ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ'];
  const keyRow1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'];
  const keyRow2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
  const keyRow3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];

  const [keyRowFirst, setKeyRowFirst] = useState(keyRow1);
  const [isShift, setIsShift] = useState(false);

  const handleClick = (word: string): void => {
    if (word === "Backspace") {
      onClickBackspace();
    } else if (word === "Enter") {
      onClickEnter();
    } else {
      onClickWord(word);
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
            className={(isShift && 'key-shift--active') + ' key key-shift'}
            id="Shift"
            onClick={onClickShift}
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
          <button
            className="key key-enter"
            id="Enter"
            onClick={() => handleClick("Enter")}
          >Enter</button>
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
          <button
            className="key key-bcksp"
            id="Backspace"
            onClick={() => handleClick("Backspace")}
          >Bcksp</button>
        </div>
      </div>
    </>
  );
}

export default KeyBoard;