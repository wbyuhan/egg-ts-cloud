import { useState } from 'react';

const demoPromise = () => {
  return new Promise<void | string>((resolve, reject) => {
    resolve('demo');
    reject();
  });
};

const usePromise = () => {
  const [test, setTes] = useState<number | string | void>(0);
  const souce = async () => {
    const res = await demoPromise();
    setTes(res);
  };
  console.log('%c 🍧 test: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', test);
  return {
    test,
    setTes,
    souce,
  };
};

export default usePromise;
