import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

const routes : Routes = [
    //Routes has this structure of path, component,useAsDefault 
        {path: '', component: PostsListComponent},
        {path: 'create', component: PostCreateComponent},
        {path: 'edit/:postId', component: PostCreateComponent}
];

@NgModule({
  //Using forRoot Method and passing our const routes to it makes angular aware of our routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  //Using exports we can use RouterModule outside -  will use this in app.module.ts in imports Array
})

export class AppRoutingModule{

}