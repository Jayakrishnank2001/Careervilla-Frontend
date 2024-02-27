export interface IEmployerRes {
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    location?: string,
    phoneNumber?: string,
    isBlocked?: boolean,
    password: string,
    company_Id?: string
}

export interface IRes{
    success?: boolean,
    message?:string
}

