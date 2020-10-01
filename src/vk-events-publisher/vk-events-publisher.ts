import { CallbackType, TCallbacks, VkCallbackRequest } from './vk-callback.types';
import { VkEventContext } from './vk-event-context';
import { VkApiAdapterService } from '../vk-api-adapter/vk-api-adapter.service';

export interface VkEventSubscriber<T> {
  update(context: VkEventContext, event: T)
}

type SubscribersArray = VkEventSubscriber<TCallbacks>[][]

export class VkEventsPublisher {
  private readonly subscribers: SubscribersArray;

  constructor(
    private readonly vkApiAdapterService: VkApiAdapterService,
  ) {
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
    const context = new VkEventContext(
      req.group_id,
      req.event_id,
      CallbackType[req.type],
      this.vkApiAdapterService,
    );
    for (const sub of this.subscribers[req.type]) {
      sub.update(context, req.object);
    }
  }
}