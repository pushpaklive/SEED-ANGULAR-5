import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    constructor(public postsService : PostsService){}

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