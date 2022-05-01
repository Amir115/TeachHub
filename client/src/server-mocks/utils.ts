export const getSubscribedLecturesIds = (): string[] =>  {
    const subscribedLecturesStr = localStorage.getItem('lectures');

    return subscribedLecturesStr ? JSON.parse(subscribedLecturesStr) : [];
}

export const getMyLecturesIds = (): string[] => {
    const myLecturesStr = localStorage.getItem('my-lectures');

    return myLecturesStr ? JSON.parse(myLecturesStr) : [];
}