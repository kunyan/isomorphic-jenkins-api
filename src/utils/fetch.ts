import fetch from 'isomorphic-fetch';
import { IJenkinsAPIOption } from '../models/option';
import CustomError from './error';

interface ICrumb {
  _class: string;
  crumb: string;
  crumbRequestField: string;
}

export default class Fetch {
  private base: URL;
  private defaultHeaders: Record<string, string>;

  constructor(options: IJenkinsAPIOption) {
    this.base = new URL(options.host);

    const headers: { [key: string]: string } = {
      // Accept: 'application/json'
      // 'Content-Type': 'application/json'
    };

    if (options.username && options.token) {
      headers.Authorization = this.getAuthorization(
        options.username,
        options.token
      );
    }

    this.defaultHeaders = headers;
  }

  public callAPI<T>(url: string, options: RequestInit) {
    return fetch(url, options)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          return res.json().catch(err => {
            new CustomError(res.status, res.statusText, err);
          });
        }
        return res.text().then(details => {
          throw new CustomError(res.status, res.statusText, details);
        });
      })
      .catch(err => {
        err.toJSON();
      })
      .then(obj => obj as T);
  }

  private async csrf() {
    const requestOptions: RequestInit = {
      credentials: 'omit',
      headers: this.defaultHeaders,
      method: 'GET'
    };

    const path = '/crumbIssuer/api/json';
    const url = new URL(path, this.base);

    return this.callAPI<ICrumb>(url.toString(), requestOptions);
  }

  public get<T>(path: string, options?: RequestInit): Promise<T> {
    const requestOptions: RequestInit = {
      credentials: 'omit',
      headers: this.defaultHeaders,
      ...options,
      method: 'GET'
    };

    const url = new URL(path, this.base);

    return this.callAPI<T>(url.toString(), requestOptions);
  }

  public async post<T>(
    path: string,
    formData: FormData,
    options?: RequestInit
  ): Promise<T> {
    const crumb = await this.csrf();

    const headers = {
      ...this.defaultHeaders,
      [crumb.crumbRequestField]: crumb.crumb
    };

    const requestOptions: RequestInit = {
      credentials: 'omit',
      headers,
      ...options,
      body: formData,
      method: 'POST'
    };

    const url = new URL(path, this.base);

    return this.callAPI<T>(url.toString(), requestOptions);
  }

  private base64(str: string) {
    return Buffer.from(str).toString('base64');
  }

  private getAuthorization(username: string, token: string) {
    const basicAuth = `${username}:${token}`;
    return `Basic ${this.base64(basicAuth)}`;
  }
}
