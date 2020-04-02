import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticleComponentComponent } from './new-article-component.component';

describe('NewArticleComponentComponent', () => {
  let component: NewArticleComponentComponent;
  let fixture: ComponentFixture<NewArticleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArticleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArticleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
