import { Component, OnInit, ContentChild, AfterContentInit, OnDestroy, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { Tab } from "../tab/tab.interface";
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {
 
  public tabs:Tab[] = [];
  private tabClickSubscriptions: Subscription[] = [];

  @ContentChildren(TabComponent) tabsHijos:QueryList<TabComponent>;
  
  constructor() { }
  
  ngOnInit() {}
  
  addTab(tab:Tab){
    if (this.tabs.length === 0) {
      tab.isActive = true;
    }
    this.tabs.push(tab);
  }
  
  selectTab(tab:Tab) {
    this.tabsHijos.forEach( (tab) => {
      tab.isActive = false;
    });
    tab.isActive = true;
  }
  
  ngAfterContentInit(): void {
    this.tabsHijos.forEach( tab => {
      const subscription = tab.onClick.subscribe( () => {
        console.log(`%ctab ${tab.title}  content clicked`, 'background-color: pink ;', );
      });
      this.tabClickSubscriptions.push(subscription)
    });
    this.selectTab(this.tabsHijos.first)
  }

  ngOnDestroy(): void {
    if (this.tabClickSubscriptions.length > 0) {
      this.tabClickSubscriptions.every( (sub) => {
        sub.unsubscribe();
        return true;
      });
    }
  }
}
