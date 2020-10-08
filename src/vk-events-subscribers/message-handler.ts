import { VkEventSubscriber } from '../vk-events-publisher/vk-events-publisher';
import { TCallbackMessageNew } from '../vk-events-publisher/vk-callback.types';
import { VkEventContext } from '../vk-events-publisher/vk-event-context';
import { DvachApi } from '../apis/dvach';
import { VkApiAdapterService } from '../vk-api-adapter/vk-api-adapter.service';
import { ImgflipApi } from '../apis/imgflip';

export class MessageHandler implements VkEventSubscriber<TCallbackMessageNew> {
  private readonly phrases: string[];

  constructor(
    private readonly dvachApi: DvachApi,
    private readonly imgflipApi: ImgflipApi,
  ) {
    this.phrases = [
      'эта сука хочет денег',
      'да как же вы доебали уже',
      'Я каменщик, работаю три дня, ы-а. Без зарплаты, у-а',
      'В моей машине все живут по принципу «водитель выбирает музыку — пассажир помалкивает в тряпочку»',
      'наебал',
      'у настоящего маздовода стакан не может быть наполовину пуст или полон, у него он наполовину сгнил',
      'у тебя горит, парень, не ори',
      'у меня горит — это габарит',
      'вы ходите по охуенно тонкому льду',
      'Наибольшую опасность на дорогах представляет машина, которая едет быстрее, чем способен думать ее водитель',
      'Я в жизни ненавижу всего лишь две вещи: расизм и… негров',
      'Ра-та-та-та-та, да, сука, новый автомат',
      'эта сука хочет секса, я не дам',
      'пососи',
      'не пиши сюда, от тебя гавной воняет',
      'ты мой краш',
      'Лучше быть последним в дорожной пробке, чем первым в похоронном кортеже',
      'Новая машина не может служить показателем того, сколько у вас денег, но может служить показателем того, сколько вы должны',
      'Не езди быстрее, чем может летать твой ангел-хранитель!',
      'Веди машину не так, словно тебе принадлежит улица, а так, словно тебе принадлежит машина',
      'Помни: ты явился на свет без запасных частей',
      'В любой непонятной ситуации ложись спать',
      'Чем дольше ты будешь ждать, тем больше дней ты потеряешь навсегда',

    ];
  }

  async update(context: VkEventContext, event: TCallbackMessageNew) {
    const rand = Math.floor(Math.random() * 23);
    // const rand = 25;
    if (rand === 5) {
      console.log(event);
      const r = await context.reply(this.phrases[Math.floor(Math.random() * this.phrases.length)], event, true);
      console.log(r);
      return;
    }

    if (event.message.text === '/дембель') {
      const r = await context.reply('Васе осталось служить еще годик', event, true);
      console.log(r);
      return;
    }

    if (/мазда/i.test(event.message.text)) {
      const r = await context.vkApi.removeChatUser( `${event.message.peer_id - 2000000000}`, event.message.from_id);
      console.log(r);
      await context.reply('получай в жбан, гнилоеб', event);
      return;
    }


    if (/\/2ch/.test(event.message.text)) {
      const table = event.message.text.split(' ');
      if (!table[1]) {
        await context.reply('Используй: /2ch table', event, true);
        return;
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
      return;
    }
  }

  public async generateMeme(texts: string[], peer_id: number, vkApi: VkApiAdapterService) {
    const resp = await this.imgflipApi.getMemes();
    if (resp.success) {
      const filtered = resp.data.memes.filter((i) => i.box_count === texts.length);
      if (filtered.length > 0) {
        let rnd = Math.floor(Math.random() * filtered.length);
        let random_id = filtered[rnd].id;

        const image = await this.imgflipApi.captionImage(random_id, texts);

        if (image.success) {
          await ImgflipApi.saveImg(image.data.url, 'meme.jpg');
          const uploadServer = await vkApi.getMessageUploadServer(peer_id.toString());
          const uploaded = await vkApi.postUploadImage(uploadServer.response.upload_url, 'meme.jpg');

          const photo = await vkApi.saveMessagesPhoto({
            photo: uploaded.photo,
            server: uploaded.server,
            hash: uploaded.hash,
          });

          // @ts-ignore
          console.log('photo' + photo.response[0].owner_id + '_' + photo.response[0].id)
        } else {
          console.error(image);
        }
      }
    } else {
      console.error(resp);
    }
  }
}
