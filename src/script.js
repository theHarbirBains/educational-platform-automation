// Get all question containers from the page.
// These contain text-input style Zybooks questions.
let divQuestionContainers = document.getElementsByClassName("question-container");

// Get all animation control sections from the page.
// These control interactive animations.
let divAnimationControls = document.getElementsByClassName("animation-controls");

// Get all multiple-choice question sections from the page.
let divQuestionChoices = document.getElementsByClassName("question-choices");

// Helper function used to navigate deeply nested HTML elements.
// "div" is the starting element.
// "indices" is an array of child indexes to follow.
function descendChildren(div, indices) {

```
// Start at the parent element passed into the function.
let divCurrent = div;

// Loop through every index in the indices array.
for (const index of indices) {

    // Move deeper into the child hierarchy.
    divCurrent = divCurrent.children[index];
}

// Return the final nested child element.
return divCurrent;
```

}

// These functions prepare and automate Zybooks interactions.

// Reveals all hidden text answers.
function revealTextAnswers() {

```
// Loop through every question container.
for (const divQuestionContainer of divQuestionContainers) {

    // Navigate to the "Show answer" button using child indexes.
    let divShowAnswer = descendChildren(divQuestionContainer, [0, 1, 1]);

    // Click once to reveal the answer.
    divShowAnswer.click();

    // Click again because Zybooks sometimes requires double interaction.
    divShowAnswer.click();
}
```

}

// Automatically fills in text answers.
function completeTextAnswers() {

```
// Loop through every question container.
for (const divQuestionContainer of divQuestionContainers) {

    // Move upward to access the answer display area.
    let divParentElement = divQuestionContainer.parentElement.parentElement;

    // Navigate to the actual displayed answer text.
    let divAnswerDisplay = descendChildren(divParentElement, [1, 1, 0]);

    // Extract and clean the answer text.
    // Remove leading/trailing whitespace and add "_" to trigger Zybooks validation.
    let answer = `${divAnswerDisplay.textContent.replace(/(^\s*)|(\s*$)/g, "")}_`;

    // Navigate to the container holding the text boxes.
    let divTextBoxParent = descendChildren(divQuestionContainer, [0, 0, 0]);

    // Create placeholder variable for text box.
    let divTextBox = "_"

    // Loop through all child elements inside the textbox parent.
    for (const divTextBox of divTextBoxParent.children) {

        // Check whether the element is a textarea input.
        if (divTextBox.nodeName == "TEXTAREA") {

            // Fill the textbox with the discovered answer.
            divTextBox.value = answer;

            // Stop after filling the first valid textarea.
            break;
        }
    }
}
```

}

// Enables 2x playback speed for animations.
function enable2Speed() {

```
// Loop through every animation controller.
for (const divAnimationControl of divAnimationControls) {

    // Navigate to the 2x speed button.
    let divSpeedButton = descendChildren(divAnimationControl, [1, 0, 0]);

    // Click the speed button.
    divSpeedButton.click();
}
```

}

// Starts all animations automatically.
function beginAnimations() {

```
// Loop through every animation controller.
for (const divAnimationControl of divAnimationControls) {

    // Navigate to the "Start animation" button.
    let divAnimationButton = descendChildren(divAnimationControl, [0]);

    // Start the animation.
    divAnimationButton.click();
}
```

}

// Continuously presses play buttons if animations become paused.
function clickPlayButtons() {

```
// Loop through every animation controller.
for (const divAnimationControl of divAnimationControls) {

    // Get all child elements inside the animation controller.
    let checkpointList = divAnimationControl.children;

    // Store matching play button elements here.
    let playButtonDivs = [];

    // Loop through all children in the animation controller.
    for (const divCheckpoint of checkpointList) {

        // Check whether the child matches the play button class.
        if (divCheckpoint.className == "zb-button  grey             normalize-controls") {

            // Add valid play buttons to the array.
            playButtonDivs.push(divCheckpoint);
        }
    }

    // Grab the final play button in the list.
    let playButtonDiv = playButtonDivs[playButtonDivs.length - 1];

    // Read the play button's aria-label attribute.
    let playButtonAttribute = playButtonDiv.getAttribute("aria-label");

    // Check whether the animation is currently paused.
    if (playButtonAttribute == "Play") {

        // If paused, click the button to resume playback.
        playButtonDiv.click();
    }
}
```

}

// Automatically selects multiple-choice answers by index.
function clickQuestionChoices(atIndex) {

```
// Loop through every multiple-choice question.
for (const divQuestionChoice of divQuestionChoices) {

    // Get all answer options for the current question.
    let divOptions = divQuestionChoice.children;

    // Optional debug logging.
    //console.log(divOptions[atIndex]);

    try {

        // Attempt to click the selected answer option.
        divOptions[atIndex].children[0].click();
    }

    catch(err) {

        // Ignore errors if the option does not exist.
    }
}
```

}

// =========================
// TEXT INPUT SOLVER
// =========================

// Reveal all hidden answers first.
revealTextAnswers();

// Wait 1 second, then fill text answers automatically.
const fillTextAnswers = setTimeout(completeTextAnswers, 1000);

// =========================
// ANIMATION SOLVER
// =========================

// Enable 2x speed for all animations.
enable2Speed();

// Wait 600ms, then begin animations.
const clickBeginAnimationButton = setTimeout(beginAnimations, 600);

// Every second, check for paused animations and press play.
const clickPlayButton = setInterval(clickPlayButtons, 1000);

// =========================
// MULTIPLE CHOICE SOLVER
// =========================

// Sequentially attempt clicking different answer indexes.
// Delays help avoid timing conflicts with page rendering.

const clickOption0 = setTimeout(() => {clickQuestionChoices(0)}, 0*500);

const clickOption1 = setTimeout(() => {clickQuestionChoices(1)}, 1*500);

const clickOption2 = setTimeout(() => {clickQuestionChoices(2)}, 2*500);

const clickOption3 = setTimeout(() => {clickQuestionChoices(3)}, 3*500);

const clickOption4 = setTimeout(() => {clickQuestionChoices(4)}, 4*500);

const clickOption5 = setTimeout(() => {clickQuestionChoices(5)}, 5*500);

const clickOption6 = setTimeout(() => {clickQuestionChoices(6)}, 6*500);

const clickOption7 = setTimeout(() => {clickQuestionChoices(7)}, 7*500);

