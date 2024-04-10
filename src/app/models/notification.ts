export interface INotification{
    _id?: string
    userId?:string
    content?:NotificationData[]
}

export interface NotificationData{
    title: string,
    body: string,
    time: string,
    status:string
}