// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ComponentBase } from '../src/component-base';
import { ControlComponents } from './control.component';
import { AppComponent } from './app.module';
import { pipeComponents } from './pipe.component';
import { check } from './app.pipe';

/**
 * Complex Spec
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('=> Complex Component => ', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let directives: any[] = ControlComponents;
    directives.push(AppComponent);
    beforeEach((done) => {
        TestBed.configureTestingModule({
            declarations: directives,
            providers: [ComponentBase]
        });
        /* tslint:disable */
        TestBed.overrideComponent(AppComponent, {
            set: {
                template: `<hel-control>
                <h-childs>
                <h-child  [text]='child1.text' [header]='child1.header' ></h-child>
                <h-child  [text]='child2.text' [header]='child2.header' ></h-child>
                <h-child  [text]='child3.text' [header]='child3.header' ></h-child>
                </h-childs>
                </hel-control>`
            }
        });
        /* tslint:enable */

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            el = de.nativeElement;
            fixture.detectChanges();
            setTimeout(() => { done(); }, 100);
        });
    });

    it('complex data processing', () => {
        let instance: any = (el.querySelector('.h-control') as any).hel_instances[0];
        expect(JSON.stringify(instance.childs[0].properties)).toEqual('{"header":true,"text":"Child1","subChilds":[]}');
        expect(JSON.stringify(instance.childs[1].properties)).toEqual('{"header":false,"text":"Child2","subChilds":[]}');

    });

    it('complex data binding', (done: Function) => {
        comp.child2 = { text: 'ChangedChild', header: true };
        fixture.detectChanges();
        setTimeout(() => {
            let instance: any = (el.querySelector('.h-control') as any).hel_instances[0];
            expect(JSON.stringify(instance.childs[0].properties)).toEqual('{"header":true,"text":"Child1","subChilds":[]}');
            expect(JSON.stringify(instance.childs[1].properties)).toEqual('{"header":true,"text":"ChangedChild","subChilds":[]}');
            done();
        }, 100);
    });

    afterAll(() => {
        el.remove();
    });

});

describe('=> Complex Component for pipe => ', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let directives: any[] = pipeComponents;
    directives.push(AppComponent);
    beforeEach((done) => {
        TestBed.configureTestingModule({
            declarations: [directives, check],
            providers: [ComponentBase]
        });
        /* tslint:disable */
        TestBed.overrideComponent(AppComponent, {
            set: {
                template: `<hel-control>
                <h-childs>
                <h-child  [text]='child1.text' header='{{ child1.header | check }}' ></h-child>
                <h-child  [text]='child2.text' [header]='child2.header' ></h-child>
                <h-child  [text]='child3.text' [header]='child3.header' ></h-child>
                </h-childs>
                </hel-control>`
            }
        });
        /* tslint:enable */

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            el = de.nativeElement;
            fixture.detectChanges();
            setTimeout(() => { done(); }, 100);
        });
    });

    it('complex data binding with pipe', (done: Function) => {
        fixture.detectChanges();
        setTimeout(() => {
            let instance: any = (el.querySelector('.h-control') as any).hel_instances[0];
            expect(JSON.stringify(instance.childs[0].properties.header)).toEqual('"false"');
            done();
        }, 100);
    });

    afterAll(() => {
        el.remove();
    });

});


