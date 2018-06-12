import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.css']
})
export class PostCreateComponent {

    newPost = "";
    enteredValue = "";

    addPost() {
        this.newPost = this.enteredValue;
    }

    emptySavedText(){
        this.newPost="";
        this.enteredValue=""
    }
}