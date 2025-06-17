export interface Post {
  _id: string;
  userName: string;
  title: string;
  body: string;
  picture?: string;
  createdAt: Date;
  isEditable?: boolean;
  pinned?: boolean;
}
