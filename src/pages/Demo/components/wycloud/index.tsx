import { Button } from 'antd';
import { queryMusic } from '@/services/music';

import './index.less';

/**
 * @ 网易云接口测试地址
 */

interface WycloudProps {}
function Wycloud(props: WycloudProps) {
  console.log('%c 🍾 props: ', 'font-size:20px;background-color: #ED9EC7;color:#fff;', props);
  const getLogin = () => {
    queryMusic().then((res) => {
      console.log('%c 🥟 res: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', res);
    });
  };
  return (
    <div className="wycloud">
      <Button type="primary" onClick={getLogin}>
        点击获取
      </Button>
    </div>
  );
}
export default Wycloud;
