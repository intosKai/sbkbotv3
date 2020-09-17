import request from 'request';

export class VkRequest {
  constructor(
    private readonly baseURL: string,
    private readonly version: string,
    private readonly authToken: string,
  ) {}

  public async get<T>(method: string, params: any): Promise<T> {
    return new Promise((resolve, reject) => {
      request({
        url: `${this.baseURL}/${method}`,
        method: 'GET',
        qs: {
          access_token: this.authToken,
          v: this.version,
          ...params,
        }
      }, (err: any, response: any, body: any) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        console.log(body)
        resolve(JSON.parse(body))
      })
    })
  }
}