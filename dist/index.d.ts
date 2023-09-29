type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
export type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P, never>;
}[keyof T];
type ExcludeFunc<T extends Object> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
type ElementProps<T extends Object> = Partial<ExcludeFunc<{
    [K in WritableKeysOf<T>]: T[K];
}>>;
export type HTMLElementProps<T extends HTMLElement> = ElementProps<T> | null;
export type SVGElementProps<T extends SVGElement> = ElementProps<T> | null;
export type DOMChild<T extends HTMLElement | SVGElement> = T extends HTMLElement ? HTMLElement | SVGSVGElement | Text : SVGElement | Text;
export declare function isListener(key: string): boolean;
export declare function append<K extends ParentNode>(target: K, children: ChildNode[] | ((parent: K) => ChildNode[])): void;
export declare function text(value: string): Text;
export declare function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: HTMLElementProps<HTMLElementTagNameMap[K]> | ((parent: HTMLElementTagNameMap[K]) => HTMLElementProps<HTMLElementTagNameMap[K]> | null) | null, children?: ChildNode[] | ((parent: HTMLElementTagNameMap[K]) => ChildNode[])): HTMLElementTagNameMap[K];
export declare namespace html {
    var create: <K extends keyof HTMLElementTagNameMap>(tagName: K) => HTMLElementTagNameMap[K];
    var attr: <K extends HTMLElement>(target: K, props: HTMLElementProps<K>) => K;
    var append: typeof import(".").append;
    var remove: <K extends HTMLElement, T extends HTMLElement | SVGSVGElement>(source: K, target: T) => K;
}
export declare function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: SVGElementProps<SVGElementTagNameMap[K]> | ((parent: SVGElementTagNameMap[K]) => SVGElementProps<SVGElementTagNameMap[K]> | null) | null, children?: ChildNode[] | ((parent: SVGElementTagNameMap[K]) => ChildNode[])): SVGElementTagNameMap[K];
export declare namespace svg {
    var create: <K extends keyof SVGElementTagNameMap>(tagName: K) => SVGElementTagNameMap[K];
    var attr: <K extends SVGElement>(target: K, props: SVGElementProps<K>) => K;
    var append: typeof import(".").append;
    var remove: <K extends SVGElement, T extends SVGElement>(source: K, target: T) => K;
}
export declare function css<K extends HTMLElement | SVGElement>(source: K, props: ElementProps<CSSStyleDeclaration>): null;
export {};
