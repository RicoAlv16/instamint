import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { NftsInterface } from 'src/app/shared/interfaces/nfts.interface';
import { SearchNftService } from 'src/app/shared/services/search-nft.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { NotificationsInterface } from 'src/app/shared/interfaces/notifications.interface';

@Component({
    selector: 'app-search-nft',
    templateUrl: './search-nft.component.html',
    styleUrls: ['./search-nft.component.scss'],
})
export class SearchNftComponent implements OnInit {
    
    nftsTableFilted: NftsInterface[] = [];
    allNftsTable: NftsInterface[] = []
    searchWord = '';
    key = '';

    constructor(private _searchNftService: SearchNftService, private _minterNotifications: NotificationsService) {}

    ngOnInit(): void {
        this._searchNftService
            .getAllNfts()
            .subscribe((response: NftsInterface[]) => {
                this.allNftsTable = response;
                this.nftsTableFilted = response;
            });
    }

    changeTab(tab: string) {
        this.key = tab;
        this.filterNft();
    }

    filterNft() {
        if (this.key.trim() === '' || this.searchWord.trim() === '') {
            this.nftsTableFilted = this.allNftsTable;
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.nftsTableFilted = this.allNftsTable.filter((c:any) =>
                c[this.key].toLowerCase().includes(this.searchWord.toLowerCase())
            )
        }
    }

    filterNftByPriceRange(event: Event) {
        const selectedValue = (event.target as HTMLSelectElement).value;
        switch (selectedValue) {
            case 'Less than 500$':
                this.nftsTableFilted = this.allNftsTable.filter(item => item.price < 500);
                break;
            case '500$ - 1000$':
                this.nftsTableFilted = this.allNftsTable.filter(item => item.price >= 500 && item.price <= 1000);
        
                break;
            case '1000$ - 2000$':
                this.nftsTableFilted = this.allNftsTable.filter(item => item.price >= 1000 && item.price <= 2000);
                break;
            case '2000$ - 3000$':
                this.nftsTableFilted = this.allNftsTable.filter(item => item.price >= 2000 && item.price <= 3000);
                break;
            default:
                this.nftsTableFilted = this.allNftsTable;
                break;
        }
    }
}
