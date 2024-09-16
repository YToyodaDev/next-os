/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import './page.css';
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

function ReorderListPage() {
  const [items, setItems] = useState([...draggables]);
  const [dragged, setDragged] = useState<number | null>(null);
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);
  const [dropZone, setDropZone] = useState(0);

  //  // listing mouse position
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse([e.x, e.y]);
      console.log(e.x, e.y);
    };

    document.addEventListener('mousemove', handler);

    return () => document.removeEventListener('mousemove', handler);
  }, []);

  // initiate and get mouse coordenates
  useEffect(() => {
    if (dragged !== null) {
      // get all drop-zones
      const elements = Array.from(document.getElementsByClassName('drop-zone'));
      // get all drop-zones' y-axis position
      // if we were using a horizontally-scrolling list, we would get the .left property
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      // get the difference with the mouse's y position
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));

      // get the item closest to the mouse
      let result = absDifferences.indexOf(Math.min(...absDifferences));

      // if the item is below the dragged item, add 1 to the index
      if (result > dragged) result += 1;
      console.log(result);
      setDropZone(result);
    }
  }, [dragged, mouse]);

  // drop item
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dragged !== null) {
        e.preventDefault();
        setDragged(null);

        setItems((items) => reorderList([...items], dragged, dropZone));
      }
    };

    document.addEventListener('mouseup', handler);
    return () => document.removeEventListener('mouseup', handler);
  });

  return (
    <>
      <section className='reorder-list'>
        {/* ----------FLOATING ITEM---------- */}
        {dragged !== null && (
          <div
            className='floating list-item'
            style={{
              left: `${mouse[0]}px`,
              top: `${mouse[1]}px`,
            }}
          >
            {items[dragged]}
          </div>
        )}
        <div className='list'>
          <div
            className={`list-item drop-zone ${
              dragged === null || dropZone !== 0 ? 'hidden' : ''
            }`}
          />
          {/* Drop zone before all items */}
          {items.map((value, index) => (
            <>
              {dragged !== index && (
                <>
                  <div
                    key={index}
                    className='list-item'
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setDragged(index);
                    }}
                  >
                    {value}
                  </div>
                  <div
                    className={`list-item drop-zone ${
                      dragged === null || dropZone !== index + 1 ? 'hidden' : ''
                    }`}
                  />
                </>
              )}
            </>
          ))}
        </div>
      </section>
    </>
  );
}

const reorderList = <T,>(l: T[], start: number, end: number) => {
  const temp = l[start];

  for (let i = start; i < end; i++) {
    l[i] = l[i + 1];
  }
  l[end - 1] = temp;

  return l;
};

const _reorderListBackward = <T,>(l: T[], start: number, end: number) => {
  const temp = l[start];

  for (let i = start; i > end; i--) {
    l[i] = l[i - 1];
  }

  l[end] = temp;

  return l;
};

export default ReorderListPage;
