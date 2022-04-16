export function isListener(key) {
    return key.startsWith('on');
}
export function isRef(key) {
    return key === 'useRef';
}
export function attr(target, props) {
    for (let key in props) {
        if (isListener(key))
            target[key] = props[key];
        else if (isRef(key))
            props[key](target);
        else
            target.setAttribute(key, props[key]);
    }
    return target;
}
;
export function text(value) {
    return document.createTextNode(value);
}
export function html(tagName, props, children) {
    const element = html.create(tagName);
    if (props)
        html.attr(element, props);
    if (children)
        html.append(element, children instanceof Function ? children(element) : children);
    return element;
}
html.create = (tagName) => document.createElement(tagName);
html.attr = attr;
html.append = (target, children) => {
    target.append(...children);
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
        svg.append(element, children instanceof Function ? children(element) : children);
    return element;
}
svg.create = (tagName) => document.createElementNS('http://www.w3.org/2000/svg', tagName);
svg.attr = attr;
svg.append = (target, children) => {
    target.append(...children);
    return target;
};
svg.remove = (source, target) => {
    source.removeChild(target);
    return source;
};
