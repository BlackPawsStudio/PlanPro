export interface INote {
  done: boolean;
  text: string;
  reminder: IReminder;
  id: number;
}

export type IReminder = {
    hours: number;
    minutes: number;
  } | false;