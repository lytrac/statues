import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { PATHS, RouterService } from './services/router.service';

describe('AppComponent', () => {

  let routerService: RouterService;
  let router: Router;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AppModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    routerService = TestBed.inject(RouterService);
    router = TestBed.inject(Router);
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Statues'`, (done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    routerService.openHome();
    fixture.detectChanges();
    setTimeout(() => {
      expect(app.title).toEqual('Statues');
      expect(app.home).toEqual(true);
      done();
    }, 0);
  }));

  it(`should have as title 'Hi David' in game`, (done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    routerService.openGame("David");
    setTimeout(() => {
      expect(app.title).toEqual('Hi David');
      done();
    }, 1000);
  }));
});
