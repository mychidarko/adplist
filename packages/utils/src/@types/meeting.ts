export interface Meeting {
  createdAt: string;
  id: string;
  liveStreamOnStart: boolean;
  participants: any[];
  recordOnStart: boolean;
  roomName: string;
  status: 'LIVE' | 'CREATED';
  title: string;
}

export type RoomStatus = 'LOADING' | 'SETTING-UP' | 'ACTIVE' | 'ERROR';
