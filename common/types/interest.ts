export interface Interest {
  _id: string;
  name: string;
  image: string;
}

export interface InterestViewModel extends Interest {
  level: number;
}