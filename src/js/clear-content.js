export function clearContent(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}