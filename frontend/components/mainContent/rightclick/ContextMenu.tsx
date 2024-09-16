import { LegacyRef } from 'react';
import './ContextMenu.css';
type Button = {
  text: string;
  icon: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    rightClickItem: string[]
  ) => void;
  isSpacer: boolean;
};

interface Props {
  rightClickItem: string[];
  posY: number;
  posX: number;
  isToggled: boolean;
  buttons: Button[];
  contextMenuRef: LegacyRef<HTMLMenuElement> | null;
}

function ContextMenu({
  rightClickItem,
  posX,
  posY,
  isToggled,
  buttons,
  contextMenuRef,
}: Props) {
  return (
    <menu
      style={{ top: posY + 2 + 'px', left: posX + 2 + 'px' }}
      className={`context-menu ${isToggled ? 'active' : ''}`}
      ref={contextMenuRef}
    >
      {buttons.map((button, index) => {
        function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
          e.stopPropagation();
          button.onClick(e, rightClickItem);
        }

        if (button.isSpacer) return <hr key={index} />;

        return (
          <button
            key={index}
            className='context-menu-button'
            onClick={handleClick}
          >
            <span>{button.text}</span>
            <span className='icon'>{button.icon}</span>
          </button>
        );
      })}
    </menu>
  );
}

export default ContextMenu;
