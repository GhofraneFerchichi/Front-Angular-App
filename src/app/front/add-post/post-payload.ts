
    export class PostPayload {
        [x: string]: any;
        id:number;
        content:string;
        title:string;
        userName!: string;
        image!:string;
      
        constructor(id: number, title: string, content: string) {
          this.id = id;
          this.content = content;
          this.title = title;
          this.image=this.image;
         
        }
      }
      
