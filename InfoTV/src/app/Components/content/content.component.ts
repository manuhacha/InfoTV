import { Component } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OMDBService } from '../../Services/omdb.service';
import { NgFor, NgIf } from '@angular/common';
import { debounceTime, filter, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})

export class ContentComponent {

key = ''
searchControl = new FormControl('');
searchedvalue = {
  Title: '',
  Year: '',
  Genre: '',
  Poster: '',
  Director: '',
  imdbRating: '',
  Plot: '',
  Actors: '',
  Awards: ''
}

constructor(private service: OMDBService, private router: Router) {  }

ngOnInit() {
  const savedKey = localStorage.getItem('savedkey');
    if (savedKey) {
      this.key = savedKey; // Asigna el valor guardado en el almacenamiento local
    } else {
      this.getKey(); // Solicita la clave si no está guardada
    }
    
  //Buscar películas a tiempo real
  this.searchControl.valueChanges
  .pipe(
    debounceTime(600), // Espera 600ms después de que el usuario deje de escribir
    filter((filmname: string | null): filmname is string => !!filmname && filmname.trim() !== ''), // Filtra valores nulos o vacíos
    switchMap((filmname: string) => this.service.search(this.key, filmname))
  )
  //Guardamos los resultados en la variable 
  .subscribe((data) => {
    this.searchedvalue.Title = data.Title
    this.searchedvalue.Year = data.Year
    this.searchedvalue.Genre = data.Genre
    this.searchedvalue.Poster = data.Poster
    this.searchedvalue.Actors = data.Actors
    this.searchedvalue.Awards = data.Awards
    this.searchedvalue.Director = data.Director
    this.searchedvalue.imdbRating = data.imdbRating
    this.searchedvalue.Plot = data.Plot
  });

}
async getKey() {
  //Modal para introducir la key
  const { value: key } = await Swal.fire({
    title: 'Enter your OMDb API Key.',
    input: 'text',
    inputPlaceholder: 'Enter your key',
    confirmButtonColor: "#1F2937"
  });

  if (key != null) {
    //Si no es null se guarda en localStorage
    localStorage.setItem('savedkey',key)
    this.key = key
  }
}
//Borrar la key si es necesario
deleteKey() {
  localStorage.removeItem('savedkey')
  location.reload()
}
//Método para enviar los datos de los resultados al componente search
sendData() {
  this.router.navigate(['/search'], { state: { filmData: this.searchedvalue } })
}
}

