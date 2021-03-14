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
      'Неправильный не я... Неправильный весь этот мир',
      'Если я злюсь, это ещё не значит, что должен это показывать',
      'Путь яойщицы - это мой жизненный путь',
      'У них же, мать их, пушки, а в них же, мать их, пули',
      'наебал',
      'у настоящего маздовода стакан не может быть наполовину пуст или полон, у него он наполовину сгнил',
      'В чем сила, брат?',
      'Мальчиков у нас действительно дефицит, но не до такой же степени',
      'вы ходите по охуенно тонкому льду',
      'Элементарно, Ватсон',
      'Я в жизни ненавижу всего лишь две вещи: расизм и… илью',
      'Я подумаю об этом завтра',
      'эта сука хочет секса, я не дам',
      'Я отказываюсь принимать твой отказ',
      'не пиши сюда, от тебя гавной воняет',
      'ты мой краш',
      'Лучше быть последним в дорожной пробке, чем первым в похоронном кортеже',
      'Обожаю запах напалма по утрам',
      'Ловите момент, мальчики',
      'Моя прелесть',
      'Хьюстон, у нас проблема',
      "I'll be back",
      'здарова бандиты',
      'Сдаётся мне, джентльмены, это была комедияСдаётся мне, джентльмены, это была комедия',
      'Вы ещё подеритесь, горячие финские парни…',
      'Спасибо, я пешком постою',
      'Улыбаемся и машем',
      'А ля-ля-ля-ля-ля, а я сошла с ума… Эх, какая досада',
      'Поздравляю тебя, Шарик, ты балбес',
      'Маловата, понимаешь… Маловата будет',
      'Мы строили, строили и, наконец, построили',
      'О, тепленькая пошла',
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

    if (/[мm]+[аa]+[zз3]+[дd]+[aауеe]+/i.test(event.message.text)) {
      try {
        const res = await this.vkApi.messagesRemoveChatUser({
          chat_id: Number(event.message.peer_id) - 2000000000,
          user_id: event.message.from_id
        });
        await context.reply('получай в жбан, гнилоеб', event);
      } catch (e) {
        console.error(e);
        await context.reply('ты либо админ, либо петух', event);
      }
      return;
    }

    if (/пидор дня/i.test(event.message.text)) {
      if (this.lastPidorTime && Date.now() - this.lastPidorTime < 1000 * 60 * 60 * 24) {
        context.reply(`Если ты забыл чья жопа сегодня на прицеле, то я тебе скажу, это @id${this.lastPidor.id}`, event);
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
        context.reply('&#128294;&#128270;Рассматриваем чью-то сперму через призму бытия&#10071;&#10069;', event);
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
        context.reply(`&#9829;&#128143;А самый грязный пидор дня сегодня ${this.lastPidor.first_name} ${this.lastPidor.last_name} @id${this.lastPidor.id} &#128248;&#129305;`, event);
      }, 32000);
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
