import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme = 'default';

  ngOnInit() {
    this.onThemeSwitchChange();
  }

  onThemeSwitchChange() {
    document.body.setAttribute('data-theme', this.theme);
  }
}
