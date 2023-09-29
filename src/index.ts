type IfEquals<X, Y, A, B> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

export type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];

type ExcludeFunc<T extends Object> = { [K in keyof T as T[K] extends Function ? never : K]: T[K] };
type ElementProps<T extends Object> = Partial<ExcludeFunc<{ [K in WritableKeysOf<T>]: T[K] }>>;

export type HTMLElementProps<T extends HTMLElement> = ElementProps<T> | null;
export type SVGElementProps<T extends SVGElement> = ElementProps<T> | null;

export type DOMChild<T extends HTMLElement | SVGElement> = T extends HTMLElement
    ? HTMLElement | SVGSVGElement | Text
    : SVGElement | Text;

export function isListener(key: string) {
    return key.startsWith('on');
}

export function append<K extends ParentNode>(target: K, children: ChildNode[] | ((parent: K) => ChildNode[])) {
    if (children instanceof Function)
        target.append((children as Function)(target));
    else
        target.append(...children);
};

export function text(value: string): Text {
    return document.createTextNode(value);
}

export function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: HTMLElementProps<HTMLElementTagNameMap[K]> | ((parent: HTMLElementTagNameMap[K]) => HTMLElementProps<HTMLElementTagNameMap[K]> | null) | null, children?: ChildNode[] | ((parent: HTMLElementTagNameMap[K]) => ChildNode[])) {
    const element = html.create(tagName);
    if (props)
        html.attr(element, props instanceof Function ? props(element) : props);
    if (children)
        html.append(element, children);
    return element;
}

html.create = <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] =>
    document.createElement(tagName);

html.attr = <K extends HTMLElement>(target: K, props: HTMLElementProps<K>): K => {
    for (let key in props)
    {
        if (isListener(key))
            // @ts-ignore
            target[key] = props[key];
        else
            // @ts-ignore
            target.setAttribute(key, props[key]);
    }
    return target;
};

html.append = append;

html.remove = <K extends HTMLElement, T extends HTMLElement | SVGSVGElement>(source: K, target: T): K => {
    source.removeChild(target);
    return source;
};

export function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: SVGElementProps<SVGElementTagNameMap[K]> | ((parent: SVGElementTagNameMap[K]) => SVGElementProps<SVGElementTagNameMap[K]> | null) | null, children?: ChildNode[] | ((parent: SVGElementTagNameMap[K]) => ChildNode[])) {
    const element = svg.create(tagName);
    if (props)
        svg.attr(element, props instanceof Function ? props(element) : props);
    if (children)
        svg.append(element, children);
    return element;
}

svg.create = <K extends keyof SVGElementTagNameMap>(tagName: K): SVGElementTagNameMap[K] =>
    document.createElementNS('http://www.w3.org/2000/svg', tagName);

svg.attr = <K extends SVGElement>(target: K, props: SVGElementProps<K>): K => {
    for (let key in props)
    {
        if (isListener(key))
            // @ts-ignore
            target[key] = props[key];
        else
            // @ts-ignore
            target.setAttribute(key, props[key]);
    }
    return target;
};

svg.append = append;

svg.remove = <K extends SVGElement, T extends SVGElement>(source: K, target: T): K => {
    source.removeChild(target);
    return source;
};

export function css<K extends HTMLElement | SVGElement>(source: K, props: ElementProps<CSSStyleDeclaration>) {
    for (let key in props) {
        // @ts-ignore
        source.style[key] = props[key];
    }
    return null;
}