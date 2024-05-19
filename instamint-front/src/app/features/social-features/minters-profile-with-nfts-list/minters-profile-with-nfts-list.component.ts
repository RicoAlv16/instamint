import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MintersProfileService } from 'src/app/shared/services/minters-profile.service';
import { NftsInterface } from 'src/app/shared/interfaces/nfts.interface';
import { MintersProfileWithNftsListService } from 'src/app/shared/services/minters-profile-with-nfts-list.service';

@Component({
    selector: 'app-minters-profile-with-nfts-list',
    templateUrl: './minters-profile-with-nfts-list.component.html',
    styleUrls: ['./minters-profile-with-nfts-list.component.scss']
})
export class MintersProfileWithNftsListComponent implements OnInit{

    nftFound: NftsInterface[] = []

    constructor(
        private route: ActivatedRoute, 
        private _minterPtofileService: MintersProfileService,
        private _mintersProfileWithNftsListService: MintersProfileWithNftsListService
    ) {}

    ngOnInit(): void { this.showMinterNftsList() }

    async showMinterNftsList() {
        const username = this.route.snapshot.paramMap.get('username')

        const allMinters = await lastValueFrom(this._minterPtofileService.getAllMinters())
        const allTeaBags = await lastValueFrom(this._minterPtofileService.getAllTeaBags())

        const minterFound = allMinters.find(m => m.username == username)
        const teaBagFound = allTeaBags.find(t => t.username == username)

        if (minterFound != undefined) {
            this.nftFound = await lastValueFrom(this._mintersProfileWithNftsListService.getNftsByMinter(minterFound.id))
        }
        if (teaBagFound != undefined) {
            this.nftFound = await lastValueFrom(this._mintersProfileWithNftsListService.getNftsByTeaBag(teaBagFound.id))
        }
    }
}
