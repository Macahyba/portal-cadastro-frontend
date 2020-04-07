import { UserModel } from './user.model'

export class UserDetailsModel {
  constructor(
      public id?: number,
      public username?: string,
      public profile?: string,
      public user?: UserModel,
      // public password?: string
      ){
          this.id = id || null
          this.username = username || null
          this.profile = profile || null
          this.user = user || null
          // this.password = password || null
      }
}
