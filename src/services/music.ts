import request from '@/utils/request';

export async function queryMusic(): Promise<any> {
  return request('/api/logiQrKey', {
    method: 'POST',
  });
}
