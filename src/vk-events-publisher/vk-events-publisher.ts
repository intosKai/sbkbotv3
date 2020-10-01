import { CallbackType, TCallbacks, VkCallbackRequest } from './vk-callback.types';

export interface VkEventSubscriber<T> {
  update(context: T)
}

type SubscribersArray = VkEventSubscriber<TCallbacks>[][]

export class VkEventsPublisher {
  private readonly subscribers: SubscribersArray;

  constructor() {
    this.subscribers = []

    for (const type in CallbackType) {
      if (CallbackType.hasOwnProperty(type)) {
        this.subscribers[type.toLowerCase()] = []
      }
    }
    console.log(this.subscribers)
  }

  public subscribe(s: VkEventSubscriber<TCallbacks>, type: string) {
    this.subscribers[type].push(s)
  }

  public unsubscribe(s: VkEventSubscriber<TCallbacks>, type: string) {
    // TODO: unsubsctribe
  }

  public notify(req: VkCallbackRequest) {
    console.log('notify')
    for (const sub of this.subscribers[req.type]) {
      sub.update(req.object)
    }
  }
}