import { VkEventSubscriber } from '../vk-events-publisher/vk-events-publisher';
import { TCallbackMessageNew } from '../vk-events-publisher/vk-callback.types';
import { VkEventContext } from '../vk-events-publisher/vk-event-context';
import { DvachApi } from '../apis/dvach';

export class MessageHandler implements VkEventSubscriber<TCallbackMessageNew>{
  private readonly phrases: string[];

  constructor(
    private readonly dvachApi: DvachApi,
  ) {
    this.phrases = [
      'эта сука хочет денег',
      'cука, я вижу тебя насквозь',
      'Я каменщик, работаю три дня, ы-а. Без зарплаты, у-а',
      'мне так плёхо (хуёво)',
      'наебал',
      'bitch, я висю, как молодой Хефнер',
      'у тебя горит, парень, не ори',
      'у меня горит — это габарит',
      'не путай меня с грязью — это мой флоу',
      'я тебе не угодил — это не то, чего ты ждал?',
      'Всё красиво, когда у папы ксива. Бабки, связи, тёлки, корпоративы',
      'Ра-та-та-та-та, да, сука, новый автомат',
      'эта сука хочет секса, я не дам',
      'пососи',
      'не пиши сюда, от тебя гавной воняет',
      'ты мой краш',
    ]
  }

  async update(context: VkEventContext, event: TCallbackMessageNew) {
    const rand = Math.floor(Math.random() * 25);
    // const rand = 25;
    if (rand === 5) {
      console.log(event);
      const r = await context.reply(this.phrases[Math.floor(Math.random() * this.phrases.length)], event, true);
      console.log(r);
      return
    }

    if (event.message.text === '/дембель') {
      const r = await context.reply('Васе осталось служить еще годик', event, true);
      console.log(r);
      return
    }

    if (/\/2ch/.test(event.message.text)) {
      // const delay = 60 * 2;
      // const timeout = this.timeouts.get('2ch');
      // const offset = +new Date() / 1000;
      // if (timeout && offset - timeout < delay) {
      //   ctx.reply('Еще не время, жди ' + Math.floor(delay - (offset - timeout)) + ' секунд');
      //   return;
      // } else {
      //   this.timeouts.set('2ch', +new Date() / 1000)
      // }

      const table = event.message.text.split(' ');
      if (!table[1]) {
        await context.reply('Используй: /2ch table', event, true);
        return
      }

      const res = await this.dvachApi.getCatalogNum(table[1].trim());

      if (!res) {
        await context.reply('Такого треда нет', event, true);
      }

      const rnd = Math.floor(Math.random() * res.threads.length);

      const thread = res.threads[rnd];
      // let filesStr: string[] = [];
      //
      // if (thread && thread.files_count > 0 && thread.files) {
      //   const server = await context.vkApi.getMessageUploadServer(event.message.peer_id.toString());
      //   let i = 0;
      //   for (const file of thread.files) {
      //     if (file.name.endsWith('.jpg')) {
      //       const image = await this.dvachApi.getImage(file.path);
      //       const fileName = `2ch_${rnd}_${i++}.jpg`;
      //       fs.writeFileSync(fileName, image, 'binary');
      //
      //       const uploadedImg = await context.vkApi.postUploadImage(server.response.upload_url, fileName);
      //
      //       if (uploadedImg.photo) {
      //         const photo = await context.vkApi.saveMessagesPhoto({
      //           ...uploadedImg,
      //         });
      //         filesStr.push(photo);
      //       } else {
      //         await context.reply('Вк не грузит картинку(', event, true);
      //       }
      //       fs.unlink(fileName, (err: any) => {
      //         if (err) {
      //           console.log(err);
      //           console.log('file deleted')
      //         }
      //       })
      //     }
      //   }
      // }
      // await ctx.reply(thread.comment, filesStr.join(','));

      await context.reply(thread.comment, event, true);
      return
    }
  }
}
