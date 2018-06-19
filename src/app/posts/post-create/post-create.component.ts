import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
    
    private mode = "create";
    private postId: String;
    private post: Post;

    constructor(public postsService : PostsService, public route: ActivatedRoute){}


    ngOnInit(){
        //postId we will set in routes as same component will be used for editing also i.e PostCreateComponent   
         this.route.paramMap.subscribe((paramMap : ParamMap) => {
             if(paramMap.has('postId')){
                 this.mode="edit";
                 this.postId = paramMap.get('postId');   
                 this.post = this.postsService.getPost(this.postId);
             }
             else{
                 this.mode="create";//like when reloads or so
                 this.postId=null;
             }
         })
    }

    addPost(form: NgForm) {
        if(form.invalid)
        return;

        this.postsService.addPost(form.value.title,form.value.content);    
        
        form.resetForm();
        //CLearing form once data is displayed in list component
        /*const post : Post = {
            title : form.value.title,
            content : form.value.content
        };*/
    }
}