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
deleteKey() {
  localStorage.removeItem('savedkey')
  location.reload()
}
}

