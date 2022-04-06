export declare type DOMElementProps<K> = {
    [Key in keyof K]?: K[Key] | Ref<K[Key]>;
};
declare class Ref<Y> {
    use: <T extends HTMLElement | SVGElement | Text>(target: T) => Y;
    constructor(use: <T extends HTMLElement | SVGElement | Text>(target: T) => Y);
}
export declare function useRef<Y>(use: <T extends HTMLElement | SVGElement | Text>(target: T) => Y): Ref<Y>;
export declare function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: DOMElementProps<HTMLElementTagNameMap[K]>, children?: (HTMLElement | SVGSVGElement | Text | Ref<(HTMLElement | SVGSVGElement | Text)[]>)[]): HTMLElementTagNameMap[K];
export declare namespace html {
    var create: <K extends keyof HTMLElementTagNameMap>(tagName: K) => HTMLElementTagNameMap[K];
    var attr: <K extends HTMLElement>(target: K, props: DOMElementProps<K>) => K;
    var append: <K extends HTMLElement>(target: K, children: (HTMLElement | Text | SVGSVGElement | Ref<(HTMLElement | Text | SVGSVGElement)[]>)[]) => K;
    var remove: <K extends HTMLElement, T extends HTMLElement | SVGSVGElement>(source: K, target: T) => K;
}
export declare function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: DOMElementProps<SVGElementTagNameMap[K]>, children?: (SVGElement | Text | Ref<(SVGElement | Text)[]>)[]): SVGElementTagNameMap[K];
export declare namespace svg {
    var create: <K extends keyof SVGElementTagNameMap>(tagName: K) => SVGElementTagNameMap[K];
    var attr: <K extends SVGElement>(target: K, props: DOMElementProps<K>) => K;
    var append: <K extends SVGElement>(target: K, children: (SVGElement | Text | Ref<(SVGElement | Text)[]>)[]) => K;
    var remove: <K extends SVGElement, T extends SVGElement>(source: K, target: T) => K;
}
export declare function text(value: string): Text;
export declare function list<T>(length: number, map: (i: number) => T): T[];
export {};
