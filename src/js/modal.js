const modal = document.getElementById("myModal");
const modalExitButton = document.querySelector(".modal-buttons__exit");
const modalCancelButton = document.querySelector(".modal-buttons__cancel");
const exitTestButton = document.querySelector('.contents__header__start-test__btn-exit')


exitTestButton.onclick = function() {
    modal.style.display = "block";
}

modalCancelButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

modalExitButton.onclick = () => {
    modal.style.display = "none";
    document.location.reload()

}




