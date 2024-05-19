import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMinterAndTeaBagComponent } from './search-minter-and-tea-bag.component';
import { SearchMinterService } from 'src/app/shared/services/search-minter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchMinterAndTeaBagComponent', () => {
    let component: SearchMinterAndTeaBagComponent;
    let fixture: ComponentFixture<SearchMinterAndTeaBagComponent>;
    let searchMinterService: SearchMinterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SearchMinterAndTeaBagComponent],
            imports: [HttpClientTestingModule],
            providers: [SearchMinterService],
        });
        fixture = TestBed.createComponent(SearchMinterAndTeaBagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        searchMinterService = TestBed.inject(SearchMinterService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve all Minters and tea bag', () => {
        searchMinterService.getAllMinterAndTeaBag().subscribe(minterTeaBag => {
            expect(minterTeaBag).withContext('No minterTeaBag returned').toBeTruthy();
            expect(minterTeaBag.length == 7).toBeTrue();

            const minterOrTeaBag = minterTeaBag.find(m => m.followers == 0);
            expect(minterOrTeaBag?.username).toBe('mia');
        });
    });

});
