let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
let court = document.getElementById("courtname");
var matchid = localStorage.getItem("matchid");
let button = document.getElementsByClassName("myButton")[0];
let buttons = document.getElementsByTagName("button");

function getmatch(){
    fetch("http://localhost:8080/match/"+matchid)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            name1.innerHTML = data.player1;
            name2.innerHTML = data.player2;
            court.innerHTML = data.court;
        })
}

getmatch();

let allSets = document.querySelectorAll(".set")
button.addEventListener("click",  (event) =>  {

    fetch("http://localhost:8080/match/"+matchid+"/addSet",{
        method:"POST"
    })
        .then(function (response) {
            if(response.ok){
                return response.json();
            }
            return response.text().then(text => {throw new Error(text)})
             })
        .then(function (data) {
            allSets.forEach(s => s.classList.remove("active"))
           let parent =document.getElementsByClassName("set")[data.setnumber -1];
           parent.classList.remove("hide");
           parent.classList.add("active")
            let score1 = parent.querySelector(".score1");
            let score2 = parent.querySelector(".score2");
            score1.innerHTML = data.score1;
            score2.innerHTML = data.score2;
            if(data.setnumber == 3){
                button.remove();
            }
        })
        .catch(error => alert(error.message))
});
allSets.forEach(clickedSet => {
    clickedSet.addEventListener("click", (event) => {
        // entferne active von allen Element, die .set als CSS-Klasse haben
        allSets.forEach(s => s.classList.remove("active"))

        // danach füge active CSS-Klasse zum angeklickten Set hinzu
        clickedSet.classList.add("active")

        console.log(clickedSet);
    })
})
for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let player = 1;
    button.addEventListener("click", (event) => {
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
function addscore(player, score1htmlelement, score2htmlelement,setnumber) {

    fetch("http://localhost:8080/match/"+matchid+"/"+setnumber+"/increase/" + player, {
        method: "POST"
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            score1htmlelement.innerHTML = data.score1;
            score2htmlelement.innerHTML = data.score2;
        })
}


function minusscore(player, scoreEle1, scoreEle2,setnumber) {

    fetch("http://localhost:8080/match/"+matchid+"/"+setnumber+"/decrease/" + player, {
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
