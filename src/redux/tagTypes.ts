export enum tagTypes {
  users = "users",
  auth = 'auth',
  posts = "posts",
  comments = "comments",
  profile = "profile",
  likes = "likes",
  dislikes = "dislikes",
  payments = 'payments'
}

export const tagTypeList = [tagTypes.users, tagTypes.auth, tagTypes.payments, tagTypes.likes, tagTypes.dislikes, tagTypes.comments, tagTypes.posts, tagTypes.profile];
