import { Component, OnInit } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';

import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone:true,
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css',
  imports: [
    MatIconModule,
  ],
})
export class PostFeedComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addPostClick() {
    this.dialog.open(CreatePostComponent);
  }
}
