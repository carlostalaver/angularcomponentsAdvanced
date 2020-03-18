import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { log } from 'util';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  @Input() init: number = null;
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();
  counter: number = 0;
  private countdownTimerRef = null;

  constructor() { }

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeOut();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown()
    }, 1000);
  }

  private clearTimeOut() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  processCountdown() {
    this.onDecrease.emit(this.counter);
    console.log('%cEl contador es', 'background-color: aqua;', this.counter);

    if (this.counter === 0) {
      this.onComplete.emit();
      console.log('%c Finalizó el contador ', 'background-color: orange;');
    } else {
      this.doCountdown();
    }
  }

  ngOnDestroy(): void {
    this.clearTimeOut();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Init value update to: ', changes)
    this.startCountdown();
  }
}

