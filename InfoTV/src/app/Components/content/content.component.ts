import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})

export class ContentComponent {

url:string = '6d6e96f0'
key = ''


ngOnInit() {
  if (localStorage.getItem('savedkey')) {
    
  }
  else {
    this.getKey()
  }
  
}
async getKey() {
  const { value: key } = await Swal.fire({
    title: 'Enter your OMDb API Key.',
    input: 'text',
    inputPlaceholder: 'Enter your key',
    confirmButtonColor: "#1F2937"
  });

  if (key) {
    this.key = key
    localStorage.setItem('savedkey',this.key)
  }
}
}

