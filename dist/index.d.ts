export declare type DOMElementProps<K> = {
    useRef?: (self: K) => any;
} & {
    [key in string]: any;
};
export declare function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: DOMElementProps<HTMLElementTagNameMap[K]>, children?: (HTMLElement | SVGSVGElement)[]): HTMLElementTagNameMap[K];
export declare namespace html {
    var create: <K extends keyof HTMLElementTagNameMap>(tagName: K) => HTMLElementTagNameMap[K];
    var attr: <K extends HTMLElement>(target: K, props: DOMElementProps<K>) => K;
    var append: <K extends HTMLElement>(target: K, children: (HTMLElement | SVGSVGElement)[]) => K;
    var remove: <K extends HTMLElement, T extends HTMLElement | SVGSVGElement>(source: K, target: T) => void;
}
export declare function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: DOMElementProps<SVGElementTagNameMap[K]>, children?: SVGElement[]): SVGElementTagNameMap[K];
export declare namespace svg {
    var create: <K extends keyof SVGElementTagNameMap>(tagName: K) => SVGElementTagNameMap[K];
    var attr: <K extends SVGElement>(target: K, props: DOMElementProps<K>) => K;
    var append: <K extends SVGElement>(target: K, children: SVGElement[]) => K;
    var remove: <K extends SVGElement, T extends SVGElement>(source: K, target: T) => void;
}
