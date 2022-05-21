export interface Interest {
  id: string;
  name: string;
  image: string;
}

export interface InterestViewModel extends Interest {
  level: number;
}