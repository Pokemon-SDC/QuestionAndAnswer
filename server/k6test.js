import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 400 },
    { duration: '2m', target: 500 },
    { duration: '1m', target: 800 },
    { duration: '2m', target: 0 },
  ],
};

export default () => {
  http.put('http://localhost:3000/qa/questions/900/helpful');
  sleep(1);
};