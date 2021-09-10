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
    if (props.setRef) {
        props.setRef(target);
        delete props.setRef;
    }
    for (let key in props)
        target[key] = props[key];
    return target;
};
html.append = (target, children) => {
    children.forEach(child => target.appendChild(child));
    return target;
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
    if (props.setRef) {
        props.setRef(target);
        delete props.setRef;
    }
    for (let key in props)
        target[key] = props[key];
    return target;
};
svg.append = (target, children) => {
    children.forEach(child => target.appendChild(child));
    return target;
};