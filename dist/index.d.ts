export declare type DOMElementProps<K extends HTMLElement | SVGElement | Element> = {
    useRef?: (self: K) => any;
} & {
    [key in string]: any;
};
export declare function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: DOMElementProps<HTMLElement>, children?: (HTMLElement | SVGSVGElement)[]): HTMLElementTagNameMap[K];
export declare namespace html {
    var create: <K extends keyof HTMLElementTagNameMap>(tagName: K) => HTMLElementTagNameMap[K];
    var attr: <K extends HTMLElement>(target: K, props: DOMElementProps<HTMLElement>) => K;
    var append: <K extends HTMLElement>(target: K, children: (HTMLElement | SVGSVGElement)[]) => K;
}
export declare function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: DOMElementProps<SVGElement>, children?: SVGElement[]): SVGElementTagNameMap[K];
export declare namespace svg {
    var create: <K extends keyof SVGElementTagNameMap>(tagName: K) => SVGElementTagNameMap[K];
    var attr: <K extends SVGElement>(target: K, props: DOMElementProps<SVGElement>) => K;
    var append: <K extends SVGElement>(target: K, children: SVGElement[]) => K;
}
