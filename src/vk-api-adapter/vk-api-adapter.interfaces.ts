type TGroup = {
  id: number,
  name: string,
  screen_name: string,
  is_closed: number,
  deactivated: string,
  is_admin: number,
  admin_level: number,
  is_member: number,
  is_advertiser: number,
  invited_by: number,
  type: string,
  photo_50: string,
  photo_100: string,
  photo_200: string,
}

type TProfile = {
  id: number,
  first_name: string,
  last_name: string,
  deactivated: string,
  is_closed: boolean,
  can_access_closed: boolean,
}

type TMember = {
  member_id: number,
  invited_by: number,
  join_date: number,
  is_admin: boolean,
  can_kick: boolean,
}

type TConversationMembersResponse = {
  count: number,
  items: TMember[],
  profiles: TProfile[],
  groups: TGroup[],
}
