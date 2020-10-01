export enum CallbackType {
  CONFIRMATION = 'confirmation',
  MESSAGE_NEW = 'message_new',
  MESSAGE_REPLY = 'message_reply',
  MESSAGE_EDIT = 'message_edit',
  MESSAGE_ALLOW = 'message_allow',
  MESSAGE_DENY = 'message_deny',
  MESSAGE_TYPING_STATE = 'message_typing_state',
  MESSAGE_EVENT = 'message_event',
}

export type VkCallbackRequest = {
  type: string;
  group_id: number;
  secret: string;
  event_id?: string;
  object?: TCallbacks;
}

// Types

export type TCallbacks = TCallbackMessageNew | TDirectMessage | TCallbackMessageAllow | TCallbackMessageDeny | TCallbackMessageTypingState | TCallbackMessageEvent;

export type TCallbackMessageNew = {
  message: TDirectMessage,
  client_info: TClientInfo,
}

export type TDirectMessage = {
  id: number;
  date: number;
  peer_id?: number;
  from_id: number;
  text: string;
  random_id: number;
  ref?: string;
  ref_source?: string;
  attachments: any[]; // https://vk.com/dev/objects/attachments_m
  important: boolean;
  geo?: TGeo;
  payload?: string;
  keyboard?: TKeyboard; // https://vk.com/dev/bots_docs_3?f=4.+%D0%9A%D0%BB%D0%B0%D0%B2%D0%B8%D0%B0%D1%82%D1%83%D1%80%D1%8B+%D0%B4%D0%BB%D1%8F+%D0%B1%D0%BE%D1%82%D0%BE%D0%B2
  fwd_messages: TDirectMessage[];
  reply_messages?: TDirectMessage;
  action?: TAction;
  conversation_message_id?: number;
}

export type TCallbackMessageAllow = {
  user_id: number;
  key: string;
}

export type TCallbackMessageDeny = {
  user_id: number;
}

export type TCallbackMessageTypingState = {
  state: string;
  from_id: number;
  to_id: number;
}

export type TCallbackMessageEvent = {
  user_id: number;
  peer_id: number;
  event_id: string;
  payload: string;
  conversation_message_id: number;
}

// external types

export type TClientInfo = {
  button_actions: string[];
  keyboard: boolean;
  inline_keyboard: boolean;
  carousel: boolean;
  lang_id: number;
}

export type TGeo = {
  type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
  place: {
    id: number;
    title: string;
    latitude: number;
    longitude: number;
    created: number;
    icon: string;
    country: string;
    city: string;
  }
}

export type TAction = {
  type: 'chat_photo_update' | 'chat_photo_remove' | 'chat_create' | 'chat_title_update' | 'chat_invite_user' | 'chat_kick_user' | 'chat_pin_message' | 'chat_unpin_message' | 'chat_invite_user_by_link';
  member_id: number;
  text: string;
  email: string;
  photo: {
    photo_50: string;
    photo_100: string;
    photo_200: string;
  }
}

export type TKeyboard = {
  one_time: boolean;
  buttons: any[];
  inline: boolean;
}

export type TButton = {
  action: any;
  color: string;
}

