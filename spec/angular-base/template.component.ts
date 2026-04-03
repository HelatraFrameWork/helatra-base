// @ts-nocheck
import {
    Component, ElementRef, ContentChildren,
    ViewContainerRef, Directive, ChangeDetectorRef,
    ChangeDetectionStrategy, ContentChild, Inject
} from '@angular/core';
import { ComponentBase, IComponentBase } from '../src/component-base';
import { ComplexBase, ArrayBase } from '../src/complex-array-base'
import { applyMixins, ComponentMixins } from '../src/util';
import { setValue } from '@helatra/base';
import { TemplateBase } from './template.core';
import { Template } from '../src/template';

/**
 * Complex Component
 */
@Directive({
    selector: 'h-subitems>h-subitem',
    inputs: ['dataSource', 'text']
})
export class SubListItem extends ComplexBase<SubListItems> {

    @ContentChild('template')
    @Template()
    public template: any;

    constructor( @Inject(ViewContainerRef) private viewContainerRef: ViewContainerRef, ) {
        super();
        setValue('currentInstance', this, this.viewContainerRef);
    }
}

@Directive({
    selector: 'h-item>h-subitems',
    queries: {
        children: new ContentChildren(SubListItem)
    },
})
export class SubListItems extends ArrayBase<SubListItem> {
    constructor() {
        super('subItems');
    }
}



/**
 * Complex Component
 */
@Directive({
    selector: 'h-items>h-item',
    inputs: ['dataSource', 'text'],
    queries: {
        childSubChilds: new ContentChild(SubListItems)
    },

})
export class ListItem extends ComplexBase<ListItems> {

    @ContentChild('template')
    @Template()
    public template: any;

    public tags: string[] = ['subChilds'];

    public complexTemplate: string[] = [];

    constructor( @Inject(ViewContainerRef) private viewContainerRef: ViewContainerRef, ) {
        super();
        setValue('currentInstance', this, this.viewContainerRef);
    }
}

@Directive({
    selector: 'hel-list>h-items',
    queries: {
        children: new ContentChildren(ListItem)
    },
})
export class ListItems extends ArrayBase<ListItem> {
    constructor() {
        super('items');
    }
}


/**
 * Template Component
 */
@Component({
    selector: 'hel-list',
    inputs: ['dataSource','template'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    outputs: [],
    template: '',
    queries: {
        childItems: new ContentChild(ListItems),
    }
})
@ComponentMixins([ComponentBase])
export class TemplateComponent extends TemplateBase implements IComponentBase {

    @ContentChild('template')
    @Template('<span>Checking</span>')
    public template: any;

    @ContentChild('tooltipTemplate')
    @Template('<span>Tooltip</span>')
    public tooltip_template: any;

    public tags: string[] = ['items'];
    constructor(
        @Inject(ElementRef) private ngEle: ElementRef,
        @Inject(ViewContainerRef) private viewContainerRef: ViewContainerRef,
        @Inject(ChangeDetectorRef) ref: ChangeDetectorRef) {
        super();
        setValue('currentInstance', this, this.viewContainerRef);
        this.element = this.ngEle.nativeElement;
        this.registerEvents([]);
        this.addTwoWay.call(this, []);
    }

    public registerEvents: (eventList: string[]) => void;
    public addTwoWay: (propList: string[]) => void;
}


