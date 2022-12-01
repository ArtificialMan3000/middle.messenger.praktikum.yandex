import {
  THTTPTransportMethod,
  THTTPTransportRequest,
  THTTPTransportRequestOptions,
  TMethodsDictionary,
} from './types';

const METHODS: TMethodsDictionary = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data: Record<string, string>) {
  return Object.entries(data).reduce((acc, entry, index) => {
    const amp = index ? '&' : '';
    return `${acc}${amp}${entry[0]}=${entry[1]}`;
  }, '');
}

function concatUrlWithParams(url: string, params: string) {
  let delimiter = '';
  if (url.includes('?')) {
    if (!url.endsWith('&')) {
      delimiter = '&';
    } else {
      delimiter = '?';
    }
  }
  return `${url}${delimiter}${params}`;
}

export class HTTPTransport {
  get: THTTPTransportMethod = (url, options = {}) => {
    const requestOptions: THTTPTransportRequestOptions = { ...options };
    requestOptions.method = METHODS.GET;
    delete requestOptions.data;

    let urlWithParams = url;
    if (options.data) {
      const strData = queryStringify(options.data);
      urlWithParams = concatUrlWithParams(url, strData);
    }

    return this.request(urlWithParams, requestOptions, options.timeout);
  };

  put: THTTPTransportMethod = (url, options = {}) => {
    const requestOptions: THTTPTransportRequestOptions = { ...options };
    requestOptions.method = METHODS.PUT;

    if (typeof options.data === 'object') {
      requestOptions.data = JSON.stringify(options.data);
    }
    return this.request(url, requestOptions, options.timeout);
  };

  post: THTTPTransportMethod = (url, options = {}) => {
    const requestOptions: THTTPTransportRequestOptions = { ...options };
    requestOptions.method = METHODS.POST;

    if (typeof options.data === 'object') {
      requestOptions.data = JSON.stringify(options.data);
    }
    return this.request(url, requestOptions, options.timeout);
  };

  delete: THTTPTransportMethod = (url, options = {}) => {
    const requestOptions: THTTPTransportRequestOptions = { ...options };
    requestOptions.method = METHODS.POST;

    if (typeof options.data === 'object') {
      requestOptions.data = JSON.stringify(options.data);
    }
    return this.request(url, requestOptions, options.timeout);
  };

  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj
  request: THTTPTransportRequest = (url, options = {}, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const { method = METHODS.GET, headers, data } = options;
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        Object.keys(headers).forEach((header) => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }

      xhr.timeout = timeout;

      xhr.onload = () => resolve(xhr);

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (data && method !== METHODS.GET) {
        xhr.send(data);
      } else {
        xhr.send();
      }
    });
  };
}
