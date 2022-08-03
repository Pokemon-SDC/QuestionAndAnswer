/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

  stages: [
    { duration: '10s', target: 10 },
    // { duration: '10s', target: 200 },
    // { duration: '10s', target: 300 },
    // { duration: '10s', target: 100 },
    // { duration: '10s', target: 0 },
  ],

};

export default () => {
  // POST STRESS TEST

  const randomProdID = Math.floor(Math.random() * 1000000);
  const randomQAID = Math.floor(Math.random() * 10000);

  const params = {
    body: 'i hope this works!',
    name: 'the one and only',
    email: 'hahahah',
    product_id: randomProdID,
  };

  // http.post('http://localhost:3000/qa/questions', JSON.stringify(params), {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // GET STRESS TEST
  http.get(`http://localhost:3000/qa/questions/?product_id=${randomProdID}`);

  // // PUT STRESS TEST
  // http.put(`http://localhost:3000/qa/questions/${randomQAID}/helpful`);

  sleep(1);
};
