import {UserModel} from './user.model';

export class CommentModel {
  constructor(
    public id: number,
    public content: string,

    public created_at: string,
    public updated_at: string,

    public user: UserModel
  ) {}
}
