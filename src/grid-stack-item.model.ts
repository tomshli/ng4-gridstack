
export class GridStackItem {
    x: number = 0;
    y: number = 0;
    height: number = 1;
    width: number = 1;
    maxHeight?: number | undefined;
    minHeight?: number | undefined;
    maxWidth?: number | undefined;
    minWidth?: number | undefined;
    noResize: boolean = false;
    noMove?: boolean | undefined;
    autoPosition: boolean = false;
    visible: boolean = true;
    locked?: boolean | undefined;
    el: any;
    itemId: string;
    static Clone(widget: GridStackItem) {
        var result = new GridStackItem();

        result.autoPosition = widget.autoPosition;
        result.itemId = widget.itemId;
        result.el = widget.el;
        result.height = widget.height;
        result.locked = widget.locked;
        result.maxHeight = widget.maxHeight;
        result.maxWidth = widget.maxWidth;
        result.minHeight = widget.minHeight;
        result.minWidth = widget.minWidth;
        result.noMove = widget.noMove;
        result.noResize = widget.noResize;
        result.width = widget.width;
        result.x = widget.x;
        result.y = widget.y;

        return result;
    }
}
