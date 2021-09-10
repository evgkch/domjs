export type DOMElementProps<K extends HTMLElement | SVGElement> =
    & { useRef?: (self: K) => any }
    & { [key in string]: any };

export function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: DOMElementProps<HTMLElement>, children?: (HTMLElement | SVGSVGElement)[]) {
    const element = html.create(tagName);        
    if (props)
        html.attr(element, props);
    if (children)
        html.append(element, children);
    return element;
}

html.create = <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] =>
    document.createElement(tagName);

html.attr = <K extends HTMLElement>(target: K, props: DOMElementProps<HTMLElement>): K => {
    if (props.useRef)
    {
        props.useRef(target);
        delete props.useRef;        
    }    
    for (let key in props)
        target.setAttribute(key, props[key].toString());
    return target;
};

html.append = <K extends HTMLElement>(target: K, children: (HTMLElement | SVGSVGElement)[]): K => {
    children.forEach(child => target.appendChild(child));
    return target;
};

export function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: DOMElementProps<SVGElement>, children?: SVGElement[]) {
    const element = svg.create(tagName);        
    if (props)
        svg.attr(element, props);
    if (children)
        svg.append(element, children);        
    return element;
}

svg.create = <K extends keyof SVGElementTagNameMap>(tagName: K): SVGElementTagNameMap[K] =>
    document.createElementNS('http://www.w3.org/2000/svg', tagName);

svg.attr = <K extends SVGElement>(target: K, props: DOMElementProps<SVGElement>): K => {
    if (props.useRef)
    {
        props.useRef(target);
        delete props.useRef;        
    }    
    for (let key in props)
        target.setAttribute(key, props[key].toString());
    return target;
};

svg.append = <K extends SVGElement>(target: K, children: SVGElement[]): K => {
    children.forEach(child => target.appendChild(child));
    return target;
};