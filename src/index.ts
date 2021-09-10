export type HTMLElementKey<K extends keyof HTMLElementTagNameMap> =
    keyof HTMLElementTagNameMap[K];

export type HTMLElementProp<K extends keyof HTMLElementTagNameMap> =
    HTMLElementTagNameMap[K][Extract<keyof HTMLElementTagNameMap[K], string>];

export type HTMLElementProps<K extends keyof HTMLElementTagNameMap> =
    & { setRef?: (self: HTMLElementTagNameMap[K]) => any }
    & { [key in HTMLElementKey<K>]?: HTMLElementProp<K> };

export function html<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: HTMLElementProps<K>, children?: (HTMLElement | SVGSVGElement)[]) {
    const element = html.create(tagName);        
    if (props)
        html.attr(element, props);
    if (children)
        html.append(element, children);
    return element;
}

html.create = <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] =>
    document.createElement(tagName);

html.attr = <K extends keyof HTMLElementTagNameMap>(target: HTMLElementTagNameMap[K], props: HTMLElementProps<K>): HTMLElementTagNameMap[K] => {
    if (props.setRef)
    {
        props.setRef(target);
        delete props.setRef;        
    }    
    for (let key in props)
        target[(<HTMLElementKey<K>> key)] = <HTMLElementProp<K>> props[(<HTMLElementKey<K>> key)];
    return target;
};

html.append = <K extends keyof HTMLElementTagNameMap>(target: HTMLElementTagNameMap[K], children: (HTMLElement | SVGSVGElement)[]): HTMLElementTagNameMap[K] => {
    children.forEach(child => target.appendChild(child));
    return target;
};

export type SVGElementKey<K extends keyof SVGElementTagNameMap> =
    keyof SVGElementTagNameMap[K];

export type SVGElementProp<K extends keyof SVGElementTagNameMap> =
    SVGElementTagNameMap[K][Extract<keyof SVGElementTagNameMap[K], string>];

export type SVGElementProps<K extends keyof SVGElementTagNameMap> =
    & { setRef?: (self: SVGElementTagNameMap[K]) => any }
    & { [key in SVGElementKey<K>]?: SVGElementProp<K> };

export function svg<K extends keyof SVGElementTagNameMap>(tagName: K, props?: SVGElementProps<K>, children?: SVGElement[]) {
    const element = svg.create(tagName);        
    if (props)
        svg.attr(element, props);
    if (children)
        svg.append(element, children);
    return element;
}

svg.create = <K extends keyof SVGElementTagNameMap>(tagName: K): SVGElementTagNameMap[K] =>
    document.createElementNS('http://www.w3.org/2000/svg', tagName);

svg.attr = <K extends keyof SVGElementTagNameMap>(target: SVGElementTagNameMap[K], props: SVGElementProps<K>): SVGElementTagNameMap[K] => {
    if (props.setRef)
    {
        props.setRef(target);
        delete props.setRef;        
    }    
    for (let key in props)
        target[(<SVGElementKey<K>> key)] = <SVGElementProp<K>> props[(<SVGElementKey<K>> key)];
    return target;
};

svg.append = <K extends keyof SVGElementTagNameMap>(target: SVGElementTagNameMap[K], children: SVGElement[]): SVGElementTagNameMap[K] => {
    children.forEach(child => target.appendChild(child));
    return target;
};