import createElem from "./create-element";

function generateFinishedTest (currentQuestions, ourAnswers, block) {
    let countRightAnswers = 0;
    
    const ul = createElem(
        "ul",
        "contents__body_completed-test__list"
    );

    for (let i = 0; i < currentQuestions.length; i++) {
        if (ourAnswers[i] == currentQuestions[i].correct) {
            countRightAnswers++;
        }
        

        const li = createElem(
            "li",
            "contents__body_completed-test__list__item"
        );

        const question = createElem(
            "h3",
            "contents__body_completed-test__list__item__question",
            currentQuestions[i].question
        );
        const ourAnswer = createElem(
            "span",
            "contents__body_completed-test__list__item__our-answer",
            `Вы ответили: ${ourAnswers[i] === undefined ? "Не ответили" : ourAnswers[i]
            }`
        );
        const rightAnswer = createElem(
            "span",
            "contents__body_completed-test__list__item__right",
            `Правильный ответ: ${currentQuestions[i].correct}`
        );

        ul.append(li);
        li.append(question);
        li.append(rightAnswer);
        li.append(ourAnswer);
    }
    block.append(ul);


    return countRightAnswers
}

export default generateFinishedTest