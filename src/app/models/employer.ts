export interface IEmployerRes {
  _id?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  location?: string,
  phoneNumber?: string,
  isBlocked?: boolean,
  isSubscribed?: boolean,
  planExpiresAt?: string,
  image?:string,
  password?: string,
  companyId?: {
    _id?:string,
    companyName?: string,
    website?: string,
    email?: string,
    companySize?: string,
    industry?: string,
    foundedYear?: number,
    description?: string,
  }
}

export interface IRes {
  success?: boolean,
  message?: string
}

export interface IEmployerAuthResponse {
  status: number;
  data: {
    success: boolean;
    message: string;
    data: IEmployerRes;
    userId?: string;
    token?: string;
  };
}

export interface IResponse{
  status: string,
  data: {
    success: boolean,
    message:string
  }
}

