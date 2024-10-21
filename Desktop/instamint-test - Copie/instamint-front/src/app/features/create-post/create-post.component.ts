import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  selectedImageFile!: File;
  termsAccepted: boolean = false;
  message: string = '';
  constructor(private http: HttpClient, private dialog: MatDialog) { }    

  ngOnInit(): void {
  }

  onPhotoSelected(photoSelector: HTMLInputElement) {
    const errorMessageElement = document.getElementById('error-message');

    if (!photoSelector.files || photoSelector.files.length === 0) {
      if (errorMessageElement) {
        errorMessageElement.innerText = '';
      }
      return;
    }

    const file = photoSelector.files[0];

    const maxSize = 1024 * 1024 * 1024;
    if (file.size <= 0 || file.size > maxSize) {
      if (errorMessageElement) {
        errorMessageElement.innerText = 'File size must be between 0 and 1 GB.';
      }
      return;
    }

    const allowedTypes = ['.png', '.webp', '.ogg', '.flac', '.mp4'];
    const fileType = '.' + file.name.split('.').pop();
    if (!allowedTypes.includes(fileType)) {
      if (errorMessageElement) {
        errorMessageElement.innerText = 'Unsupported file type.';
      }
      return;
    }

    if (errorMessageElement) {
      errorMessageElement.innerText = '';
    }

    this.selectedImageFile = file;

    let fileReader = new FileReader();

    fileReader.onloadend = (ev) => {
      if (fileReader.result) {
        let readableString = fileReader.result.toString();
        let postPreviewImage = document.getElementById('post-preview-image') as HTMLImageElement;
        postPreviewImage.src = readableString;
      }
    };

    fileReader.readAsDataURL(this.selectedImageFile);
  }

  onTermsAcceptedChange() {
    this.termsAccepted = !this.termsAccepted;
  }

  isPostButtonDisabled() {
    return !this.termsAccepted;
  }

  onPost() {
    const formData = new FormData();
    formData.append('file', this.selectedImageFile);
    formData.append('message', this.message);

    this.http.post('http://localhost:3000/posts/upload', formData)
      .subscribe(response => {
        this.dialog.closeAll();
        alert('Posted');
      });
  }
}
