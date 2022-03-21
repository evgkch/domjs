type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type DOMElementProps<K> =
    & { useRef?: (self: K) => any }
    & { [Key in NonFunctionPropertyNames<K>]?: NonFunctionProperties<K>[Key] }
    & { [Key in string]: any };

export function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: DOMElementProps<HTMLElementTagNameMap[K]> | null, children?: (HTMLElement | SVGSVGElement | Text)[]) {
    const element = html.create(tagName);
    if (props)
        html.attr(element, props);
    if (children)
        html.append(element, children);
    return element;
}

html.create = <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] =>
    document.createElement(tagName);

html.attr = <K extends HTMLElement>(target: K, props: DOMElementProps<K> | null): K => {
    if (props?.useRef)
    {
        props.useRef(target);
        delete props.useRef;
    }
    for (let key in props)
        target.setAttribute(key, props[key]);
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

export function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: DOMElementProps<SVGElementTagNameMap[K]> | null, children?: (SVGElement | Text)[]) {
    const element = svg.create(tagName);
    if (props)
        svg.attr(element, props);
    if (children)
        svg.append(element, children);
    return element;
}

svg.create = <K extends keyof SVGElementTagNameMap>(tagName: K): SVGElementTagNameMap[K] =>
    document.createElementNS('http://www.w3.org/2000/svg', tagName);

svg.attr = <K extends SVGElement>(target: K, props: DOMElementProps<K> | null): K => {
    if (props?.useRef)
    {
        props.useRef(target);
        delete props.useRef;
    }
    for (let key in props)
        target.setAttribute(key, props[key]);
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

export function list<T>(length: number, map: (i: number) => T): T[] {
    return Array.from({ length }, (_, i) => map(i));
}