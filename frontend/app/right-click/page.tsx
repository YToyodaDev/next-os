'use client';
import ContextMenu from '@/components/mainContent/rightclick/ContextMenu';
import { useEffect, useRef, useState } from 'react';
import './styles.css';
import useOutsideClick from '@/components/mainContent/hooks/useOutsideClick';
type Person = {
  id: number;
  name: string;
  selected: boolean;
};

const peopleData: Person[] = [
  {
    id: 1,
    name: 'johnny',
    selected: false,
  },
  {
    id: 2,
    name: 'Micheal',
    selected: false,
  },
  {
    id: 3,
    name: 'Jason',
    selected: false,
  },
  {
    id: 4,
    name: 'Cassie',
    selected: false,
  },
];
type Menu = {
  pos: { x: number; y: number };
  toggled: boolean;
};
const initialMenuData = {
  pos: { x: 0, y: 0 },
  toggled: false,
};

function page() {
  const [people, setPeople] = useState<Person[]>(peopleData);
  const [contextMenu, setContextMenu] = useState<Menu>(initialMenuData);
  const contextMenuRef = useRef<HTMLMenuElement | null>(null);

  function handleOnContextMenu(
    e: React.MouseEvent<HTMLLIElement>,
    rightClickPerson?: Person
  ) {
    e.preventDefault();
    if (!contextMenuRef.current) return; // Null check for the ref

    const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
    const isLeft = e.clientX < window?.innerWidth / 2;
    let x;
    const y = e.clientY;
    if (isLeft) {
      x = e.clientX;
    } else x = e.clientX = contextMenuAttr.width;

    setContextMenu({
      pos: {
        x,
        y,
      },
      toggled: true,
    });

    console.log(rightClickPerson);

    setPeople(
      people.map((person) => {
        return {
          ...person,
          selected: person.id === rightClickPerson?.id,
        };
      })
    );
  }

  function resetContextMenu() {
    setContextMenu(initialMenuData);

    setPeople(
      people.map((person) => {
        return {
          ...person,
          selected: false,
        };
      })
    );
  }
  useOutsideClick(contextMenuRef, resetContextMenu);

  return (
    <div>
      <ul>
        {people.map((person, index) => (
          <li
            key={index}
            className={`${person.selected ? 'selected' : ''}`}
            onContextMenu={(e) => handleOnContextMenu(e, person)}
          >
            {person.name}
          </li>
        ))}
      </ul>
      <ContextMenu
        contextMenuRef={contextMenuRef}
        rightClickItem={['']}
        posY={contextMenu.pos.y}
        posX={contextMenu.pos.x}
        isToggled={contextMenu.toggled}
        buttons={[
          {
            text: 'do something',
            icon: '🙏',
            onClick: () => console.log('hello'),
            isSpacer: false,
          },
          {
            text: 'do something',
            icon: '😂',
            onClick: () => console.log('wow'),
            isSpacer: false,
          },
          {
            text: 'do something',
            icon: '💪🏼',
            onClick: () => console.log('Hey'),
            isSpacer: false,
          },
          {
            text: 'do something',
            icon: '😅',
            onClick: () => console.log('Haha'),
            isSpacer: false,
          },
          {
            text: 'do something',
            icon: '🍕',
            onClick: () => console.log('Goodbye'),
            isSpacer: false,
          },
        ]}
      />
    </div>
  );
}

export default page;
