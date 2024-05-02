export interface ISubscriptionRes{
    _id?: string,
    duration?: string,
    amount: number,
    planName?: string,
    status?:string
}

export interface IPlansDialogData {
    editMode: boolean;
    planId: string;
    plans: ISubscriptionRes[];
}
  
export interface IPlansAndCount {
    plans: ISubscriptionRes[],
    plansCount: number
}