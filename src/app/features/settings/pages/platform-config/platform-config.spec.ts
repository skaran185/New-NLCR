import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformConfig } from './platform-config';

describe('PlatformConfig', () => {
  let component: PlatformConfig;
  let fixture: ComponentFixture<PlatformConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
