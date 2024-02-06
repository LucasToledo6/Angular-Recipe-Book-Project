import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular-Project-1';
  
  constructor(private authService: AuthService, private loggingService: LoggingService){}

  ngOnInit(){
    this.authService.autoLogin();
    this.loggingService.printLog('Hello OnInit AppComponent')
  }
}
