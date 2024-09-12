import styles from './StatusBar.module.css';

import { useClock } from '@/components/mainContent/hooks/useClock';
import ApplicationMenu from '@/components/mainContent/menuBar/ApplicationMenu';
import {
  statusBarData,
  StatusBarItem,
} from '@/components/mainContent/utils/data';
import styled from 'styled-components';
const StyledWrapper = styled.div`
  position: absolute;
  height: 40px;
  left: 0;
  right: 0;
  top: 0;
  background: #ffffff;
  backdrop-filter: blur(1px);
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
`;
const StyledWrapperInnerRight = styled.div`
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;
`;
const StatusBar = () => {
  return (
    <>
      <StyledWrapper>
        <ApplicationMenu />
        <div className={styles.wrapper_inner_right}>
          <RenderStatusBarItems items={statusBarData} />
        </div>
      </StyledWrapper>
    </>
  );
};
const RenderStatusBarItems = ({ items }: { items: StatusBarItem[] }) => {
  const currentTime = useClock();

  return (
    <ul className={styles.right_ul}>
      {items.map((item) => (
        <li key={item.id}>
          <img src={item.url} alt={item.name} />
        </li>
      ))}
      <li>
        <span className={styles.date}>{currentTime}</span>{' '}
        {/* Assuming currentTime is a state or prop */}
      </li>
    </ul>
  );
};
export default StatusBar;
