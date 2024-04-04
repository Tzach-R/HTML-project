const letterContainer = document.getElementById("letterContainer");
const categoriesContainer = document.getElementById("categoriesContainer");
const userInputSection = document.getElementById("userInputSection");
const newGameContainer = document.getElementById("newGameContainer");
const newGameBtn = document.getElementById("newGameBtn");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("resultText");

//Categories
let categories = {
    Fruits: ['Apple', 'Blueberry', 'Mandarin', 'Pineapple', 'Pomegranate', 'Watermelon', 'Avocado', 'Blueberry', 'Blackcurrant', 'Cranberry', 'Cantaloupe', 'Cherry', 'Dates', 'Fig', 'Coconut', 'Grapes', 'Dragonfruit', 'Durian', 'Kiwi', 'Lime', 'Lychee', 'Mango', 'Pear', 'Tangerine ', 'Pineapple', 'Strawberry', 'Mangosteen', 'Nectarine', 'Raspberry', 'Quince', 'Olive', 'Orange', 'Guava', 'Clementine ', 'Melon', 'Papaya', 'Peach', 'Banana'],
    Animals: ['Dog', 'Cow', 'Cat', 'Horse', 'Donkey', 'Tiger', 'Lion', 'Panther', 'Leopard', 'Cheetah', 'Bear', 'Elephant', 'Polarbear', 'Turtle', 'Tortoise', 'Crocodile', 'Rabbit', 'Porcupine', 'Hare', 'Hen', 'Pigeon', 'Albatross', 'Crow', 'Fish', 'Dolphin', 'Frog', 'Whale', 'Alligator', 'Eagle', 'squirrel', 'Ostrich', 'Fox', 'Goat', 'Jackal', 'Emu', 'Armadillo', 'Eel', 'Goose', 'fox', 'Wolf', 'Beagle', 'Gorilla', 'Chimpanzee', 'Monkey', 'Beaver', 'Orangutan', 'Antelope', 'Bat', 'Badger', 'Giraffe', 'Crab', 'Panda', 'Hamster', 'Cobra', 'Dragon', 'Camel', 'Hawk', 'Deer', 'Chameleon', 'Hippopotamus', 'Jaguar', 'Chihuahua', 'Cobra', 'Lizard', 'Koala', 'Kangaroo', 'Iguana', 'Llama', 'Chinchillas', 'Dodo', 'Jellyfish', 'Rhinoceros', 'Hedgehog', 'Zebra', 'Possum', 'Wombat', 'Bison', 'Bull', 'Buffalo', 'Sheep', 'Meerkat', 'Mouse', 'Otter', 'Sloth', 'Owl', 'Vulture', 'Flamingo', 'Racoon', 'Mole', 'Duck', 'Swan', 'Lynx', 'Elk', 'Lemur', 'Mule', 'Baboon', 'Mammoth', 'Whale', 'Rat', 'Snake', 'Peacock',],
    Countries: ['India', 'Hungary', 'Kyrgyzstan', 'Switzerland', 'Zimbabwe', 'Liechtenstein', 'Czechia', 'Belgium', 'Greece', 'Spain', 'France', 'Israel', 'United Kingdom', 'United States', 'Djibouti', 'Serbia', 'Ethiopia', 'Mexico', 'Netherlands', 'Slovakia', 'Argentina', 'Croatia', 'Italy'],
    Colors: ['Red', 'Violet', 'Blue', 'Green', 'Indigo', 'Orange', 'Yellow', 'White', 'Pink', 'Brown', 'Aqua', 'Black', 'Cyan', 'Purple', 'Teal', 'Magenta', 'Beige', 'Emerald', 'Gray', 'Crimson'],
};

//counter
let winCount = 0;
let count = 0;

let chosenWord = "";

//Show buttons
const displayCategories = () => {
    categoriesContainer.innerHTML += `<h1>Please Select A Category</h1>`;
    let buttonCon = document.createElement("div");
    for (let value in categories) {
        buttonCon.innerHTML += `<button class="categories" onclick="generateWord('${value}')">${value}</button>`;
    }
    categoriesContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
    let categoriesButtons = document.querySelectorAll(".categories");
    let letterButtons = document.querySelectorAll(".letters");
    //disable all categories
    categoriesButtons.forEach((button) => {
        button.disabled = true;
    });

    //disable all letters
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
    let categoriesButtons = document.querySelectorAll(".categories");
    //Highlight chosen button
    categoriesButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    //hide letters, clear previous word
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = categories[optionValue];
    //Random word
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

    //Display each element as span
    userInputSection.innerHTML = displayItem;
};

const initializer = () => {
    winCount = 0;
    count = 0;

    //Initial clear new game
    userInputSection.innerHTML = "";
    categoriesContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    //Letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            //if array - clciked -> value replace the matched dash with letter else draw on canvas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    //if character in array is same as clicked button
                    if (char === button.innerText) {
                        //replace dash with letter
                        dashes[index].innerText = char;
                        //increment counter
                        winCount += 1;
                        //if winCount equals word lenfth
                        if (winCount == charArray.length) {
                            resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                            //block all buttons
                            blocker();
                        }
                    }
                });
            } else {
                //lose counter
                count += 1;
                //for drawing man
                drawMan(count);
                if (count == 6) {
                    resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            //disable clicked button
            button.disabled = true;
        });
        letterContainer.append(button);
    }

    displayCategories();
    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let {
        initialDrawing
    } = canvasCreator();
    //initialDrawing for the frame
    initialDrawing();
};

//Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    //Drawing the man
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame
    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //bottom line
        drawLine(10, 130, 130, 130);
        //left line
        drawLine(10, 10, 10, 131);
        //top line
        drawLine(10, 10, 70, 10);
        //small top line
        drawLine(70, 10, 70, 20);
    };

    return {
        initialDrawing,
        head,
        body,
        leftArm,
        rightArm,
        leftLeg,
        rightLeg
    };
};

//draw the man
const drawMan = (count) => {
    let {
        head,
        body,
        leftArm,
        rightArm,
        leftLeg,
        rightLeg
    } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};

//New Game
newGameBtn.addEventListener("click", initializer);
window.onload = initializer;