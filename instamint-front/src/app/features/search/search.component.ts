import { SearchNftComponent } from './search-nft/search-nft.component';
import { Component, ViewChild } from '@angular/core';
import { SearchMinterAndTeaBagComponent } from './search-minter-and-tea-bag/search-minter-and-tea-bag.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
   
    key = 'tabOne';

    @ViewChild('searchNftComponent', { static: false })
        searchNftComponent!: SearchNftComponent;
    @ViewChild('searchMinterAndTeaBagComponent', { static: false })
        searchMinterAndTeaBagComponent!: SearchMinterAndTeaBagComponent;

    changeTab(tab: string) {
        this.key = tab;
    }

}
