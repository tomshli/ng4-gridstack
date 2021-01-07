import { Component, HostBinding, Input, Output, OnInit, ComponentRef, ElementRef, ViewChild, Renderer2, EventEmitter, OnDestroy, AfterViewInit, ViewContainerRef } from '@angular/core';
import { GridStackItem } from './grid-stack-item.model'
declare var jQuery: any;
declare var _: any;

@Component({
    selector: 'grid-stack-item',
    template: `<div class="grid-stack-item-content">
              <div #contentPlaceholder *ngIf="contentTemplate"></div>
              <ng-content *ngIf="!contentTemplate"></ng-content>
            </div>`
})
export class GridStackItemComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild("contentPlaceholder", { read: ViewContainerRef }) contentPlaceholder: ViewContainerRef;
    @Input() contentTemplate: string;
    @Input() option: GridStackItem;
    @Output() onGridConfigurationChanged = new EventEmitter<GridStackItem>();

    contentComponentRef: ComponentRef<any> = null;
    jGridRef: any = null;
    public jWidgetRef: any = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.jWidgetRef = el.nativeElement;
    }
    get nativeElement(): HTMLElement {
        return this.el.nativeElement;
    }
    ngOnInit() {
        this.RenderWidget(null);
    }

    UpdateWidget(item: GridStackItem) {

    }
    RenderWidget(item: GridStackItem) {
        let renderer = this.renderer;
        if (item != null)
            this.option = item;

        String(this.option.x) == null ? this.renderer.removeAttribute(this.nativeElement, "data-gs-x") : this.renderer.setAttribute(this.nativeElement, "data-gs-x", String(this.option.x));
        String(this.option.y) == null ? this.renderer.removeAttribute(this.nativeElement, "data-gs-y") : this.renderer.setAttribute(this.nativeElement, "data-gs-y", String(this.option.y));
        String(this.option.width) == null ? this.renderer.removeAttribute(this.nativeElement, "data-gs-width") : this.renderer.setAttribute(this.nativeElement, "data-gs-width", String(this.option.width));
        String(this.option.height) == null ? this.renderer.removeAttribute(this.nativeElement, "data-gs-height") : this.renderer.setAttribute(this.nativeElement, "data-gs-height", String(this.option.height));
        //this.renderer.setElementAttribute(this.nativeElement, "data-gs-x", String(this.option.x));
        //this.renderer.setElementAttribute(this.nativeElement, "data-gs-y", String(this.option.y));
        //this.renderer.setElementAttribute(this.nativeElement, "data-gs-width", String(this.option.width));
        //this.renderer.setElementAttribute(this.nativeElement, "data-gs-height", String(this.option.height));

        if (this.option.minWidth) {
            String(this.option.minWidth) == null ? this.renderer.removeAttribute(this.nativeElement, "data-gs-min-width") : this.renderer.setAttribute(this.nativeElement, "data-gs-min-width", String(this.option.minWidth));
            //renderer.setElementAttribute(this.nativeElement, "data-gs-min-width", String(this.option.minWidth));
        }
        if (this.option.noResize != null && this.option.noResize == true) {
            "yes" == null ? this.renderer.removeAttribute(this.nativeElement, "data-gs-no-resize") : this.renderer.setAttribute(this.nativeElement, "data-gs-no-resize", "yes");
            //renderer.setElementAttribute(this.nativeElement, "data-gs-no-resize", "yes");
        }

        if (this.option.visible === false) {
            this.renderer.addClass(this.nativeElement, "hidden");
            //this.renderer.setElementClass(this.nativeElement, "hidden", true);
        }

        if (this.option.itemId)
        {
            this.option.itemId == null ? this.renderer.removeAttribute(this.nativeElement, "data-item-id") : this.renderer.setAttribute(this.nativeElement, "data-item-id", this.option.itemId);
            //this.renderer.setElementAttribute(this.nativeElement, "data-item-id", this.option.itemId);
        }
    }

    update(x: number, y: number, width: number, height: number): void {
        // console.log("here");
        if (x === this.option.x && y === this.option.y && width === this.option.width && height === this.option.height)
            return;
        if (this.option != null) {
            this.option.x = x;
            this.option.y = y;
            this.option.width = width;
            this.option.height = height;

            var optionNew = GridStackItem.Clone(this.option);
            this.onGridConfigurationChanged.emit(optionNew);
        }
    }

    ngAfterViewInit(): void {
        //if (!!this.contentTemplate) {
        //    this.componentService.getDynamicComponentFactory({
        //        selector: `grid-stack-item-${Date.now()}`,
        //        template: this.contentTemplate
        //    })
        //        .then(factory => {
        //            this.contentComponentRef = this.contentPlaceholder.createComponent(factory);
        //        })
        //}
    }

    ngOnDestroy(): void {
        if (this.contentComponentRef !== null)
            this.contentComponentRef.destroy();
    }
}
