import {User} from './user';
import {CommentModel} from './comment.model';

export class PostModel {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public image?: string,


    public user?: User,
    public comments?: CommentModel[],

  public created_at?: string,
  public updated_at?: string,
  ) {}
}
