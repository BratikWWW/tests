import { testData } from './data'

const sideBarBtn = document.querySelector(".sidebar__header__hide-btn");
const testListBlock = document.querySelector(".sidebar__test-list");
const sideBarTitle = document.querySelector(".sidebar__header__title");
const sideBar = document.querySelector(".sidebar");
const sideBarImgBurger = document.querySelector(".sidebar__header__hide-btn__burger");
const sideBarImgArrow = document.querySelector(".sidebar__header__hide-btn__arrow");


for (let key in testData) {
    const test = document.createElement("li");
    test.className = "sidebar__test-list__item";
    test.innerHTML = `${testData[key].name}`;
    testListBlock.append(test);
}

sideBarBtn.addEventListener("click", (e) => {
    testListBlock.classList.toggle("hidden");
    sideBarTitle.classList.toggle("hidden");
    sideBar.classList.toggle("width");
    sideBarImgBurger.classList.toggle("hidden");
    sideBarImgArrow.classList.toggle("hidden");
});


