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
  password: string,
  company_Id?: string
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

