export interface IChat {
    _id: string
    lastMessage?: {
        message?:string
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