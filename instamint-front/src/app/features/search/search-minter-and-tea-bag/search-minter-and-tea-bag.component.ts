import { Component, OnInit } from '@angular/core';
import { MinterInterface } from 'src/app/shared/interfaces/minter.interface';
import { TeaBagInterface } from 'src/app/shared/interfaces/tea-bag.interface';
import { SearchMinterService } from 'src/app/shared/services/search-minter.service';

@Component({
    selector: 'app-search-minter-and-tea-bag',
    templateUrl: './search-minter-and-tea-bag.component.html',
    styleUrls: ['./search-minter-and-tea-bag.component.scss']
})
export class SearchMinterAndTeaBagComponent implements OnInit{

    allMinterTeaBagTable: Array<MinterInterface | TeaBagInterface> = []
    minterTeaBagTableFilted: Array<MinterInterface | TeaBagInterface> = []
    searchWord = ""
    key = "tabOne"

    constructor ( private _searchMinterService: SearchMinterService) {}

    ngOnInit(): void {
        this._searchMinterService.getAllMinterAndTeaBag().subscribe(
            (response: Array<MinterInterface | TeaBagInterface>) => {
                this.allMinterTeaBagTable = response
                this.minterTeaBagTableFilted = response  
                console.log('le mix***', this.minterTeaBagTableFilted)         
            })
    }

    changeTab(tab: string) {
        this.key = tab
        this.filterMinterTeaBag()
    }

    filterMinterTeaBag() { 
        if (this.key.trim() === ""|| this.searchWord.trim() === '') {
            this.minterTeaBagTableFilted = this.allMinterTeaBagTable;
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.minterTeaBagTableFilted = this.allMinterTeaBagTable.filter((m:any) =>
                m[this.key].toLowerCase().includes(this.searchWord.toLowerCase())
            )
        }
    }
    
}
