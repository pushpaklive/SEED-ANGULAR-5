import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostsService } from "../posts.service";
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-posts-list',
    templateUrl:'./posts-list.component.html',
    styleUrls:['./posts-list.component.css']
})

export class PostsListComponent implements OnInit, OnDestroy{
    /*posts = [
        {title:"Post A",content:"Post A\'s content"},
        {title:"Post B",content:"Post B\'s content"},
        {title:"Post C",content:"Post C\'s content"},
        {title:"Post D",content:"Post D\'s content"},
        {title:"Post E",content:"Post E\'s content"}
    ];*/

    posts:Post[]=[];//using *ngIf in html to render only if posts size > 0
    private postsSub: Subscription;
    constructor(public postsService : PostsService){}

    ngOnInit(){
         
        this.postsService.getPosts();

        //comment after introducing httpclient. Will call directly as above
        //this.posts = this.postsService.getPosts();
        this.postsSub = this.postsService.getPostupdatedAsObservable().subscribe((posts)=>{
            this.posts = posts;
        });
    }

    onDelete(postId: String){
        this.postsService.onDelete(postId);
    }
    
    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }    
}
