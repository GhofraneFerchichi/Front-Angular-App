import {User} from './user';

export class CommentModel {
  constructor(
    public id: string,
    
    public content: string,
    public created_at: string,
    public user: User
    
  ) {}
}
