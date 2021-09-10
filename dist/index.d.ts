export declare type HTMLElementKey<K extends keyof HTMLElementTagNameMap> = keyof HTMLElementTagNameMap[K];
export declare type HTMLElementProp<K extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[K][Extract<keyof HTMLElementTagNameMap[K], string>];
export declare type HTMLElementProps<K extends keyof HTMLElementTagNameMap> = {
    setRef?: (self: HTMLElementTagNameMap[K]) => any;
} & {
    [key in HTMLElementKey<K>]?: HTMLElementProp<K>;
};
export declare function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: HTMLElementProps<K>, children?: (HTMLElement | SVGSVGElement)[]): HTMLElementTagNameMap[K];
export declare namespace html {
    var create: <K extends keyof HTMLElementTagNameMap>(tagName: K) => HTMLElementTagNameMap[K];
    var attr: <K extends keyof HTMLElementTagNameMap>(target: HTMLElementTagNameMap[K], props: HTMLElementProps<K>) => HTMLElementTagNameMap[K];
    var append: <K extends keyof HTMLElementTagNameMap>(target: HTMLElementTagNameMap[K], children: (HTMLElement | SVGSVGElement)[]) => HTMLElementTagNameMap[K];
}
export declare type SVGElementKey<K extends keyof SVGElementTagNameMap> = keyof SVGElementTagNameMap[K];
export declare type SVGElementProp<K extends keyof SVGElementTagNameMap> = SVGElementTagNameMap[K][Extract<keyof SVGElementTagNameMap[K], string>];
export declare type SVGElementProps<K extends keyof SVGElementTagNameMap> = {
    setRef?: (self: SVGElementTagNameMap[K]) => any;
} & {
    [key in SVGElementKey<K>]?: SVGElementProp<K>;
};
export declare function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: SVGElementProps<K>, children?: SVGElement[]): SVGElementTagNameMap[K];
export declare namespace svg {
    var create: <K extends keyof SVGElementTagNameMap>(tagName: K) => SVGElementTagNameMap[K];
    var attr: <K extends keyof SVGElementTagNameMap>(target: SVGElementTagNameMap[K], props: SVGElementProps<K>) => SVGElementTagNameMap[K];
    var append: <K extends keyof SVGElementTagNameMap>(target: SVGElementTagNameMap[K], children: SVGElement[]) => SVGElementTagNameMap[K];
}
