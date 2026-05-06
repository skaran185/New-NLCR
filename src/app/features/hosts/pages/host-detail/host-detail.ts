import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-host-detail',
  standalone: false,
  templateUrl: './host-detail.html',
  styleUrl: './host-detail.scss',
})
export class HostDetailComponent {
    hostId!: string;
 
  constructor(private route: ActivatedRoute) {}
 
  ngOnInit() {
    this.hostId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
