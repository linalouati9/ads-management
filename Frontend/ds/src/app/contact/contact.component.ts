import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ReclamationService } from '../services/reclamation.service';
import { Reclamation } from 'src/shared/Reclamations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  
  reclamationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire
    this.reclamationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  sendReclamation(){
    if(this.reclamationForm.valid){
      this.reclamationService.sendReclamation(this.reclamationForm.value).subscribe(
        (reclamation) => {
          console.log(reclamation);
          this.reclamationForm.reset();
        },
        (erreurs) => {console.log(erreurs);}
      );
    }
  }
}
