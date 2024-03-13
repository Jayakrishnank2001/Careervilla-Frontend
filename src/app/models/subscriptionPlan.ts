export interface ISubscriptionRes{
    _id?: string,
    duration?: string,
    amount?: number,
    planName?: string,
    status?:string
}

export interface IDialogData {
    editMode: boolean;
    planId: string;
    plans: ISubscriptionRes[];
  }