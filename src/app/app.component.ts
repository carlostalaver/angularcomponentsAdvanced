import { Component, AfterContentInit, AfterViewInit, ViewChild, ElementRef, Renderer2, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {


  isAddTimerVisible: boolean = false;
  counterProgress: number = 0;
  totalCountdown: number = 15;
  public time: number = 0;
  timers: Array<number> = [];
  @ViewChild('timerInput') timeInput: ElementRef;
  @ViewChild('alert', {read: ViewContainerRef}) alertContainer: ViewContainerRef;
  simpleAlert: ComponentRef<SimpleAlertViewComponent> = null;

  constructor(private renderer: Renderer2, private resolver: ComponentFactoryResolver) {
    this.timers = [3, 20, 185];
  }

  updateProgress($event) {
    this.counterProgress = (this.totalCountdown - $event) / this.totalCountdown * 100;
  }

  countdownFinished() {
    console.log('Contador ha finalizado en app.component.ts')
  }

  logCountdownEnd() {
    console.log('%cCountdown finished', 'background-color: blue;');
  }

  showAddTimer($event) {
    this.isAddTimerVisible = true;
    setTimeout(() => {
      this.timeInput.nativeElement.focus();
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
    });
  }

  hideAddTimer() {
    this.isAddTimerVisible = false;

  }

  submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();
  }

  showEndTimerAlert() {
    // endTimerAlert.show()
    this.simpleAlert.instance.show();
    this.simpleAlert.instance.title="titulo Dinamico";
    this.simpleAlert.instance.message ="Mensaje Dinamico"
    this.simpleAlert.instance.onDismiss
      .subscribe( () => {
        this.simpleAlert.destroy()
      })
  }

  ngAfterContentInit(): void {
    const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
    this.simpleAlert = this.alertContainer.createComponent(alertFactory);
  }


  ngAfterViewInit(): void {

    console.log('%cele', 'background-color: aqua;', this.timeInput);
    this.renderer.setAttribute(this.timeInput.nativeElement, "placeholder", "Enter seconds");
    this.renderer.addClass(this.timeInput.nativeElement, "time-in");
    
  }


}
