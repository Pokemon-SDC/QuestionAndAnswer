/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
const chakram = require('chakram');

const { expect } = chakram;

describe('Basic Handling of HTTP Requests', () => {
  it('should offer simple PUT HTTP request capabilities', () => chakram.put('http://localhost:3000'));
  it('should offer simple GET HTTP request capabilities', () => chakram.get('http://localhost:3000'));
  it('should offer simple POST HTTP request capabilities', () => chakram.post('http://localhost:3000'));
});

describe('Status Response of PUT HTTP Requests', () => {
  it('should report 204 status with successful PUT HTTP requests', () => {
    const response = chakram.put('http://localhost:3000/qa/questions/9000/report');
    return expect(response).to.have.status(204);
  });
  it('should not report 204 status with unsuccessful PUT HTTP requests with invalid URL path', () => {
    const response = chakram.put('http://localhost:3000/');
    return expect(response).to.not.have.status(204);
  });
});

describe('Status Response of GET Answers HTTP Requests', () => {
  it('should report 200 status with successful GET HTTP requests', () => {
    const response = chakram.get('http://localhost:3000/qa/questions/9000/answers');
    return expect(response).to.have.status(200);
  });
  it('should not report 200 status with successful GET HTTP requests with invalid URL path', () => {
    const response = chakram.get('http://localhost:3000/qa/questions/answers');
    return expect(response).to.not.have.status(200);
  });
});

describe('Response of GET Questions HTTP Requests', () => {
  it('should report 200 status with successful GET HTTP requests', () => {
    const response = chakram.get('http://localhost:3000/qa/questions/?product_id=900');
    return expect(response).to.have.status(200);
  });
  it('should report the appropiate product_id number in the body of response', () => {
    return chakram.get('http://localhost:3000/qa/questions/?product_id=900')
      .then((object) => expect(object.body).to.include({ product_id: '900' }));
  });
  it('should return an object', () => {
    return chakram.get('http://localhost:3000/qa/questions/?product_id=900')
      .then((object) => expect(object.body).to.be.an('object'));
  });
  it('should not report 200 status with successful GET HTTP requests with invalid URL path', () => {
    const response = chakram.get('http://localhost:3000/qa/questions/900');
    return expect(response).to.not.have.status(200);
  });
});

describe('Testing How To Insert Params into Chakram', () => {
  it('should be able to accept body params', () => {
    return chakram.post('http://localhost:3000/qa/questions/', {
      body: 'this is a test',
      name: 'brandon',
      email: '@gmail.com',
      product_id: 300,
    })
      .then((object) => {
        const bodyParams = JSON.parse(object.response.request.body);
        return expect(bodyParams.body).to.equal('this is a test');
      })});
});
