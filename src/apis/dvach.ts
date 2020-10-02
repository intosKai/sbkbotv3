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

type TGetCatalogNumResponse = {
  Board: string;
  BoardInfo: string;
  BoardInfoOuter: string;
  BoardName: string;
  advert_bottom_image: string;
  advert_bottom_link: string;
  advert_mobile_image: string;
  advert_mobile_link: string;
  advert_top_image: string;
  advert_top_link: string;
  board_banner_image: string;
  board_banner_link: string;
  bump_limit: number
  default_name: string;
  max_files_size: number;
  threads: Thread[]
}

type File = {
  displayname: string,
  fullname: string,
  height: number,
  md5: string,
  name: string,
  nsfw: number,
  path: string,
  size: number,
  thumbnail: string,
  tn_height: number,
  tn_width: number,
  type: number,
  width: number,
}

export class DvachApi {
  constructor() {
  }

  public async getCatalogNum(table: string): Promise<Thread[]> {
    return request.get(`https://2ch.hk/${table}/catalog_num.json`);
  }

  public async getImage(path: string): Promise<string> {
    return request.get(`https://2ch.hk${path}`, {
      encoding: 'binary',
    });
  }
}