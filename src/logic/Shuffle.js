export function shuffle(arr) {
    let result = Array.apply(null, {length: 10});
    console.log(s(arr))   
}


function s(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}