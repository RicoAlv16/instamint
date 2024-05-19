import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotificationsComponent', () => {
    let component: NotificationsComponent;
    let fixture: ComponentFixture<NotificationsComponent>;
    let notificationsService: NotificationsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationsComponent],
            imports: [HttpClientTestingModule],
            providers: [NotificationsService],
      
        });
        fixture = TestBed.createComponent(NotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        notificationsService = TestBed.inject(NotificationsService);
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve all notifications by specify minter', () => {
        notificationsService.getNotificationsByMinter(1).subscribe(notifications => {
            expect(notifications).withContext('No notifications returned').toBeTruthy();
            expect(notifications.length == 3).toBeTrue();
        });
    });

});
