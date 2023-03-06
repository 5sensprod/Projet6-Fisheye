// Description :  fonctions utilitaires pour manipuler le DOM

export function createNode(element) {
    return document.createElement(element);
}

export function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

export function addClass(element, ...classNames) {
    element.classList.add(...classNames);
}

export function removeClass(element, ...classNames) {
    element.classList.remove(...classNames);
}

export function clearNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export function appendNode(parent, child) {
    parent.appendChild(child);
}

export function setInnerHTML(element, html) {
    element.innerHTML = html;
}

export function toggleClass(element, ...classNames) {
    classNames.forEach(className => {
        element.classList.toggle(className);
    });
}