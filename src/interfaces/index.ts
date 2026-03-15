import { PostModalT, TOperation } from "../@types";

export interface UserCreatedI {
  name: string;
  email: string;
}

export interface CookiesProps<T> {
  key: string;
  value: T;
}

export interface CreatePostI extends PostModalT {
  picture?: PictureI;
}

export interface UpdatePostI {
  title?: string;
  content?: string;
  categoryId?: number;
  picture?: PictureI;
}

export interface UpdateProfileI {
  id: number;
  username: string;
  password?: string;
  email: string;
  cellPhone: string;
  bio: string;
  picture: {
    url: string;
    name: string;
  };
}

export interface ProfileI {
  id: number;
  userId: number;
  picture: PictureI;
}

export interface CreatePostI {
  title: string;
  content: string;
  picture?: PictureI;
  authorId: number;
  categoryId: number;
}

export interface CategoryI {
  name: string;
  id: number;
}

export interface PictureI {
  name: string;
  url: string;
}

export interface NewPasswordI extends Pick<UserCreatedI, "email"> {
  newPassword: string;
  verifyEmail: boolean;
}

export interface VerifyEmailI extends Pick<UserCreatedI, "email"> {
  code: string;
}

export interface ISendEmail {
  userEmail: string;
  validateCode?: string;
  subject: string;
  linkToReset?: string;
  operation: TOperation;
}

export interface ISaveVerificationCode {
  email: string;
  operation: TOperation;
}
export interface IValidateVerificationCode {
  email: string;
  code: string;
  operation: TOperation;
}

export interface CreateCommentI {
  content: string;
  postId: number;
  userId: number;
}

export interface UpdateCommentI {
  content: string;
}

export interface CreateReplyI {
  content: string;
  commentId: number;
  userId: number;
}

export interface UpdateReplyI {
  content: string;
}
