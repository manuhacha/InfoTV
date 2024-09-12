import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-result-view',
  standalone: true,
  imports: [],
  templateUrl: './result-view.component.html',
  styleUrl: './result-view.component.css'
})
export class ResultViewComponent {

  filmData: any;

  constructor(private router: Router) {  }

  ngOnInit() {
    // Suscribirse al evento de navegación para obtener el estado
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
    ).subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.filmData = navigation.extras.state['filmData'];
        console.log(JSON.stringify(this.filmData))
      }
      else {
        console.log('No')
      }
    });
  }
}
