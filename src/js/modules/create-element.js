function createElem(elem, className, content = '') {
    let item = document.createElement(elem)
    item.classList.add(className)
    item.innerHTML = content

    return item
}

export default createElem