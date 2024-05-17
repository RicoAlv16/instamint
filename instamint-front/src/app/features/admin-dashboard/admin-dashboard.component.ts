import { Component } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  minterId: number | null = null;

  constructor(private adminService: AdminService) {}

  onMinterIdInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.minterId = inputElement.value
      ? parseInt(inputElement.value, 10)
      : null;
  }

  disableMinter(): void {
    if (this.minterId !== null) {
      this.adminService.disableMinter(this.minterId).subscribe({
        next: () => alert(`Minter account ${this.minterId} disabled`),
        error: error =>
          alert(
            `Failed to disable Minter account ${this.minterId}: ${error.message}`
          ),
      });
    } else {
      alert('Please enter a valid Minter ID.');
    }
  }

  deleteMinter(): void {
    if (this.minterId !== null) {
      this.adminService.deleteMinter(this.minterId).subscribe({
        next: () => alert(`Minter account ${this.minterId} deleted`),
        error: error =>
          alert(
            `Failed to delete Minter account ${this.minterId}: ${error.message}`
          ),
      });
    } else {
      alert('Please enter a valid Minter ID.');
    }
  }
}
