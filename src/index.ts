type IfEquals<X, Y, A, B> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

export type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];

export type WritablePart<T> = Pick<T, WritableKeysOf<T>>;

export type HTMLElementProps<T extends HTMLElement> = { [Key in WritableKeysOf<T>]?: T[Key] extends Function ? T[Key] : T[Key] | string | number | boolean } & { useRef?: (self: T) => void };
export type SVGElementProps<T extends SVGElement> = { [Key in keyof T]?: T[Key] extends Function ? T[Key] : T[Key] | string | number | boolean } & { useRef?: (self: T) => void };

export type DOMChild<T extends HTMLElement | SVGElement> = T extends HTMLElement
    ? HTMLElement | SVGSVGElement | Text
    : SVGElement | Text;

export function isListener(key: string) {
    return key.startsWith('on');
}

export function isRef(key: string) {
    return key === 'useRef';
}

export function append<K extends HTMLElement | SVGElement>(target: K, children: (DOMChild<K> | ((self: K, i: number) => DOMChild<K>))[]): K {
    for (let i = 0, length = children.length; i < length; i++)
    {
        if (children[i] instanceof Function)
            target.appendChild((children[i] as Function)(target, i));
        else
            target.appendChild(children[i] as DOMChild<K>);
    }
    return target;
};

export function text(value: string): Text {
    return document.createTextNode(value);
}

export function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: HTMLElementProps<HTMLElementTagNameMap[K]> | null, children?: ((HTMLElement | SVGSVGElement | Text) | ((self: HTMLElementTagNameMap[K], i: number) => (HTMLElement | SVGSVGElement | Text)))[]) {
    const element = html.create(tagName);
    if (props)
        html.attr(element, props);
    if (children)
        html.append(element, children instanceof Function ? children(element) : children);
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
        else if (isRef(key))
            // @ts-ignore
            props[key](target);
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

export function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: SVGElementProps<SVGElementTagNameMap[K]> | null, children?: ((SVGElement | Text) | ((self: SVGElementTagNameMap[K]) => (SVGElement | Text)))[]) {
    const element = svg.create(tagName);
    if (props)
        svg.attr(element, props);
    if (children)
        svg.append(element, children instanceof Function ? children(element) : children);
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
        else if (isRef(key))
            // @ts-ignore
            props[key](target);
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