import React, {useState} from 'react';
import styled from "styled-components";

function Header() {
  const [isStatusPopup, setIsStatusPopup] = useState(false);

  const handleMenu = () => {
    console.log("menu");
  }
  
  return (
    <>
      <HeaderTag>
        <h1>WORDLE KR</h1>
        <div>
          <button onClick={() => setIsStatusPopup(true)}>팝업</button>
          <MenuIcon onClick={handleMenu}>
            <span />
            <span />
            <span />
          </MenuIcon>
        </div>
      </HeaderTag>

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

const HeaderTag = styled.header`
  padding: 0 0 0 16px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  border-bottom: 1px solid #e1e1e1;
`;

const MenuIcon = styled.button`
  width: 60px;
  height: 60px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  span {
    width: 24px;
    height: 2px;
    display: block;
    margin: 4px auto;
    transition: all 0.3s ease-in-out;
    background-color: #000000;
  }
`;