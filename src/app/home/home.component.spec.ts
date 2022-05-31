import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterService } from '../services/router.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let spy: any;
  let routerService: RouterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, AppModule]
    })
      .compileComponents();
      routerService = TestBed.inject(RouterService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not go to the game if no name ', () => {
    spy = spyOn(routerService, 'openGame');
    component.name.setValue("");
    component.onSubmit();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should go to the game if name is valid', () => {
    spy = spyOn(routerService, 'openGame');
    component.name.setValue("David");
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });
});
