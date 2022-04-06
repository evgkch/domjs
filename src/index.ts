export type DOMElementProps<K> = { [Key in keyof K]?: K[Key] | Ref<K[Key]> };

class Ref<Y> {
    constructor(public use: <T extends HTMLElement | SVGElement | Text>(target: T) => Y) {}
}

export function useRef<Y>(use: <T extends HTMLElement | SVGElement | Text>(target: T) => Y) {
    return new Ref(use);
}

export function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: DOMElementProps<HTMLElementTagNameMap[K]>, children?: (HTMLElement | SVGSVGElement | Text | Ref<(HTMLElement | SVGSVGElement | Text)[]>)[]) {
    const element = html.create(tagName);
    if (props)
        html.attr(element, props);
    if (children)
        html.append(element, children);
    return element;
}

html.create = <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] =>
    document.createElement(tagName);

html.attr = <K extends HTMLElement>(target: K, props: DOMElementProps<K>): K => {
    for (let key in props)
    {
        const value = props[key];
        if (value instanceof Ref)
            target[key] = value.use(target);
        else
            target[key] = value as K[Extract<keyof K, string>];
    }
    return target;
};

html.append = <K extends HTMLElement>(target: K, children: (HTMLElement | SVGSVGElement | Text | Ref<(HTMLElement | SVGSVGElement | Text)[]>)[]): K => {
    for (let i = 0; i < children.length; i++)
    {
        const child = children[i];
        if (child instanceof Ref)
            target.append(...child.use(target));
        else
            target.appendChild(child);
    }
    return target;
};

html.remove = <K extends HTMLElement, T extends HTMLElement | SVGSVGElement>(source: K, target: T): K => {
    source.removeChild(target);
    return source;
};

export function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: DOMElementProps<SVGElementTagNameMap[K]>, children?: (SVGElement | Text | Ref<(SVGElement | Text)[]>)[]) {
    const element = svg.create(tagName);
    if (props)
        svg.attr(element, props);
    if (children)
        svg.append(element, children);
    return element;
}

svg.create = <K extends keyof SVGElementTagNameMap>(tagName: K): SVGElementTagNameMap[K] =>
    document.createElementNS('http://www.w3.org/2000/svg', tagName);

svg.attr = <K extends SVGElement>(target: K, props: DOMElementProps<K>): K => {
    for (let key in props)
    {
        const value = props[key];
        if (value instanceof Ref)
            target[key] = value.use(target);
        else
            target[key] = value as K[Extract<keyof K, string>];
    }
    return target;
};

svg.append = <K extends SVGElement>(target: K, children: (SVGElement | Text | Ref<(SVGElement | Text)[]>)[]): K => {
    for (let i = 0; i < children.length; i++)
    {
        const child = children[i];
        if (child instanceof Ref)
            target.append(...child.use(target));
        else
            target.appendChild(child);
    }
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