import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenPostComponent } from '../open-post/open-post.component';
import { SettingsComponent } from '../profile-settings/profile-settings.component';

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
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userPosts: any[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userPosts = [
      { imageUrl: 'assets/images/NFTs/1.jpg'},
      { imageUrl: 'assets/images/NFTs/2.jpg'},
      { imageUrl: 'assets/images/NFTs/3.jpg'},
      { imageUrl: 'assets/images/NFTs/4.jpg'},
      { imageUrl: 'assets/images/NFTs/5.jpg'},
      { imageUrl: 'assets/images/NFTs/6.jpg'},
      { imageUrl: 'assets/images/NFTs/7.png'},
      { imageUrl: 'assets/images/NFTs/8.jpg'},
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