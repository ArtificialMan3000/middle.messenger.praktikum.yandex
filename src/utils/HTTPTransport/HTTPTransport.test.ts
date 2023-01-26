import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let transport: HTTPTransport;
  let fakeRequest: SinonFakeXMLHttpRequest;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      fakeRequest = request;
    };

    transport = new HTTPTransport();
  });

  it('method get should send GET request', () => {
    transport.get('/user');

    expect(fakeRequest.method).to.eq('GET');
  });

  it('method post should send POST request', () => {
    transport.post('/user');

    expect(fakeRequest.method).to.eq('POST');
  });
});
