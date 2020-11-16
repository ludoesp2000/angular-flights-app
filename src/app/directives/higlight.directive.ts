import { Directive, ElementRef, HostListener, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appHiglight]'
})
export class HiglightDirective implements OnInit {

  // DIRETTIVA CUSTOMIZZATA (COME L'ngIf o l'ngFor) CHE PUò ESSERE USATA PER DARE COMPORTAMENTI GRAFICI COMUNI A TUTTI I TAG HTML CHE HANNO LA DIRETTIVA

  // DEFINIZIONE
  // Attribute directive also called custom directives are used when no additional template is needed. The directive can execute logic and apply visual changes to the element it is applied to. This is useful if you want to alter the behavior or style of existing HTML-elements, without wrapping them into a new component.

  // PUò AVERE DATI IN INPUT MA ANCHE IN OUTPUT
  // VEDI about.component.html => <div [ngSwitch]

  @Input() defaultColor = 'blue';
  @Input() hoverColor = 'blue';

  constructor(public ref: ElementRef, public r2: Renderer2) {
  }

  ngOnInit () {
    setTimeout(() => {
      this.setBgColor(this.defaultColor)
    }, 1000);
    setTimeout(() => {
      this.setBgColor('white')
    }, 2000);
  }

  setBgColor(color: String) {
    this.r2.setStyle(
      this.ref.nativeElement,
      'backgroundColor',
      color
    )
  }

  @HostListener('mouseenter')
  onMouseEnter () {
    // fai qualcosa, come ad esempio chiamare setBg color
    this.setBgColor(this.hoverColor)
  }
  @HostListener('mouseleave')
  onMouseLeave () {
    // fai qualcosa, come ad esempio chiamare setBg color
    this.setBgColor('white')
  }
}
