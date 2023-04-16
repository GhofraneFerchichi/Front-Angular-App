
    export class PostPayload {
        id:string;
        content:string;
        title:string;
        userName:string ='';
      
        constructor(id: string, title: string, content: string) {
          this.id = id;
          this.content = content;
          this.title = title;
        this.userName=this.userName;
         
        }
      }
      
