import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/heros.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit{
  constructor(
    private heroService : HeroesService, 
    private activateRout : ActivatedRoute,
    private router : Router,
    private snackBar : MatSnackBar,
    private matDialog : MatDialog
    ){}

  ngOnInit(): void {
    //Si no esta en la ruta edit salte
    if(!this.router.url.includes('edit') )return;
    //si si la tenia continua
    //Parametros de la ruta activa edit/:id
    this.activateRout.params
    .pipe(
      switchMap(({id})=>this.heroService.getHerosByid(id)),
    )
    .subscribe(respuesta=>{
      if(!respuesta)
      {
        return this.router.navigateByUrl('/');
      }
      this.heroForm.reset(respuesta)
      return;
    })
  }

  public heroForm = new FormGroup(
    {
      id:               new FormControl(''),
      superhero:        new FormControl('',{nonNullable : true}),
      publisher:        new FormControl<Publisher>(Publisher.DCComics),
      alter_ego:        new FormControl(''),
      first_appearance: new FormControl(''),
      characters:       new FormControl(''),
      alt_image:        new FormControl(''),
    }
  );

  public publishers = [
    {id:'DC Comics', desc: 'DC - Comics'},
    {id:'Marvel Comics', desc: 'Marvel - Comics'},
  ]

  get CurrentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  public onSubmit(){
    if(this.heroForm.invalid) return; 
     
    //Si el id ya existe actualiza
    if(this.CurrentHero.id){
      this.heroService.updateHero(this.CurrentHero)
      .subscribe(res => {this.showSnackBar(`${res.superhero} updated!!`)})
      return;
    }
    //Si id no existe crea
    this.heroService.updateHero(this.CurrentHero)
    .subscribe(res => {
      this.router.navigate(['/heroes/edit',res.id])
      this.showSnackBar(`${res.superhero} created!!`)}
      )
  }

  public onDeletHero(){
    if(!this.CurrentHero.id) throw Error('Hero is required')
    
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });
    dialogRef.afterClosed()
    .pipe(
      filter((res : boolean) => res === true),
      switchMap(()=>this.heroService.deletedHero(this.CurrentHero.id)),
    )
    .subscribe(res =>{
      this.router.navigate(['heroes/'])
    })
    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result) return;
    //   this.heroService.deletedHero(this.CurrentHero.id)
    //   .subscribe(res => {if(res){this.router.navigate(['heroes/'])}})
    // });  
  }

  public showSnackBar(message : string){
    this.snackBar.open(message,'done',{
      duration:2500,
    })
  }
}
