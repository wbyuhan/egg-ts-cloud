import React from 'react';
import styles from './info.less';

interface InfoProps {
  title: string;
  value: string;
  bordered?: boolean;
}

const Info: React.FC<InfoProps> = (props: InfoProps) => {
  const { title, value, bordered } = props;
  return (
    <>
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    </>
  );
};

export default Info;
