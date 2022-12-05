import { HTTPTransport } from './HTTPTransport';

export type TFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: FormData | string;
};

export function myFetch(
  url: string,
  { method, headers, body }: TFetchOptions = {},
  timeout = 0
) {
  const HTTP = new HTTPTransport();
  return HTTP.request(url, { method, headers, data: body }, timeout);
}
