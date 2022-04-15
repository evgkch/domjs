declare type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
export declare type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P, never>;
}[keyof T];
export declare type WritablePart<T> = Pick<T, WritableKeysOf<T>>;
export declare type DOMElementProps<K extends HTMLElement | SVGElement | Text> = Partial<WritablePart<K>>;
export declare function isListener(key: string): boolean;
export declare function text(value: string): Text;
export declare function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: DOMElementProps<HTMLElementTagNameMap[K]> | ((self: HTMLElementTagNameMap[K]) => DOMElementProps<HTMLElementTagNameMap[K]>) | null, children?: (HTMLElement | SVGSVGElement | Text)[] | ((self: HTMLElementTagNameMap[K]) => (HTMLElement | SVGSVGElement | Text)[])): HTMLElementTagNameMap[K];
export declare namespace html {
    var create: <K extends keyof HTMLElementTagNameMap>(tagName: K) => HTMLElementTagNameMap[K];
    var attr: <K extends HTMLElement>(target: K, props: Partial<WritablePart<K>>) => K;
    var append: <K extends HTMLElement>(target: K, children: (HTMLElement | Text | SVGSVGElement)[]) => K;
    var remove: <K extends HTMLElement, T extends HTMLElement | SVGSVGElement>(source: K, target: T) => K;
}
export declare function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: DOMElementProps<SVGElementTagNameMap[K]> | ((self: SVGElementTagNameMap[K]) => DOMElementProps<SVGElementTagNameMap[K]>) | null, children?: (SVGElement | Text)[] | ((self: SVGElementTagNameMap[K]) => (SVGElement | Text)[])): SVGElementTagNameMap[K];
export declare namespace svg {
    var create: <K extends keyof SVGElementTagNameMap>(tagName: K) => SVGElementTagNameMap[K];
    var attr: <K extends SVGElement>(target: K, props: Partial<WritablePart<K>>) => K;
    var append: <K extends SVGElement>(target: K, children: (SVGElement | Text)[]) => K;
    var remove: <K extends SVGElement, T extends SVGElement>(source: K, target: T) => K;
}
export {};
