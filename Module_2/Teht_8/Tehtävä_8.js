function concat(array1) {
    let result = "";
    for (let i = 0; i < array1.length; i++) {
        result += array1[i];
    }
    return result;
}

const array1 = ["Jere", "on", "kiva", "poika"];
document.getElementById("target").textContent = concat(array1);