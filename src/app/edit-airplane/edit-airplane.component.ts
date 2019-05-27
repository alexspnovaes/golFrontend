import { Component, OnInit } from '@angular/core';
import { AirplaneService } from './../Services/airplane.service';
import {Router} from '@angular/router';
import {Airplane} from '../Models/airplane.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-airplane',
  templateUrl: './edit-airplane.component.html',
  styleUrls: ['./edit-airplane.component.css']
})
export class EditAirplaneComponent implements OnInit {

  airplane: Airplane;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private airplaneService: AirplaneService) { }

  ngOnInit() {
    const airplaneId = localStorage.getItem('editAirplaneId');
    if (!airplaneId) {
      alert('Invalid action.');
      this.router.navigate(['list-airplane']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      codigoAviao: ['', Validators.required],
      modelo: ['', Validators.required],
      qtdePassageiros: ['', Validators.required]
    });
    this.airplaneService.getAirplaneById(+airplaneId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.airplaneService.updateAirplane(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-airplane']);
        },
        error => {
          alert(error);
        });
  }
}
