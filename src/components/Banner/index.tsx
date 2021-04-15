import React from 'react';
import bc from '@/assets/image/bc.jpeg';
import style from './index.less';

const Banner: React.FC = () => {
  return (
    <div className={style.banner}>
      <img className={style.bc} src={bc} alt="baner" />
    </div>
  );
};

export default Banner;
