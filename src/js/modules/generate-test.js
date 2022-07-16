import createElem from "./create-element";

function generateTest (questions, block) {
    let id = 0;
    let numberAnwser = 0;

    questions.forEach((question) => {
        const testItemTitle = createElem("h3", "contents__body__question-list__item__title", question.question);
        const testItem = createElem("li", "contents__body__question-list__item", );
        const optionsBlock = createElem("div", "contents__body__question-list__item__options");
        
        block.append(testItem);
        testItem.append(testItemTitle);

        question.answers.forEach((answer) => {
            const label = createElem("label", "contents__body__question-list__item__options__label", answer);
            label.setAttribute("for", `answer${id}`);

            const radio = createElem("input", "contents__body__question-list__item__options__input");
            radio.id = `answer${id}`;
            radio.name = `answer${numberAnwser}`;
            radio.type = "radio";
            radio.value = answer;
            
            optionsBlock.append(radio);
            optionsBlock.append(label);
            id ++;
        });
        testItem.append(optionsBlock);
        numberAnwser ++;
    });
}

export default generateTest