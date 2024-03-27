import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from './search.component';
import { SearchNftService } from 'src/app/shared/services/search-nft.service';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let searchNftService: SearchNftService

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SearchComponent],
            imports: [HttpClientTestingModule],
            providers: [SearchNftService],
        });
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        searchNftService = TestBed.inject(SearchNftService)
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should retrieve all Nfts", () => {
        searchNftService.getAllNfts().subscribe((nfts) => {
            expect(nfts).withContext("No nfts returned").toBeTruthy();
            expect(nfts.length == 3).toBeTrue();
    
            const nft = nfts.find((n) => n.price == 700);
            expect(nft?.username).toBe("paul");
        });
    });
});
