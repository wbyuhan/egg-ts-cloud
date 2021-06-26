import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Space } from 'antd';

import Wycloud from './components/wycloud';

import './index.less';

interface DemoProps {}
function Demo(props: DemoProps) {
  console.log('%c 🥩 props: ', 'font-size:20px;background-color: #465975;color:#fff;', props);
  const ref = useRef<number[] | any>();
  const [, setStateName] = useState<string | any>('');

  let flag = 'a';
  useEffect(() => {
    console.log(
      '%c 🦑 ef.current: ',
      'font-size:20px;background-color: #FFDD4D;color:#fff;',
      ref.current,
    );
    return () => {};
  }, [ref.current]);

  useEffect(() => {
    console.log('%c 🍶 flag: ', 'font-size:20px;background-color: #42b983;color:#fff;', flag);
  }, [flag]);

  const changeRef = () => {
    ref.current = [1, 2];
    flag = 'b';
    testPromise()
      .then((res) => {
        console.log('%c 🍗 res: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', res);
      })
      .catch((error) => {
        console.log('%c 🍶 error: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', error);
        setStateName(error);
      });
  };
  const dom = () => <Input />;

  const testPromise = () => {
    return new Promise<PromiseConstructor>((resolve, reject) => {
      reject(dom());
    });
  };

  return (
    <div className="Demo">
      {console.log(ref.current)}
      <Space size={15}>
        <b>
          <Button type="primary" onClick={changeRef}>
            修改ref
          </Button>
        </b>
        <Wycloud />
      </Space>
    </div>
  );
}
export default Demo;
