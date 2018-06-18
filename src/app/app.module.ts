import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostsService } from './posts/posts.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostCreateComponent,
    PostsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,//it releases all the input related components
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
