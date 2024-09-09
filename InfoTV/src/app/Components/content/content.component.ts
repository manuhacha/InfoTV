import { Component } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OMDBService } from '../../Services/omdb.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, NgIf],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})

export class ContentComponent {

filmname = ''
key = ''
data: any = null;
constructor(private service: OMDBService) {  }

ngOnInit() {
  const savedKey = localStorage.getItem('savedkey');
    if (savedKey) {
      this.key = savedKey; // Asigna el valor guardado en el almacenamiento local
    } else {
      this.getKey(); // Solicita la clave si no está guardada
    }
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
//Buscar películas
search() {
  console.log(this.key)
  this.service.search(this.key,this.filmname).subscribe({
    next: (res) => {
      console.log(res)
      //Rellenamos los datos
      this.data = {
        title: res.Title,
        year: res.Year,
        imdbRating: res.imdbRating,
        genre: res.Genre,
        plot: res.Plot,
        director: res.Director,
        awards: res.Awards,
        actors: res.Actors,
        img: res.Poster
      };
    },
    error: (err) => {

    }
  })
}
}

