import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactModel } from '@core/models/contact';
import { BackendService } from '@core/backend/backend.service';
import { ROUTES } from '@core/constants/routes';
import { StorageService } from '@core/storage/storage.service';

@Component({
  selector: 'app-contact-crud',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  public contactForm: FormGroup;
  public pageTitle = 'Editar contato';
  private contact: ContactModel;
  private _readOnlyMode = false;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private backend: BackendService,
    private router: Router,
    private storage: StorageService
  ) {
    this.contactForm = fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      company: [''],
      role: ['']
    });
  }

  public get readOnlyMode(): boolean {
    return this._readOnlyMode;
  }
  public set readOnlyMode(val: boolean) {
    this._readOnlyMode = val;
    if (val) {
      this.contactForm.disable();
      this.pageTitle = 'Visualizar contato';
    } else {
      this.contactForm.enable();
      this.pageTitle = 'Editar contato';
    }
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(data => {
      this.readOnlyMode = !!data && !!data.readOnly;
    });

    this.contact = this.activeRoute.snapshot.data.contacts;
    if (!this.contact) {
      return;
    }
    this.contactForm.get('name').setValue(this.contact.name);
    this.contactForm.get('phone').setValue(this.contact.phone);
    this.contactForm.get('email').setValue(this.contact.email);
    this.contactForm.get('company').setValue(this.contact.company);
    this.contactForm.get('role').setValue(this.contact.role);
  }

  public onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    this.storage.getUser().subscribe(user => {
      this.contact = this.contact || ({} as ContactModel);
      this.contact.name = this.contactForm.get('name').value;
      this.contact.phone = this.contactForm.get('phone').value;
      this.contact.email = this.contactForm.get('email').value;
      this.contact.company = this.contactForm.get('company').value;
      this.contact.role = this.contactForm.get('role').value;
      this.contact.userId = user._id;
      console.log('SAVING', this.contact);
      if (this.contact._id) {
        this.backend.updateContact(this.contact).subscribe();
      } else {
        this.backend.createContact(this.contact).subscribe(contact => {
          this.contact = contact;
          this.contactForm.reset();
          this.router.navigate([ROUTES.contacts]);
        });
      }
    });
  }

  public onEditClick() {
    this.readOnlyMode = false;
  }
}
