export interface IJobseekerRes {
    _id?: string,
    firstName?: string,
    lastName?: string,
    password?: string,
    email?: string,
    phoneNumber?: string,
    isBlocked?: boolean,
    gender?: string,
    role?: string,
    image?: string,
    resume?: string,
    location?: string
}

export interface IRes{
    success?: boolean,
    message?:string
}

export interface IJobseekerAuthResponse {
    status: number;
    data: {
      success: boolean;
      message: string;
      data: IJobseekerRes;
      userId?: string;
      token?: string; 
    };
  }
