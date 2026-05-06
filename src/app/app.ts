import { Component, signal } from '@angular/core';
import { LoadingService } from './core/services/loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})


export class App {
  protected readonly title = signal('nexo-admin');
  loading$;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
