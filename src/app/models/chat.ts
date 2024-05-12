export interface IChat {
    _id: string
    lastMessage?: {
        message?: string
        time?:string
    }
    _doc: {
        participants: participantsData[]
    }
    createdAt?: string
}

export interface participantsData{
    _id:string
    image?: string,
    firstName?: string,
    lastName?:string
}