import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { Admin } from 'src/shared/Admin';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ds';

  isAdmin:boolean = false;
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log("app Component se charge..");
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


    const isAdminStored = localStorage.getItem('isAdmin');
    if (isAdminStored !== null) {
      this.isAdmin = isAdminStored === 'true';
    }
  }

  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.key === 'isAdmin') {
      this.isAdmin = event.newValue === 'true';
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      const admin: Admin = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };

      // Appeler la méthode isAdmin du service
      const isAdmin = this.loginService.isAdmin(admin).subscribe(
        (estAdmin) => {
          console.log(admin);
          if(estAdmin){
            // Enregistrer la valeur isAdmin dans le localStorage
            localStorage.setItem('isAdmin', estAdmin.toString());
            console.log("hello admin");
            window.alert(`Hello ${admin.username}!\nBienvenue dans le site web..`);
            //this.route.navigate(['/']);
          } else {
            console.log("Get out ..");
            window.alert(`Demande de connexion échoue !\nSi vous n'étes pas un administrateur du site, vous n'avez pas accés à la session admin..\nMerci de respecter les réglementations\n`);
            //this.route.navigate(['/']);
          }
          window.location.reload();
        }, (erreur) => {
          console.error("Erreur lors de la vérification de l'administrateur :", erreur);
        }
      );
    }
  }

  logout(): void {
    localStorage.removeItem('isAdmin');
    window.location.reload();
  }

}
