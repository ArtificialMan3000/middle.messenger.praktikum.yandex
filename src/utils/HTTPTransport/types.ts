export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type TMethodsDictionary = Record<string, TMethod>;

export type THTTPTransportOptions = {
  headers?: Record<string, string>;
  data?: any;
};

export type THTTPTransportMethodOptions = THTTPTransportOptions & {
  timeout?: number;
};

export type THTTPTransportRequestOptions = THTTPTransportOptions & {
  method?: TMethod;
};

export type THTTPTransportRequest = (
  url: string,
  options?: THTTPTransportRequestOptions,
  timeout?: number
) => Promise<XMLHttpRequest>;

export type THTTPTransportMethod = (
  url: string,
  options?: THTTPTransportMethodOptions
) => ReturnType<THTTPTransportRequest>;
