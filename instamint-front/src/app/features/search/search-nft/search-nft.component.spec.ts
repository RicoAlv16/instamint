import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchNftComponent } from './search-nft.component';
import { SearchNftService } from 'src/app/shared/services/search-nft.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchNftComponent', () => {
    let component: SearchNftComponent;
    let fixture: ComponentFixture<SearchNftComponent>;
    let searchNftService: SearchNftService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SearchNftComponent],
            imports: [HttpClientTestingModule],
            providers: [SearchNftService],
        });
        fixture = TestBed.createComponent(SearchNftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        searchNftService = TestBed.inject(SearchNftService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve all Nfts', () => {
        searchNftService.getAllNfts().subscribe(nfts => {
            expect(nfts).withContext('No nfts returned').toBeTruthy();
            expect(nfts.length == 3).toBeTrue();

            const nft = nfts.find(n => n.price == 700);
            expect(nft?.username).toBe('paul');
        });
    });

});
