/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import styled, { css } from 'styled-components';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { useEffect, useRef, useState } from 'react';

const draggables = [
  'You asked if',
  'you could see me',
  'before I went to',
  "Spain, you didn't",
  "give a reason didn't",
  'know what you would',
  'say. But I was hoping',
  'that my breath on your',
  'face would blow every',
  'last thing into place',
];

const StyledSection = styled.section`
  background: aqua;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  text-align: center;

  border: 1px black solid;

  width: min-content;
  margin: auto;
`;

const StyledItem = styled.div`
  width: 350px;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
  margin: 10px 0;
  cursor: grab;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 3px 3px;
  transition: margin 0.25s;
`;
const Name = styled.div`
  width: 100%;
  text-align: center;
  font-family: poppins;
  font-size: 1.1rem;
  font-weight: 500;
`;

const StyledSpan = styled.span`
  position: absolute;
  top: 50%;

  right: 10px;
  font-size: 30px;
  color: rgb(180, 180, 180);
  transform: translate(0, -50%) rotate(90deg);
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  text-align: center;

  border: 1px black solid;

  width: min-content;
  margin: auto;
`;
type StyledListItemProps = {
  isFloating?: boolean;
  left?: number;
  top?: number;
  dropZone?: boolean;
};

const StyledListItem = styled.div<StyledListItemProps>`
  padding: 0.3rem;
  white-space: nowrap;
  cursor: pointer;
  height: 1.5rem;
  background-color: white;
  //  dropzone
  background-color: #ccc;
  transition-property: height padding;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  overflow: hidden;
  //
  ${(props) =>
    props.dropZone &&
    css`
      height: 0px;
      padding: 0px;
    `}

  ${(props) =>
    props.isFloating &&
    css`
      position: absolute;
      left: ${props.left}px;
      top: ${props.top}px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    `}
`;
function ReorderListPage() {
  const [items, setItems] = useState([...draggables]);
  const [dragged, setDragged] = useState<number | null>(null);
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);
  const [dropZone, setDropZone] = useState(0);

  // get mouse coordenates
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse([e.x, e.y]);
    };

    document.addEventListener('mousemove', handler);

    return () => document.removeEventListener('mousemove', handler);
  }, []);
  return (
    <StyledSection>
      {/* ----------FLOATING ITEM---------- */}
      {dragged !== null && (
        <StyledListItem isFloating={true} left={mouse[0]} top={mouse[1]}>
          {items[dragged]}
        </StyledListItem>
      )}
      {/* ----------MAIN LIST---------- */}

      <StyledList className='list '>
        {items.map((value, index) => (
          <>
            {dragged !== index && (
              <StyledListItem
                key={value}
                className='list-item'
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDragged(index);
                }}
              >
                {value}
              </StyledListItem>
            )}
          </>
        ))}
      </StyledList>
    </StyledSection>
  );
}

export default ReorderListPage;
