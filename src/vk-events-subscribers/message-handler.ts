import { VkEventSubscriber } from '../vk-events-publisher/vk-events-publisher';
import { TCallbackMessageNew } from '../vk-events-publisher/vk-callback.types';
import { VkEventContext } from '../vk-events-publisher/vk-event-context';

export class MessageHandler implements VkEventSubscriber<TCallbackMessageNew>{
  private readonly phrases: string[];

  constructor(
  ) {
    this.phrases = [
      'эта сука хочет денег',
      'cука, я вижу тебя насквозь',
      'Я каменщик, работаю три дня, ы-а. Без зарплаты, у-а, я не отдам, я голоден',
      'мне так плёхо (хуёво)',
      'наебал',
      'bitch, я висю, как молодой Хефнер',
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
    const rand = Math.floor(Math.random() * 50);
    // const rand = 25;
    if (rand === 5) {
      const r = await context.reply(this.phrases[Math.floor(Math.random() * this.phrases.length)], event, false);
      console.log(r)
    }
  }
}
