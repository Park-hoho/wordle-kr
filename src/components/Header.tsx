import React, {useState} from 'react';

const Header = () => {
  const [isStatusPopup, setIsStatusPopup] = useState(false);

  return (
    <>
      <header>
        <h1>WORDLE KR</h1>
        <button onClick={() => setIsStatusPopup(true)}>팝업</button>
      </header>

      {
        isStatusPopup && (
          <div className="popup">
            <div className="popup-content">
              <h4>플레이 현황</h4>
              <div className="status">

              </div>
              <div className="content-button-box">
                <button className="button button-close" onClick={() => setIsStatusPopup(false)}>취소</button>
                <button className="button button-share">공유하기</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Header;