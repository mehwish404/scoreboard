console.log("Hello World")
let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
test();
let buttons = document.getElementsByTagName("button");
console.log(buttons);
for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let player = 1;
    button.addEventListener("click", (event) => {
        // console.log(button.parentElement.parentElement.className);
        let parent = button.parentElement.parentElement;
        
        // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
        let setnumber = document.querySelector(".active").dataset.setnumber;

        console.log("Satz#", setnumber)

        let score1 = parent.parentElement.querySelector(".score1");
        let score2 = parent.parentElement.querySelector(".score2");


        if (parent.className.includes("left")) {
            player = 1;
        }
        else if (parent.className.includes("right")) {
            player = 2;
        }

        if (button.classList.contains("minus")) {
            minusscore(player, score1, score2,setnumber)
        } 
        
        if (button.classList.contains("plus")) {
            addscore(player, score1, score2,setnumber)
        }
    })
}

// Initiale Abfrage von Match 1 
function createMatch(player1, player2, courtNumber, score1, score2) {
    fetch("http://localhost:8080/match/1")
    .then(function (response) { return response.json(); })
    .then(function (data) {
        console.log(data)
        let match = data.id;
        score1.innerHTML = data.matchsets[0].score1;
        score2.innerHTML = data.matchsets[0].score2;
        name1.innerHTML = data.player1;
        name2.innerHTML = data.player2;
    })
}
 
createMatch();


function addscore(player, score1htmlelement, score2htmlelement,setnumber) {

    fetch("http://localhost:8080/match/1/"+setnumber+"/increase/" + player, {
        method: "POST"
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            score1htmlelement.innerHTML = data.score1;
            score2htmlelement.innerHTML = data.score2;
        })
}


function minusscore(player, scoreEle1, scoreEle2,setnumber) {

    fetch("http://localhost:8080/match/1/"+setnumber+"/decrease/" + player, {
        method: "POST"
    })
        .then(function (response) {
            console.log("response: ", response);
            const responseJson = response.json();
            console.log("responseJson: ", responseJson);
            return responseJson;
        })
        .then(function (data) {
            console.log(scoreEle1, scoreEle2)
            console.log("data: ", data);
            if (data) {

                scoreEle1.innerHTML = data.score1

                scoreEle2.innerHTML = data.score2
            }

        })
}
function test() {
    value = 0;
    fetch("http://localhost:8080/match/1/addSet", {
        method: "POST"
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            console.log(data)
        })
}


// Active Klasse der Sätze verschieben

let allSets = document.querySelectorAll(".set")

allSets.forEach(clickedSet => {
    clickedSet.addEventListener("click", (event) => {
        // entferne active von allen Element, die .set als CSS-Klasse haben
        allSets.forEach(s => s.classList.remove("active"))

        // danach füge active CSS-Klasse zum angeklickten Set hinzu
        clickedSet.classList.add("active")

        console.log(clickedSet);
    })
})