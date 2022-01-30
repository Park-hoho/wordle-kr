import React, {useState} from 'react';
import styled from "styled-components";

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

function Header() {
  const [isStatusPopup, setIsStatusPopup] = useState(false);

  return (
    <>
      <header>
        <h1>WORDLE KR</h1>
        <button onClick={() => setIsStatusPopup(true)}>팝업</button>
      </header>

      {
        isStatusPopup && (
          <Popup>
            <div className="popup-content">
              <h4>플레이 현황</h4>
              <div className="status">

              </div>
              <div className="content-button-box">
                <button className="button button-close" onClick={() => setIsStatusPopup(false)}>취소</button>
                <button className="button button-share">공유하기</button>
              </div>
            </div>
          </Popup>
        )
      }
    </>
  );
}

export default Header;