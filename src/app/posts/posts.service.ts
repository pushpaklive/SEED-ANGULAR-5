import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {

        this.http.get<{ message: String, posts: Post[] }>("http://localhost:3000/api/posts")
            .subscribe((postData) => {
                this.posts = postData.posts;
                //to inform all other components or to save last entry
                this.postsUpdated.next(this.posts);
            });

        //will return this posts using httpclient, so commenting for now
        //return this.posts;//remove brackets to run
    }

    getPostupdatedAsObservable() {
        //forgot to use return here. so no subscribe() was available 
        return this.postsUpdated.asObservable();
    }

    addPost(title: String, content: String) {
        const post: Post = {
            id: null,
            title: title,
            content: content
        };
        this.http.post<{ message: String }>("http://localhost:3000/api/posts", post)
            .subscribe(responseData => {
                this.posts.push(post);
                this.postsUpdated.next(this.posts);
                //when i used post variable above in place of response, it give error in 
                //pushing to posts as response is not of type Post[] but it is of type {message:String}
                //post is used as req.body in app.js and only message is returned in res which we get here
                console.log(responseData.message);
            });

    }
}