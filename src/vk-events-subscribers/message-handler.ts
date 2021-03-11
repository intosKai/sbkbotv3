import { VkEventSubscriber } from '../vk-events-publisher/vk-events-publisher';
import { TCallbackMessageNew } from '../vk-events-publisher/vk-callback.types';
import { VkEventContext } from '../vk-events-publisher/vk-event-context';
import { DvachApi } from '../apis/dvach';
import { VkApiAdapterService } from '../vk-api-adapter/vk-api-adapter.service';
import { ImgflipApi } from '../apis/imgflip';
import { VKApi } from 'node-vk-sdk';
import { UsersUserFull } from 'node-vk-sdk/distr/src/generated/Models';

export class MessageHandler implements VkEventSubscriber<TCallbackMessageNew> {
  private readonly phrases: string[];
  private lastPidorTime: number | undefined;
  private lastPidor: UsersUserFull;

  constructor(
    private readonly dvachApi: DvachApi,
    private readonly imgflipApi: ImgflipApi,
    private readonly vkApi: VKApi
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
      try {
        const res = await this.vkApi.messagesRemoveChatUser({
          chat_id: Number(event.message.peer_id) - 2000000000,
          user_id: event.message.from_id
        })
      } catch (e) {
        console.error(e);
        await context.reply('ну и хуйня', event);
      }
      await context.reply('получай в жбан, гнилоеб', event);
      return;
    }

    if (/\/pidordaily/.test(event.message.text)) {
      if (this.lastPidorTime && Date.now() - this.lastPidorTime < 1000 * 60 * 60 * 24) {
        context.reply('Рановато будет', event);
        return;
      }
      const { profiles } = await this.vkApi.messagesGetConversationMembers({
        peer_id: event.message.peer_id,
      });
      this.lastPidor = profiles[Math.floor(Math.random() * profiles.length)];
      this.lastPidorTime = Date.now();
      setTimeout(() => {
        context.reply('&#128511;&#127752;Анальное зондированиее активировано&#128168;&#9732;', event);
      }, 0);
      setTimeout(() => {
        context.reply('&#128683;&#10024;Опрашиваем карбодедов на кладбище&#10067;&#8265;', event);
      }, 3000);
      setTimeout(() => {
        context.reply('&#128201;&#127798;Зашли в клуб шорт диглов, чтобы провести опрос&#129421;&#127820;', event);
      }, 6000);
      setTimeout(() => {
        context.reply('&#9940;&#9888;Крутим втек до сраки&#128293;&#9203;', event);
      }, 9000);
      setTimeout(() => {
        context.reply('&#128294&#128270;Рассматриваем чью-то сперму через призму бытия&#10071;&#10069;', event);
      }, 12000);
      setTimeout(() => {
        context.reply('&#129319;&#128701;Требуем фул ребилд копейки&#128219;&#128691;', event);
      }, 16000);
      setTimeout(() => {
        context.reply('&#128169;&#128169;Заходим на форум владельцев рб20&#128037;&#128076;', event);
      }, 20000);
      setTimeout(() => {
        context.reply('&#128166;&#128167;Проверка фитухи очка&#9851;&#11093;', event);
      }, 24000);
      setTimeout(() => {
        context.reply('&#128148;&#127919;Есть пробитие!&#128663;&#128640;', event);
      }, 28000);
      setTimeout(() => {
        context.reply(`&#9829;&#128143;А самый грязный пидор дня сегодня ${this.lastPidor.first_name} ${this.lastPidor.last_name} @id${this.lastPidor.id} &#128248;&#129305`, event);
      }, 32000);
      return;
    }

    if (/\/lastpidor/.test(event.message.text)) {
      context.reply(`Если ты забыл чья жопа сегодня на прицеле, то я тебе скажу, это @id${this.lastPidor.id}`, event);
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
