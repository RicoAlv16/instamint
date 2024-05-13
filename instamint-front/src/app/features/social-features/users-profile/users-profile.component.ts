import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MinterInterface } from 'src/app/shared/interfaces/minter.interface';
import { TeaBagInterface } from 'src/app/shared/interfaces/tea-bag.interface';
import { MintersProfileService } from 'src/app/shared/services/minters-profile.service';

@Component({
    selector: 'app-users-profile',
    templateUrl: './users-profile.component.html',
    styleUrls: ['./users-profile.component.scss']
})

export class UsersProfileComponent implements OnInit{

    allMinters: MinterInterface[] = []
    teaBagByMinterId: TeaBagInterface[] = []
    idMinter = 0
    username: string | null = ""
    bio = ""
    link = ""
    teaBag = ""
    followers = 0
    followed = 0

    constructor ( private _mintersProfileService: MintersProfileService, private route: ActivatedRoute) {}

    async ngOnInit() {

        this.username = this.route.snapshot.paramMap.get('minterUsername')
        this.allMinters = await lastValueFrom(this._mintersProfileService.getAllMinters())
        this.showProfile()
        this.teaBagByMinterId = await lastValueFrom(this._mintersProfileService.getTeaBagByMinter(this.idMinter))
        this.showTeaBag()
    }

    showProfile() {
        const minter = this.allMinters.find(item => item.username == this.username)
        if (minter != undefined) {
            this.idMinter = minter.id
            this.bio = minter.profilBio
            this.link = minter.profilLink
            this.followers = minter.followers
            this.followed = minter.followered
        }
    }

    showTeaBag() {
        this.teaBagByMinterId.forEach(item => {
            this.teaBag = item.username
        });
    }
}
