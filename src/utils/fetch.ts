import fetch from 'isomorphic-fetch';

export interface IJenkinsAPIOption {
  host: string;
  token?: string;
  username?: string;
}

export default class Fetch {
  private base: URL;
  private defaultRequestOptions: RequestInit;

  constructor(options: IJenkinsAPIOption) {
    this.base = new URL(options.host);

    const headers: { [key: string]: string } = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    if (options.username && options.token) {
      headers.Authorization =
        'Basic ' +
        Buffer.from(options.username + ':' + options.token).toString('base64');
    }

    this.defaultRequestOptions = {
      headers
    };
  }

  public async callAPI<T>(url: string, options: RequestInit) {
    return fetch(url, options)
      .then(res => res.json())
      .then(obj => obj as T);
  }

  public async get<T>(
    path: string,
    options: RequestInit = this.defaultRequestOptions
  ): Promise<T> {
    const requestOptions: RequestInit = {
      credentials: 'omit',
      ...this.defaultRequestOptions,
      ...options,
      method: 'GET'
    };

    const url = new URL(path, this.base);

    return this.callAPI<T>(url.toString(), options);
  }
}
