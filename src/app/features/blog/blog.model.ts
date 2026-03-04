export interface Blog {
  _id?: string;
  title: string;
  content: string;
  youtubeLink?: string;
  instagramLink?: string;
  createdAt?: Date;
   likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
}