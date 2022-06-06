export interface Interest {
  _id: string;
  name: string;
  image: string;
}

export interface UserKnowledge extends Interest {
  rating: number;
}