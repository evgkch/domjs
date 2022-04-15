type IfEquals<X, Y, A, B> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

export type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];

export type WritablePart<T> = Pick<T, WritableKeysOf<T>>;

export type DOMElementProps<K extends HTMLElement | SVGElement | Text> = Partial<WritablePart<K>>;

export function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: DOMElementProps<HTMLElementTagNameMap[K]> | ((self: HTMLElementTagNameMap[K]) => DOMElementProps<HTMLElementTagNameMap[K]>) | null, children?: (HTMLElement | SVGSVGElement | Text)[] | ((self: HTMLElementTagNameMap[K]) => (HTMLElement | SVGSVGElement | Text)[])) {
    const element = html.create(tagName);
    if (props)
        html.attr(element, props instanceof Function ? props(element) : props);
    if (children)
        html.append(element, children instanceof Function ? children(element) : children);
    return element;
}

html.create = <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] =>
    document.createElement(tagName);

html.attr = <K extends HTMLElement | SVGElement | Text>(target: K, props: DOMElementProps<K>): K => {
    for (let key in props)
        // @ts-ignore
        target[key] = props[key];
    return target;
};

html.append = <K extends HTMLElement>(target: K, children: (HTMLElement | SVGSVGElement | Text)[]): K => {
    target.append(...children);
    return target;
};

html.remove = <K extends HTMLElement, T extends HTMLElement | SVGSVGElement>(source: K, target: T): K => {
    source.removeChild(target);
    return source;
};

export function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: DOMElementProps<SVGElementTagNameMap[K]> | ((self: SVGElementTagNameMap[K]) => DOMElementProps<SVGElementTagNameMap[K]>) | null, children?: (SVGElement | Text)[] | ((self: SVGElementTagNameMap[K]) => (SVGElement | Text)[])) {
    const element = svg.create(tagName);
    if (props)
        svg.attr(element, props instanceof Function ? props(element) : props);
    if (children)
        svg.append(element, children instanceof Function ? children(element) : children);
    return element;
}

svg.create = <K extends keyof SVGElementTagNameMap>(tagName: K): SVGElementTagNameMap[K] =>
    document.createElementNS('http://www.w3.org/2000/svg', tagName);

svg.attr = <K extends SVGElement>(target: K, props: DOMElementProps<K>): K => {
    for (let key in props)
        // @ts-ignore
        target[key] = props[key];
    return target;
};

svg.append = <K extends SVGElement>(target: K, children: (SVGElement | Text)[]): K => {
    target.append(...children);
    return target;
};

svg.remove = <K extends SVGElement, T extends SVGElement>(source: K, target: T): K => {
    source.removeChild(target);
    return source;
};

export function text(value: string): Text {
    return document.createTextNode(value);
}