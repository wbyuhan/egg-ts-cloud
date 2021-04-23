import React, { useState } from 'react';
import zhui from '@/assets/image/zhui.svg';
import styles from './index.less';

interface HeaderProps {
  onClick?: () => void;
}

const Headers: React.FC<HeaderProps> = (props) => {
  const { onClick } = props;
  const { bounceDown } = styles;

  const [animation, setAnimation] = useState<boolean>(false);
  const handle = () => {
    setAnimation(true);
    if (onClick) {
      onClick();
    }
    setTimeout(() => {
      setAnimation(false);
    }, 2000);
  };

  return (
    <div
      className={styles.zhui}
      style={{ animation: `${animation ? bounceDown : ''} 1.5s linear 1` }}
      onClick={handle}
    >
      <img src={zhui} alt="" />
    </div>
  );
};

export default Headers;
