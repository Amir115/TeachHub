export const subscribedLecturesIds: string[] = JSON.parse(localStorage.getItem('lectures')) || [];

export const myLectures: string[] = JSON.parse(localStorage.getItem('my-lectures')) || [];
export const fetchMyLectures = () => JSON.parse(localStorage.getItem('my-lectures')) || [];