import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserModel} from '../../models/user-model';

@Component({
  selector: 'app-modal-content',
  template: `
    <div class="modal-header">
        <h5 class="modal-title text-center">User (s)</h5>
    </div>
    <div class="modal-body">
      <div *ngFor="let user of userModel">
        <h5 class="text-center" >
          {{user?.first_name}}, {{user?.last_name}}
        </h5><br>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default btn-link" (click)="onClick()">Ok</button>
    </div>
    `
})
export class NgbdModalIdentificationContent {
  @Input()
  public userModel: Array<UserModel> = [];

  constructor(public activeModal: NgbActiveModal,
              private router: Router,
  ) {}

  onClick() {
    this.activeModal.close();
    this.router.navigate(['/home']);
  }
}

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {
  photo: File = null;
  public userModel: Array<UserModel> = [];

  constructor(private http: HttpClient,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.photo = <File> event.target.files[0];
  }

  onIdentification() {
    const fd = new FormData();
    fd.append('photo', this.photo, this.photo.name);
    this.http.post<UserModel[]>('http://127.0.0.1:8000/api/facerec/identification/', fd)
      .pipe()
      .subscribe(result => {
        this.userModel = result;

        const modalRef = this.modalService.open(NgbdModalIdentificationContent);
        modalRef.componentInstance.userModel = this.userModel;
      });
  }

}
