import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { StorageService } from '@core/storage/storage.service';
import { Router } from '@angular/router';
import { ROUTES } from '@core/constants/routes';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarTopComponent {
  @Input()
  public get searchOptions(): any[] {
    return this._searchOptions;
  }
  @Input()
  public searchField: string;
  @Output()
  public results = new EventEmitter<any>();
  public filteredOptions: any[] = [];
  public searchTerm = '';
  private _searchOptions: any[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private storage: StorageService,
    private router: Router
  ) {}

  public set searchOptions(opts: any[]) {
    this._searchOptions = opts;
    this.filteredOptions = opts;
  }

  public resetSearchTerm() {
    this.searchTerm = '';
    this.results.emit(this.searchOptions);
    this.changeDetector.markForCheck();
  }

  public onSearchChange(term: string) {
    this.filteredOptions = this._filter(term);
    this.results.emit(this.filteredOptions);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchOptions.filter(option => {
      const opt = option[this.searchField].toLowerCase().replace(' ', '');
      const searchTerm = filterValue.toLocaleLowerCase().replace(' ', '');
      return opt.indexOf(searchTerm) === 0;
    });
  }

  public onLogout() {
    this.storage.removeToken();
    this.router.navigate([ROUTES.login]);
  }
}
