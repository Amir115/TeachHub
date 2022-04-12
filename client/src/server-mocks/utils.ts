// TODO: fetch from server
import {LecturePreview} from "../types";

export const subscribedLecturesIds: string[] = JSON.parse(localStorage.getItem('lectures')) || [];