import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { OMDBService } from '../../Services/omdb.service';

@Component({
  selector: 'app-result-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './result-view.component.html',
  styleUrl: './result-view.component.css'
})
export class ResultViewComponent {

  constructor(private service: OMDBService, private router: Router) {  }
  data:any = '' 
  ngOnInit() {
    this.data = this.service.getSearchedValue()
    if (!this.data.Title) {
      this.router.navigate(['/'])
    } 
  } 
}
