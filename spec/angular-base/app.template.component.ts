// @ts-nocheck
import { Component, ViewChild } from '@angular/core';

/**
 * App Module
 */
@Component({
    selector: 'temp-component',
    template: `<hel-list #comp [dataSource]='data'>
               <ng-template #template let-data>
                    <div class='text-template'> {{ data.name }}</div>
               </ng-template>
               <ng-template #tooltipTemplate let-data>
                    <div class='text-template'> {{ data.name }}</div>
               </ng-template>
               <h-items>
                    <h-item [dataSource]='item1Data'>
                        <ng-template #template let-data>
                            <div class='item-template'> {{ data.name }}</div>
                        </ng-template>
                    </h-item>
                    <h-item text='Item2'>
                    <h-subitems>
                    <h-subitem [dataSource]='item1Data'>
                        <ng-template #template let-data>
                            <div class='subitem-template'> {{ data.name }}</div>
                        </ng-template>
                    </h-subitem>
                    </h-subitems>
                    </h-item>
                    <h-item text='Item3'>
                    </h-item>
               </h-items>
    </hel-list>
    <ng-template #commonTemplate let-data>
    <div class='text-template'> {{ data.name }}</div>
</ng-template>
     <hel-list id="ndList" [dataSource]='data'></hel-list>
    `
})
export class TemplateApp {
    public item1Data: Object = { text: 'name' };
    public data: Object = [{ name: 'template1' }, { name: 'template2' }];
    public tmpl: string = '<div>dataCheck</div>';
    @ViewChild('commonTemplate')
    public commonTemplate: any;

    @ViewChild('comp')
    public compInstance: any;
}
