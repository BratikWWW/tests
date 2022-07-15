import "./styles/index.scss";
import { testData } from './js/data'
import {clearContent} from './js/clear-content'

document.addEventListener("DOMContentLoaded", () => {
    const sideBar = document.querySelector(".sidebar");
    const sideBarBtn = document.querySelector(".sidebar__header__hide-btn");
    const sideBarTitle = document.querySelector(".sidebar__header__title");
    const sideBarImgBurger = document.querySelector(
        ".sidebar__header__hide-btn__burger"
    );
    const sideBarImgArrow = document.querySelector(
        ".sidebar__header__hide-btn__arrow"
    );
    const testListBlock = document.querySelector(".sidebar__test-list");

    const descrTest = document.querySelector(".contents__body__descr-test");
    const descr = document.querySelector(".contents__descr");
    const cancelBtn = document.querySelector(".contents__body__cancel-btn");

    const contentsHeader = document.querySelector(".contents__header");
    const contentsHeaderTitle = document.querySelector(
        ".contents__header__title"
    );
    const contentsHeaderStartTest = document.querySelector(
        ".contents__header__start-test"
    );

    const startBtn = document.querySelector(".contents__body__start-btn");
    const notice = document.querySelector(".contents__notice");

    const contentTest = document.querySelector(".contents__body__question-list");
    const footerButton = document.querySelector(".contents__body__footer__btn");

    sideBarBtn.addEventListener("click", (e) => {
        testListBlock.classList.toggle("hidden");
        sideBarTitle.classList.toggle("hidden");
        sideBar.classList.toggle("width");
        sideBarImgBurger.classList.toggle("hidden");
        sideBarImgArrow.classList.toggle("hidden");
    });

    for (let key in testData) {
        const test = document.createElement("li");
        test.className = "sidebar__test-list__item";
        test.innerHTML = `${testData[key].name}`;
        testListBlock.append(test);
    }

    const testListItems = document.querySelectorAll(".sidebar__test-list__item");
    let currentTest = "";

    testListItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            testListItems.forEach((i) => i.classList.remove("active"));
            e.target.classList.add("active");
            currentTest = e.target.innerHTML;
            contentsHeader.classList.remove("hidden");
            startBtn.classList.remove("hidden");
            cancelBtn.classList.remove("hidden");
            notice.classList.add("hidden");
            descrTest.classList.remove("hidden");
            descr.classList.remove("hidden");

            testData.forEach((test) => {
                if (test.name == e.target.innerHTML) {
                    descr.innerHTML = test.descr;
                }
            });
        });
    });

    cancelBtn.addEventListener("click", () => {
        contentsHeader.classList.add("hidden");
        startBtn.classList.add("hidden");
        cancelBtn.classList.add("hidden");
        notice.classList.remove("hidden");
        descr.classList.add("hidden");
        testListItems.forEach((i) => i.classList.remove("active"));
    });

    let currentQuestions = "";
    let options = null
    let labels = null
    const nameTest = document.querySelector('.contents__header__start-test__title ')


    function startTest() {
        clearContent(contentTest)
        
        descrTest.classList.add("hidden");
        contentsHeaderTitle.classList.add("hidden");
        contentsHeaderStartTest.classList.remove("hidden");
        footerButton.classList.remove('hidden')
        nameTest.innerHTML = currentTest
        for (let key in testData) {
            if (testData[key].name == currentTest)
                currentQuestions = testData[key].questions;
        }
        let id = 0;
        let numberAnwser = 0;
        currentQuestions.forEach((question) => {
            const testItemTitle = document.createElement("h3");
            testItemTitle.classList.add("contents__body__question-list__item__title");
            testItemTitle.innerHTML = question.question;
            const testItem = document.createElement("li");
            const optionsBlock = document.createElement("div");
            optionsBlock.classList.add(
                "contents__body__question-list__item__options"
            );
            testItem.classList.add("contents__body__question-list__item");
            contentTest.append(testItem);
            testItem.append(testItemTitle);

            question.answers.forEach((answer) => {
                const label = document.createElement("label");
                label.classList.add(
                    "contents__body__question-list__item__options__label"
                );
                label.setAttribute("for", `answer${id}`);

                const radio = document.createElement("input");
                radio.id = `answer${id}`;
                radio.name = `answer${numberAnwser}`;
                radio.type = "radio";
                radio.classList.add(
                    "contents__body__question-list__item__options__input"
                );

                label.innerHTML = answer;
                radio.value = answer;
                optionsBlock.append(radio);
                optionsBlock.append(label);
                id += 1;
            });
            testItem.append(optionsBlock);
            numberAnwser += 1;
        });
        options = document.querySelectorAll(".contents__body__question-list__item__options__input");
        labels = document.querySelectorAll(".contents__body__question-list__item__options__label");
    }

    startBtn.addEventListener("click", startTest);


    const completedTestBodyAnswersList = document.querySelector('.contents__body_completed-test__answers-list')

    const completedTestBody = document.querySelector('.contents__body_completed-test')
    const rightAnswers = document.querySelector('.contents__body_completed-test__right-answers')
    const answersList = document.querySelector('.contents__body_completed-test__list')



    footerButton.addEventListener("click", (e) => {
        if (footerButton.innerHTML == 'Завершить') {

            contentsHeaderStartTest.classList.add("hidden");
            clearContent(contentTest)

            completedTestBody.classList.remove('hidden')

            let ourAnswers = []
            options.forEach(option => {
                if (option.checked) {
                    ourAnswers.push(option.value)
                }
            })
            let countRightAnswers = 0
            for (let i = 0; i < currentQuestions.length; i++) {
                if (ourAnswers[i] == currentQuestions[i].correct) {
                    countRightAnswers++
                }

                const li = document.createElement('li')
                const question = document.createElement('h3')
                const ourAnswer = document.createElement('span')
                const rightAnswer = document.createElement('span')

                li.classList.add('contents__body_completed-test__list__item')
                question.classList.add('contents__body_completed-test__list__item__question')
                ourAnswer.classList.add('contents__body_completed-test__list__item__our-answer')
                rightAnswer.classList.add('contents__body_completed-test__list__item__right')

                question.innerHTML = currentQuestions[i].question
                ourAnswer.innerHTML = `Вы ответили: ${ourAnswers[i] === undefined ? 'Не ответили' : ourAnswers[i]}`
                rightAnswer.innerHTML = `Правильный ответ: ${currentQuestions[i].correct}`
                
                answersList.append(li)
                li.append(question)
                li.append(rightAnswer)
                li.append(ourAnswer)
                completedTestBodyAnswersList.append(answersList)


            }
            rightAnswers.innerHTML = `Вы ответили на ${countRightAnswers} из ${currentQuestions.length} вопросов.`
            footerButton.innerHTML = 'Пройти ещё раз'
        } else {
            completedTestBody.classList.add('hidden')
            footerButton.innerHTML = 'Завершить'
            clearContent(answersList)
            startTest()
        }
        

    });



    const resetButton = document.querySelector('.contents__header__start-test__btn-reset')

    resetButton.addEventListener('click', () => {
        options.forEach(option => {
            option.checked = false
        })
    })

});