describe('=> Complex Component => ', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let directives: any[] = ControlComponents;
    directives.push(AppComponent);
    beforeEach((done) => {
        TestBed.configureTestingModule({
            declarations: directives,
            providers: [ComponentBase]
        });
        /* tslint:disable */
        TestBed.overrideComponent(AppComponent, {
            set: {
                template: `<hel-control>
                <h-childs>
                <h-child  [text]='child1.text' [header]=true >
                    <h-sub-childs>
                        <h-sub-child text='SubChild1' [header]=true ></h-sub-child>
                        <h-sub-child text='SubChild2' [header]=true ></h-sub-child>
                        <h-sub-child text='SubChild3' [header]=true ></h-sub-child>
                    </h-sub-childs>
                    
                </h-child>
                <h-child  [text]='child2.text' [header]=false ></h-child>
                <h-child  [text]='child3.text' [header]=true ></h-child>
                </h-childs>
                </hel-control>`
            }
        });
        /* tslint:enable */

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            el = de.nativeElement;
            fixture.detectChanges();
            setTimeout(() => { done(); }, 1000);
        });
    });

    it('complex data 2 level processing', () => {
        let instance: any = (el.querySelector('.h-control') as any).hel_instances[0];
        expect(JSON.stringify(instance.childs[0], (key: string, value: Object) => {
            return instance.getActualProperties(value);
        })).toEqual(
            '{"header":true,"text":"Child1","subChilds":[{"header":true,"text":"SubChild1"},' +
            '{"header":true,"text":"SubChild2"},{"header":true,"text":"SubChild3"}]}'
            );
    });

    afterAll(() => {
        el.remove();
    });

});

describe('=> Complex Component => ', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let directives: any[] = ControlComponents;
    directives.push(AppComponent);
    beforeEach((done) => {
        TestBed.configureTestingModule({
            declarations: directives,
            providers: [ComponentBase]
        });
        /* tslint:disable */
        TestBed.overrideComponent(AppComponent, {
            set: {
                template: `<hel-control>
                <h-childs>
                <h-child>
                    <h-sub-childs>
                        <h-sub-child text='SubChild1' [header]=true ></h-sub-child>
                        <h-sub-child text='SubChild2' [header]=true ></h-sub-child>
                        <h-sub-child text='SubChild3' [header]=true ></h-sub-child>
                    </h-sub-childs>
                </h-child>
                </h-childs>
                </hel-control>`
            }
        });
        /* tslint:enable */

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            el = de.nativeElement;
            fixture.detectChanges();
            setTimeout(() => { done(); }, 1000);
        });
    });
    it('complex data 2 level with out parent property changed', () => {
        let instance: any = (el.querySelector('.h-control') as any).hel_instances[0];
        expect(JSON.stringify(instance.childs[0], (key: string, value: Object) => {
            return instance.getActualProperties(value);
        })).toEqual(
            '{"subChilds":[{"header":true,"text":"SubChild1"},{"header":true,"text":"SubChild2"},' +
            '{"header":true,"text":"SubChild3"}],"text":"Child","header":true}'
            );
    });

    afterAll(() => {
        el.remove();
    });

});

describe('=> Complex Component => ', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let directives: any[] = ControlComponents;
    directives.push(AppComponent);
    beforeEach((done) => {
        TestBed.configureTestingModule({
            declarations: directives,
            providers: [ComponentBase]
        });
        /* tslint:disable */
        TestBed.overrideComponent(AppComponent, {
            set: {
                template: `<hel-control>
                <h-childs>
                <h-child *ngFor="let item of new; [text]='item.text' [header]='item.header'>
                </h-childs>
                </hel-control>`
            }
        });
        /* tslint:enable */

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            el = de.nativeElement;
            fixture.detectChanges();
            setTimeout(() => { done(); }, 100);
        });
    });

    it('complex data processing hasnew', () => {
        expect(JSON.stringify(comp.new[0])).toEqual('{"text":"Child1","header":true}');
        expect(JSON.stringify(comp.new[1])).toEqual('{"text":"Child2","header":false}');
        expect(JSON.stringify(comp.new[2])).toEqual('{"text":"Child3","header":true}');
    });

    it('complex data binding has-new', (done: Function) => {
        comp.new = [{ text: 'ChangedChild', header: true }];
        fixture.detectChanges();
        setTimeout(() => {
            let instance: any = (el.querySelector('.h-control') as any).hel_instances[0];
            expect(JSON.stringify(comp.new[0])).toEqual('{"text":"ChangedChild","header":true}');
            done();
        }, 100);
    });

    afterAll(() => {
        el.remove();
    });

});