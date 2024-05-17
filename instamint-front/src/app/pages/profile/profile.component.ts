import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenPostComponent } from '../../tools/open-post/open-post.component';
import { SettingsComponent } from '../../tools/settings/settings.component';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  userPosts: any[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userPosts = [
      { imageUrl: 'assets/images/1.jpg', /* autres détails */ },
      { imageUrl: 'assets/images/2.jpg', /* autres détails */ },
      { imageUrl: 'assets/images/3.jpg', /* autres détails */ },
      { imageUrl: 'assets/images/4.jpg', /* autres détails */ },
      { imageUrl: 'assets/images/5.jpg', /* autres détails */ },
      { imageUrl: 'assets/images/6.jpg', /* autres détails */ },
      { imageUrl: 'assets/images/7.png', /* autres détails */ },
      { imageUrl: 'assets/images/8.jpg', /* autres détails */ },
    ];
  }

  openPostClick(imageUrl: string) {
    this.dialog.open(OpenPostComponent, {
      data: { imageUrl: imageUrl }
    });
  }

  openSettingsClick() {
    this.dialog.open(SettingsComponent);
  }
}