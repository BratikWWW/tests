import "./styles/index.scss";
import { testData } from "./js/data";
import { clearContent } from "./js/modules/clear-content";
import { showElements, hideElements } from "./js/modules/element-visibility";
import {openModal, closeModal} from "./js/modules/modal";
import removeActive from "./js/modules/remove-active"
import generateTest from "./js/modules/generate-test";
import generateFinishedTest from './js/modules/generate-finished-test'
import resetTest from "./js/modules/reset-test";

document.addEventListener("DOMContentLoaded", () => {
    const testListBlock = document.querySelector(".sidebar__test-list");

    const descrTest = document.querySelector(".contents__body__descr-test");
    const descr = document.querySelector(".contents__descr");
    const startBtn = document.querySelector(".contents__body__start-btn");
    const cancelBtn = document.querySelector(".contents__body__cancel-btn");

    const contentsHeader = document.querySelector(".contents__header");
    const contentsHeaderTitle = document.querySelector(".contents__header__title");
    const contentsHeaderStartTest = document.querySelector(".contents__header__start-test");
    const nameTest = document.querySelector(".contents__header__start-test__title ");

    const notice = document.querySelector(".contents__notice");

    const contentTest = document.querySelector(".contents__body__question-list");
    const footerButton = document.querySelector(".contents__body__footer__btn");

    const completedTestBodyAnswersList = document.querySelector(".contents__body_completed-test__answers-list");
    const completedTestBody = document.querySelector(".contents__body_completed-test");
    const rightAnswers = document.querySelector(".contents__body_completed-test__right-answers");

    const resetButton = document.querySelector(".contents__header__start-test__btn-reset");

    const modal = document.getElementById("myModal");
    const modalExitButton = document.querySelector(".modal-buttons__exit");
    const modalCancelButton = document.querySelector(".modal-buttons__cancel");
    const exitTestButton = document.querySelector('.contents__header__start-test__btn-exit')

    
    let currentTest = "";
    let testState = null

    testListBlock.onclick = function (event) {
        let target = event.target;
        if (target.tagName != "LI") return;

        if(testState != null){
            openModal(modal)
        }else {
            removeActive(testListBlock.childNodes);
            target.classList.add("active");
            currentTest = target.innerHTML;
            
            showElements(contentsHeader, descrTest)
            hideElements(notice)
    
            testData.forEach((test) => {
                if (test.name == target.innerHTML) {
                    descr.innerHTML = test.descr;
                }
            });    
        }

    };

    cancelBtn.addEventListener("click", () => {
        showElements(notice)
        hideElements(contentsHeader, descrTest)
        removeActive(testListBlock.childNodes);
    });


    let currentQuestions = null;
    let options = null;
    
    function startTest() {
        testState = true
        nameTest.innerHTML = currentTest;

        clearContent(contentTest);
        showElements(contentsHeaderStartTest, footerButton)
        hideElements(contentsHeaderTitle, descrTest)
        
        for (let key in testData) {
            if (testData[key].name == currentTest)
                currentQuestions = testData[key].questions;
        }

        generateTest(currentQuestions, contentTest)

        options = document.querySelectorAll(".contents__body__question-list__item__options__input");
    }

    startBtn.addEventListener("click", startTest);

    footerButton.addEventListener("click", (e) => {
        testState = true
        if (footerButton.innerHTML == "Завершить") {
            contentsHeaderStartTest.classList.add("hidden");
            clearContent(contentTest);
            completedTestBody.classList.remove("hidden");

            let ourAnswers = [];

            options.forEach((option) => {
                if (option.checked) {
                    ourAnswers.push(option.value);
                }
            });

            let countRightAnswers = generateFinishedTest(currentQuestions, ourAnswers, completedTestBodyAnswersList);
            rightAnswers.innerHTML = `Вы ответили на ${countRightAnswers} из ${currentQuestions.length} вопросов.`;
            footerButton.innerHTML = "Пройти ещё раз";

        } else {
            completedTestBody.classList.add("hidden");
            footerButton.innerHTML = "Завершить";
            clearContent(completedTestBodyAnswersList.lastChild);
            startTest();
        }
    });

    resetButton.addEventListener("click", () => resetTest(options));
    
    exitTestButton.onclick = () => {
        openModal(modal)
    }

    modalExitButton.onclick = () => {
        closeModal(modal)
        document.location.reload()
    }

    modalCancelButton.onclick = () => {
        closeModal(modal)
    }
});
