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
  savedJobs?: SavedJob[];
  appliedJobs?: AppliedJob[];

}

export interface SavedJob {
  _id: string;
  jobId?: string;
  savedAt?: string;
}

export interface AppliedJob {
  _id: string;
  jobId?: string;
  appliedAt?: string;
}

export interface IRes {
  success?: boolean,
  message?: string
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

export interface IResponse {
  status: string,
  data: {
    success: boolean,
    message: string
  }
}
