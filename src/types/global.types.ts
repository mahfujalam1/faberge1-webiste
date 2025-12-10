export interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}

export type BannerData = {
    _id: string,
    title: string,
    image: string,
    video: string
}