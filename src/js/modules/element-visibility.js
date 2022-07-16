export function hideElements (...elements) {
    for (let elem of elements) {
        elem.classList.add("hidden")
    }
}

export function showElements (...elements) {
    for (let elem of elements) {
        elem.classList.remove("hidden")
    }
}