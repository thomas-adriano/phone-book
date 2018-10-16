import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnInit
} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTES } from '@core/constants/routes';
import { ContactModel } from '@core/models/contact';
import { BackendService } from '@core/backend/backend.service';

interface ContactItem {
  id: string;
  firstLetter: string;
  name: string;
  thumb: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, AfterViewInit, OnDestroy {
  public contacts: ContactItem[] = [];
  public filteredContacts = [];
  public availableContactsFirstLetter = [];
  public scrollAreaElRef: ElementRef;
  private perfectScrollbar: PerfectScrollbar;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private backend: BackendService
  ) {}

  ngAfterViewInit() {
    if (this.scrollAreaElRef) {
      this.perfectScrollbar = new PerfectScrollbar(
        this.scrollAreaElRef.nativeElement
      );
    }
  }

  ngOnInit() {
    const contactsModels = this.activeRoute.snapshot.data
      .contacts as ContactModel[];
    this.contacts = contactsModels
      .map(e => {
        const firstLetter = e.name[0];
        if (!this.availableContactsFirstLetter.includes(firstLetter)) {
          this.availableContactsFirstLetter.push(firstLetter);
        }
        return {
          id: e._id,
          name: e.name,
          thumb: '/assets/stock-person.svg',
          firstLetter
        };
      })
      .sort();
    this.availableContactsFirstLetter = this.availableContactsFirstLetter.sort();
    this.filteredContacts = [...this.contacts];
  }

  ngOnDestroy() {
    if (this.perfectScrollbar) {
      this.perfectScrollbar.destroy();
    }
  }

  onNavSearchResult(res: any[]) {
    this.filteredContacts = res;
  }

  onContactClick(contact: ContactItem) {
    this.router.navigate([ROUTES.addContact], {
      queryParams: { contactId: contact.id, readOnly: true }
    });
  }

  onAddClick() {
    this.router.navigate([ROUTES.addContact]);
  }

  onContactDelete(evt: MouseEvent, contact: ContactItem) {
    evt.stopPropagation();
    this.backend.deleteContact(contact.id).subscribe(() => {
      this.contacts = this.contacts.filter(c => c.id !== contact.id);
      this.filteredContacts = [...this.contacts];
      this.availableContactsFirstLetter = this.availableContactsFirstLetter.filter(
        e => e !== contact.firstLetter
      );
    });
  }
}
