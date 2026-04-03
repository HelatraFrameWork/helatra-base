// @ts-nocheck
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { DemoBaseComponent } from '../../spec/sample.component';
/**
 * App Module
 */
@Component({
    selector: 'app-container',
    template: `
    <input type="text" placeholder="Child1" (blur)='onChild1TextChange($event.target.value)' [value]='child1.text' />
    <input type="text" placeholder="Child2" (blur)='onChild2TextChange($event.target.value)' [value]='child2.text'/>
    <input type="text" placeholder="Child3" (blur)='onChild3TextChange($event.target.value)' [value]='child3.text'/>
    <br/>
    <br/>
    <hel-control [(text)]='cusText' [width]='width' (click)='onButtonClick($event)' >
        <h-childs>
            <h-child  [text]='child1.text' [header]='child1.header' ></h-child>
            <h-child  [text]='child2.text' [header]='child2.header' ></h-child>
            <h-child  [text]='child3.text' [header]='child3.header' ></h-child>
        </h-childs>
    </hel-control>
    <hel-list [dataSource]='data'>
               <ng-template #template let-data>
                    <div class='my-text'> {{ data.name }}</div>
               </ng-template>
               <ng-template #tooltipTemplate let-data>
                    <div class='my-text'> {{ data.name }}</div>
               </ng-template>
    </hel-list>
    <hel-button #buttonComp [text]='butText' (click)="onButClick()">Button</hel-button>
    <hr/>
    {{cusText}}
    `
})
export class AppComponent {
    public uName: string = '';
    public dest: string = '';
    public width: number = 100;
    public cusText: string = 'Click Add/Remove Header';
    public data: Object = [{ name: 'template1' }, { name: 'template2' }];
    public child1: ChildType = { text: 'Child1', header: true };
    public child2: ChildType = { text: 'Child2', header: true };
    public child3: ChildType = { text: 'Child3', header: true };
    public butText: string = 'Check';

    @Output()
    public event: any = new EventEmitter();

    @ViewChild('buttonComp')
    public buttonComp: DemoBaseComponent;

    public onButtonClick(): void {
        this.child1.header = !this.child3.header;
        this.child2.header = !this.child3.header;
        this.child3.header = !this.child3.header;
        //alert(this.cusText);
    }

    public onChild1TextChange(val: string): void {
        this.child1.text = val;
    }

    public onChild2TextChange(val: string): void {
        this.child2.text = val;
    }

    public onChild3TextChange(val: string): void {
        this.child3.text = val;
    }

    public onButClick(){
        this.buttonComp.value=new Date().toISOString();
    }

    ngAfterViewInit(){
        this.buttonComp.addEventListener('updated',function(){
            alert('Value Updated!!');
        })
    }


}

export interface ChildType {
    text: string;
    header: boolean;
}