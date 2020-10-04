import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  template: `
    <div class="modal-header">
        <h5 class="modal-title text-center">User registered</h5>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default btn-link" (click)="onClick()">Ok</button>
    </div>
    `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal,
              private router: Router,
              ) {}

  onClick() {
    this.activeModal.close();
    this.router.navigate(['/home']);
  }
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  firstName: FormControl;
  lastName: FormControl;
  photo: File = null;

  constructor(private http: HttpClient,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.firstName = new FormControl();
    this.lastName = new FormControl();
    this.firstName.valueChanges.subscribe((value => console.log(value)));
    this.lastName.valueChanges.subscribe((value => console.log(value)));
  }

  onFileSelected(event) {
    this.photo = <File> event.target.files[0];
  }

  onRegistration() {
    const fd = new FormData();
    fd.append('first_name', this.firstName.value);
    fd.append('last_name', this.lastName.value);
    fd.append('photo', this.photo, this.photo.name);
    this.http.post('http://127.0.0.1:8000/api/facerec/registration/', fd)
      .subscribe(res => {
        console.log(res);
      });

    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'Registered';
  }

}
