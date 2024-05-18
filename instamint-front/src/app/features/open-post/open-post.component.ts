import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-open-post',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './open-post.component.html',
  styleUrls: ['./open-post.component.css']
})

export class OpenPostComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) { }
}