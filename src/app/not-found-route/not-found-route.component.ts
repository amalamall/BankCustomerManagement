import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found-route',
  templateUrl: './not-found-route.component.html',
  styleUrls: ['./not-found-route.component.css']
})
export class NotFoundRouteComponent {
  constructor(private sanitizer: DomSanitizer) {}

  svgPath = 'assets/images/not-found.svg';
  sanitizedSvgPath = this.sanitizer.bypassSecurityTrustUrl(this.svgPath);
}