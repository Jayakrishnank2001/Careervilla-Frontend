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
  jobPreferences?: JobPreferences
  qualifications?:Qualifications
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

export interface JobPreferences {
  jobTitles?: [string]
  jobTypes?: [string]
  minimumSalary?: string
}

export interface Qualifications {
  recentExperience?: string
  highestEducation?: string
  skills?: [string]
  languages?: [string]
}

export interface skills{
  name:string
}

export interface languages{
  name:string
}

export interface jobTitles{
  name:string
}


