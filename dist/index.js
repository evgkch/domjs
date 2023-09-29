export function isListener(key) {
    return key.startsWith('on');
}
export function append(target, children) {
    if (children instanceof Function)
        target.append(children(target));
    else
        target.append(...children);
}
;
export function text(value) {
    return document.createTextNode(value);
}
export function html(tagName, props, children) {
    const element = html.create(tagName);
    if (props)
        html.attr(element, props instanceof Function ? props(element) : props);
    if (children)
        html.append(element, children);
    return element;
}
html.create = (tagName) => document.createElement(tagName);
html.attr = (target, props) => {
    for (let key in props) {
        if (isListener(key))
            target[key] = props[key];
        else
            target.setAttribute(key, props[key]);
    }
    return target;
};
html.append = append;
html.remove = (source, target) => {
    source.removeChild(target);
    return source;
};
export function svg(tagName, props, children) {
    const element = svg.create(tagName);
    if (props)
        svg.attr(element, props instanceof Function ? props(element) : props);
    if (children)
        svg.append(element, children);
    return element;
}
svg.create = (tagName) => document.createElementNS('http://www.w3.org/2000/svg', tagName);
svg.attr = (target, props) => {
    for (let key in props) {
        if (isListener(key))
            target[key] = props[key];
        else
            target.setAttribute(key, props[key]);
    }
    return target;
};
svg.append = append;
svg.remove = (source, target) => {
    source.removeChild(target);
    return source;
};
export function css(source, props) {
    for (let key in props) {
        source.style[key] = props[key];
    }
    return null;
}
