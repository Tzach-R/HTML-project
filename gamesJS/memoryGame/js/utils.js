export function random(min, max) {
    const diff = max - min;
    return min + Math.round(Math.random() * diff);
}

export function capitalize(text) {
    const firstLetter = text.charAt(0).toUpperCase();
    const rest = text.substring(1);
    return firstLetter + rest;
}

export function shuffle(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let r = random(i + 1, arr.length - 1);
        let temp = arr[i]; //temp =  😀
        arr[i] = arr[r]; //put 🍊 instead of 😀
        arr[r] = temp; //put 😀 instad of 🍊
    }

    return arr;
}
export const utils = { random, capitalize };