export declare class GridStackItem {
    x: number;
    y: number;
    height: number;
    width: number;
    maxHeight: number;
    minHeight: number;
    maxWidth: number;
    minWidth: number;
    noResize: boolean;
    noMove: boolean;
    autoPosition: boolean;
    marginWidth: string;
    locked: boolean;
    el: any;
    customId: string;
    static Clone(widget: GridStackItem): GridStackItem;
}
