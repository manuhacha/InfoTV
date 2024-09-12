import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResultViewComponent } from './Components/result-view/result-view.component';
import { ContentComponent } from './Components/content/content.component';

export const routes: Routes = [
    { path: '', component: ContentComponent},
    { path: 'search', component: ResultViewComponent }
];
