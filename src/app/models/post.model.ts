import { CommentModel } from "./comment.model";
import { User } from "./user";


export class PostModel {
   id: any;
  title: any;
  content: any;

  constructor(){}
 /* constructor(
    public id: number,
    public title: string,
    public content: string,
    public image?: string,


    public user?: User,
    public comments?: CommentModel[],

  public created_at?: string,
  public updated_at?: string,
  ) {}*/
}
