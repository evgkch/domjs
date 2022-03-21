declare type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
declare type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export declare type DOMElementProps<K> = {
    useRef?: (self: K) => any;
} & {
    [Key in NonFunctionPropertyNames<K>]?: NonFunctionProperties<K>[Key];
} & {
    [Key in string]: any;
};
export declare function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: DOMElementProps<HTMLElementTagNameMap[K]> | null, children?: (HTMLElement | SVGSVGElement | Text)[]): HTMLElementTagNameMap[K];
export declare namespace html {
    var create: <K extends keyof HTMLElementTagNameMap>(tagName: K) => HTMLElementTagNameMap[K];
    var attr: <K extends HTMLElement>(target: K, props: DOMElementProps<K> | null) => K;
    var append: <K extends HTMLElement>(target: K, children: (HTMLElement | SVGSVGElement | Text)[]) => K;
    var remove: <K extends HTMLElement, T extends HTMLElement | SVGSVGElement>(source: K, target: T) => K;
}
export declare function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: DOMElementProps<SVGElementTagNameMap[K]> | null, children?: (SVGElement | Text)[]): SVGElementTagNameMap[K];
export declare namespace svg {
    var create: <K extends keyof SVGElementTagNameMap>(tagName: K) => SVGElementTagNameMap[K];
    var attr: <K extends SVGElement>(target: K, props: DOMElementProps<K> | null) => K;
    var append: <K extends SVGElement>(target: K, children: (SVGElement | Text)[]) => K;
    var remove: <K extends SVGElement, T extends SVGElement>(source: K, target: T) => K;
}
export declare function text(value: string): Text;
export {};
