import { Component, HostBinding, QueryList, Input, ContentChildren, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { GridStackOptions } from './grid-stack-options.model'
import { GridStackItem } from './grid-stack-item.model'
import { GridStackItemComponent } from './grid-stack-item.component'
import * as jqueryProxy from 'jquery';
import * as _ from 'lodash';
import 'gridstack';

const jquery: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy

@Component({
    selector: 'grid-stack',
    template: `<ng-content></ng-content>`,
    styles: [":host { display: block; }"]
})
export class GridStackComponent implements AfterContentInit {
    @Input() options: GridStackOptions = new GridStackOptions();
    @ContentChildren(GridStackItemComponent) items: QueryList<GridStackItemComponent>;
    private gridStack: JQuery = null;
    private grid: GridStack = null;
    constructor(private el: ElementRef, private renderer: Renderer2) {

    }

    makeWidget(item: GridStackItemComponent) {
        //let widget = this.grid.makeWidget(item.nativeElement);
        item.jGridRef = this.grid;
        //item.jWidgetRef = widget;
        if (item.option != null && item.option.noResize != null && item.option.noResize == true)
            return;
        this.grid.resizable(item.nativeElement, true);
        this.grid.move(item.nativeElement, item.option.x, item.option.y);
        this.grid.resize(item.nativeElement, item.option.width, item.option.height);
    };

    updateWidget(item: GridStackItemComponent) {
        this.grid.resizable(item.nativeElement, true);
        this.grid.move(item.nativeElement, item.option.x, item.option.y);
        this.grid.resize(item.nativeElement, item.option.width, item.option.height);
    }

    enableMove(doEnable: boolean, includeNewWidgets: boolean) {
        this.grid.enableMove(doEnable, includeNewWidgets);
    }

    public AddWidget(item: GridStackItemComponent) {
        let widget = this.grid.makeWidget(item.nativeElement);
        item.jGridRef = this.grid;
        //item.jWidgetRef = widget;
        if (item.option != null && item.option.noResize != null && item.option.noResize == true)
            return;
        this.grid.resizable(item.nativeElement, true);
        this.grid.move(item.nativeElement, item.option.x, item.option.y);
        this.grid.resize(item.nativeElement, item.option.width, item.option.height);
    }

    public RemoveWidget(item: GridStackItemComponent) {
        let widget = this.grid.removeWidget(item.nativeElement, false);
    }
    ngAfterContentInit(): void {
        var that = this;
        let nativeElement = this.el.nativeElement;
        if (this.options == null)
            this.options = new GridStackOptions();
        if (this.options.cellHeight == null)
            this.options.cellHeight = 60;
        if (this.options.width == null)
            this.options.width = 12;
        if (this.options.height == null)
            this.options.height = 0;
        if (this.options.animate == null)
            this.options.animate = true;
        if (this.options.float == null)
            this.options.float = false;
        if (this.options.resizable == null)
            this.options.resizable = true;
        String(this.options.width) == null ? this.renderer.removeAttribute(nativeElement, "data-gs-width") : this.renderer.setAttribute(nativeElement, "data-gs-width", String(this.options.width));
        String(this.options.height) == null ? this.renderer.removeAttribute(nativeElement, "data-gs-height") : this.renderer.setAttribute(nativeElement, "data-gs-height", String(this.options.height));
        //this.renderer.setElementAttribute(nativeElement, "data-gs-width", String(this.options.width));
        //this.renderer.setElementAttribute(nativeElement, "data-gs-height", String(this.options.height));

        this.gridStack = jquery(nativeElement).gridstack(this.options);
        this.grid = this.gridStack.data("gridstack");

        this.gridStack.on("change", (e: any, items: any) => {
            _.each(items, (item: any) => this.widgetChanged(item));
        });




        // Initialize widgets
        this.items.forEach(item => that.makeWidget(item));

    }

    private widgetChanged(change: GridStackItem): void {
        console.log(change);
        //  debugger;
        //console.log(change);
        var jWidget = change.el;
        var gridStackItem = this.items.find(item => item.jWidgetRef !== null ? item.jWidgetRef === jWidget[0] : false);
        if (!gridStackItem)
            return;


        gridStackItem.update(change.x, change.y, change.width, change.height);

    }
}
