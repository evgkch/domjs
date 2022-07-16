declare type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
export declare type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P, never>;
}[keyof T];
declare type ElementProps<T extends Object> = Partial<{
    [K in WritableKeysOf<T>]: T[K];
}>;
export declare type HTMLElementProps<T extends HTMLElement> = ElementProps<T>;
export declare type SVGElementProps<T extends SVGElement> = ElementProps<T>;
export declare type DOMChild<T extends HTMLElement | SVGElement> = T extends HTMLElement ? HTMLElement | SVGSVGElement | Text : SVGElement | Text;
export declare function isListener(key: string): boolean;
export declare function append<K extends HTMLElement | SVGElement>(target: K, children: (DOMChild<K> | ((parent: K, i: number) => DOMChild<K>))[]): K;
export declare function text(value: string): Text;
export declare function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: HTMLElementProps<HTMLElementTagNameMap[K]> | ((parent: HTMLElementTagNameMap[K]) => HTMLElementProps<HTMLElementTagNameMap[K]>) | null, children?: (DOMChild<HTMLElementTagNameMap[K]> | ((self: HTMLElementTagNameMap[K], i: number) => DOMChild<HTMLElementTagNameMap[K]>))[]): HTMLElementTagNameMap[K];
export declare namespace html {
    var create: <K extends keyof HTMLElementTagNameMap>(tagName: K) => HTMLElementTagNameMap[K];
    var attr: <K extends HTMLElement>(target: K, props: Partial<{ [K_1 in WritableKeysOf<K>]: K[K_1]; }>) => K;
    var append: typeof import(".").append;
    var remove: <K extends HTMLElement, T extends HTMLElement | SVGSVGElement>(source: K, target: T) => K;
}
export declare function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: SVGElementProps<SVGElementTagNameMap[K]> | ((parent: SVGElementTagNameMap[K]) => SVGElementProps<SVGElementTagNameMap[K]>) | null, children?: (DOMChild<SVGElementTagNameMap[K]> | ((self: SVGElementTagNameMap[K], i: number) => DOMChild<SVGElementTagNameMap[K]>))[]): SVGElementTagNameMap[K];
export declare namespace svg {
    var create: <K extends keyof SVGElementTagNameMap>(tagName: K) => SVGElementTagNameMap[K];
    var attr: <K extends SVGElement>(target: K, props: Partial<{ [K_1 in WritableKeysOf<K>]: K[K_1]; }>) => K;
    var append: typeof import(".").append;
    var remove: <K extends SVGElement, T extends SVGElement>(source: K, target: T) => K;
}
export {};
