import { HTTPTransport } from './HTTPTransport';

export type TFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: Record<string, unknown> | FormData | string;
};

export function myFetch(
  url: string,
  { method, headers, body }: TFetchOptions = {},
  timeout = 0
) {
  const HTTP = new HTTPTransport();

  if (method === 'GET') {
    return HTTP.get(url, { headers, data: body, timeout });
  }

  return HTTP.request(url, { method, headers, data: body }, timeout);
}
