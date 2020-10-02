import * as request from 'request-promise-native';
import { response } from 'express';
import * as fs from 'fs';

type TGetMemeseResponse = {
  success: boolean,
  data: {
    memes: Array<{
      id: string;
      name: string;
      url: string;
      width: number;
      height: number;
      box_count: number;
    }>
  },
}

type TCaptionImageResponse = {
  success: boolean,
  data: {
    url: string;
    page_url: string;
  },
  error_message?: string;
}

export class ImgflipApi {
  constructor(
    private readonly username: string = '',
    private readonly password: string = '',
    private readonly url: string = 'https://api.imgflip.com/get_memes',
  ) {
  }

  public async getMemes(): Promise<TGetMemeseResponse> {
    return (await request.get(this.url)) as TGetMemeseResponse
  }

  public async captionImage(randomId: string, texts: string[]): Promise<TCaptionImageResponse> {
    let boxString = '';
    texts.forEach((i) => {
      boxString += '&boxes[][text]=' + i
    });

    return (await request.post(encodeURI(`https://api.imgflip.com/caption_image?template_id=${randomId}&username=${this.username}&password=${this.password}${boxString}`))) as TCaptionImageResponse;
  }

  static async saveImg(url: string, name: string) {
    const img = await request.get(url);
    fs.writeFileSync(name, img);
  }
}