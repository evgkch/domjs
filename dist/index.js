class Ref {
    constructor(use) {
        this.use = use;
    }
}
export function useRef(use) {
    return new Ref(use);
}
export function html(tagName, props, children) {
    const element = html.create(tagName);
    if (props)
        html.attr(element, props);
    if (children)
        html.append(element, children);
    return element;
}
html.create = (tagName) => document.createElement(tagName);
html.attr = (target, props) => {
    for (let key in props) {
        const value = props[key];
        if (value instanceof Ref)
            target[key] = value.use(target);
        else
            target[key] = value;
    }
    return target;
};
html.append = (target, children) => {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child instanceof Ref)
            target.append(...child.use(target));
        else
            target.appendChild(child);
    }
    return target;
};
html.remove = (source, target) => {
    source.removeChild(target);
    return source;
};
export function svg(tagName, props, children) {
    const element = svg.create(tagName);
    if (props)
        svg.attr(element, props);
    if (children)
        svg.append(element, children);
    return element;
}
svg.create = (tagName) => document.createElementNS('http://www.w3.org/2000/svg', tagName);
svg.attr = (target, props) => {
    for (let key in props) {
        const value = props[key];
        if (value instanceof Ref)
            target[key] = value.use(target);
        else
            target[key] = value;
    }
    return target;
};
svg.append = (target, children) => {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child instanceof Ref)
            target.append(...child.use(target));
        else
            target.appendChild(child);
    }
    return target;
};
svg.remove = (source, target) => {
    source.removeChild(target);
    return source;
};
export function text(value) {
    return document.createTextNode(value);
}
export function list(length, map) {
    return Array.from({ length }, (_, i) => map(i));
}
