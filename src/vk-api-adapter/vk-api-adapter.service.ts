import { Injectable } from '@nestjs/common';
import { VkRequest } from '../utils/VkRequest';
import { VK_API_TOKEN, VK_API_VERSION, VK_BASE_URL } from '../config';
import * as request from 'request-promise-native';
import * as fs from 'fs';
import { TKeyboard } from '../vk-events-publisher/vk-callback.types';

@Injectable()
export class VkApiAdapterService {
  private client: VkRequest;


  constructor() {
    this.client = new VkRequest(
      VK_BASE_URL,
      VK_API_VERSION,
      VK_API_TOKEN
    )
  }

  public async getConversationMembers(peer_id: number): Promise<TConversationMembersResponse> {
    const { response } = await this.client.get<{response: TConversationMembersResponse}>('messages.getConversationMembers', {
      peer_id,
    });
    return response;
  }

  public async removeChatUser(chat_id: string, user_id: number) {
    return await this.client.get('messages.removeChatUser', {
      chat_id,
      user_id,
    });
  }

  public async saveMessagesPhoto(data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.vk.com/method/photos.saveMessagesPhoto',
        method: 'GET',
        qs: {
          access_token: VK_API_TOKEN,
          v: VK_API_VERSION,
          ...data
        }
      }, (err: any, response: any, body: any) => {
        if (err) {
          console.error(err);
          reject(err)
        }

        let obj = JSON.parse(body);
        console.log(obj);
        resolve('photo' + obj.response[0].owner_id + '_' + obj.response[0].id)
      })
    })
  }

  public async getMessageUploadServer(peer_id: string): Promise<{response: {upload_url: string, album_id: string, group_id: string}}> {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: 'https://api.vk.com/method/photos.getMessagesUploadServer',
        qs: {
          access_token: VK_API_TOKEN,
          v: VK_API_VERSION,
          peer_id,
        }
      }, (err: any, response: any, body: any) => {
        if (err) {
          console.error(err);
          reject(err)
        }
        resolve(JSON.parse(body))
      })
    })
  }

  public async postUploadImage(url: string, fileName: string): Promise<{photo: string, server: string, hash: string}> {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url,
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'multipart/form-data'
        },
        formData: {
          photo: {
            value: fs.createReadStream(fileName),
            options: {
              filename: fileName,
              contentType: null
            }
          }
        }
      }, (err: any, response: any, body: any) => {
        if (err) {
          console.error(err);
          reject(err)
        }
        resolve(JSON.parse(body))
      })
    })
  }

  public async send(data: {
    user_id?: number,
    random_id: number,
    peer_id: number,
    domain?: string,
    chat_id?: string,
    user_ids?: string,
    message: string,
    lat?: number,
    long?: number,
    attachment?: string,
    reply_to?: number,
    forward_messages?: string,
    sticker_id?: string,
    group_id: string,
    keyboard?: TKeyboard,
    template?: any,
    payload: string,
    content_source?: string,
    dont_parse_links?: 1 | 0,
    disable_mentions?: 1 | 0,
    intent?: any,
    subscribe_id?: any,
  }): Promise<string | Array<{
    peer_id: string,
    message_id: string,
    conversation_message_id: string,
    error: string,
  }>> {
    return request({
        method: 'POST',
        url: 'https://api.vk.com/method/messages.send',
        qs: {
          access_token: VK_API_TOKEN,
          v: VK_API_VERSION,
          ...data,
        }
      });
    }
}
