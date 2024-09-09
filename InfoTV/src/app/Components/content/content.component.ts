import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})

export class ContentComponent {

url:string = '6d6e96f0'

ngOnInit() {
  console.log(this.url)
}

}

