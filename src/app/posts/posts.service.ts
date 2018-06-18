import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        //When used type of posts as Post[] gave error in subscribing, changed to any
        //used pipe for _id purpose as mongoose uses _id and angular was using only id and not _id
        this.http.get<{ message: String, posts: any }>("http://localhost:3000/api/posts")
            .pipe(map((postDataUnFormatted) => {
                return postDataUnFormatted.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    };
                });
            }))    //After using pipe deleting postData.posts as new output from map is already post object
            .subscribe(postDataAfterFiltering => {
                this.posts = postDataAfterFiltering;
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

    onDelete(postId: String){
        this.http.delete("http://localhost:3000/api/posts/" + postId)
        .subscribe(() => {
            console.log("List Item deleted.")
        });

    }

}