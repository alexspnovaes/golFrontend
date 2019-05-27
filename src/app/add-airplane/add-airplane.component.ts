import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AirplaneService} from '../Services/airplane.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-airplane',
  templateUrl: './add-airplane.component.html',
  styleUrls: ['./add-airplane.component.css']
})
export class AddAirplaneComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private airplaneService: AirplaneService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

  }

  onSubmit() {
    this.airplaneService.createAirplane(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-airplane']);
      });
  }

}
