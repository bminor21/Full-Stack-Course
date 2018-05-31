import { Component } from '@angular/core';
import { PostService } from './services/post.service';
import { Post } from './post';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]
})

export class AppComponent {
  title: string;
  body: string;
  posts: Post[];

  constructor( private _postSerivce:PostService){
    this._postSerivce.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  AddPost(){
    var newPost = {
      title: this.title,
      body: this.body
    }

    this._postSerivce.AddPost(newPost).subscribe(post => {
        this.posts.push(post);
    });
    return false;
  }

}
