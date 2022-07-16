function removeActive(elem) {
    const items = elem;

    for (let i = 0; i < items.length; i++) {
        if (items[i].tagName == "LI") {
            items[i].classList.remove("active");
        }
    }
}

export default removeActive