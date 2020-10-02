import * as request from 'request-promise-native';

type Thread = {
  banned: number,
  closed: number,
  comment: string,
  date: string,
  email: string,
  endless: number,
  files: File[];
  files_count: number,
  lasthit: number,
  name: string,
  num: string,
  op: 0,
  parent: 0,
  posts_count: number,
  sticky: number,
  subject: string,
  tags: string,
  timestamp: number,
  trip: string,
}

export class DvachApi {
  constructor() {
  }

  public async getCatalogNum(table: string): Promise<{ threads: Thread[] }> {
    return request.get(`https://2ch.hk/${table}/catalog_num.json`);
  }

  public async getImage(path: string): Promise<string> {
    return request.get(`https://2ch.hk${path}`, {
      encoding: 'binary',
    });
  }
}