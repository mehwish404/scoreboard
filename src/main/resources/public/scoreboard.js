//matchdata Element
let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
let court = document.getElementById("courtname");
let allSets = document.querySelectorAll(".set")

//buttons to change matchdata
let addButton = document.getElementById("addSet")
let buttons = document.getElementsByTagName("button");
let endButton = document.getElementById("endMatch");

//matchid
var matchid = localStorage.getItem("matchid");


function getmatch(){
    fetch("http://localhost:8080/match/"+matchid)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            name1.innerHTML = data.player1;
            name2.innerHTML = data.player2;
            court.innerHTML = data.court;
        })
}

function openSet(setnumber){
    allSets.forEach(s => s.classList.remove("active"))
    let set =document.getElementsByClassName("set")[setnumber -1];
    set.classList.remove("hide");
    set.classList.add("active")
}

function changeSetScore(setnumber, homescore, awayscore) {
    let set = document.querySelectorAll(".set")[setnumber -1]

    set.querySelector(".score1").innerHTML = homescore
    set.querySelector(".score2").innerHTML = awayscore
}

function changeScore(increase,player, score1htmlelement, score2htmlelement,setnumber) {
    let action = (increase==true)?"increase":"decrease";
    fetch("http://localhost:8080/match/"+matchid+"/"+setnumber+"/" + action +"/" + player, {
        method: "POST"
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            changeSetScore(setnumber,data.score1,data.score2);
        })
}

getmatch();


endButton.addEventListener( "click",  (event) =>  {
    allSets.forEach(s => s.classList.remove("active"))
    fetch("http://localhost:8080/match/"+matchid+"/finish",{
        method: "POST"
    })
    addButton.remove();
    endButton.remove();
})

addButton.addEventListener("click",  (event) =>  {

    fetch("http://localhost:8080/match/"+matchid+"/addSet",{
        method:"POST"
    })
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            changeSetScore(data.setnumber,data.score1,data.score2)
            openSet(data.setnumber);
            if(data.setnumber === 3){
                addButton.remove();
            }
        })
        .catch(error => alert(error.message))
});


allSets.forEach(clickedSet => {
    clickedSet.addEventListener("click",(event)=>{
        openSet(clickedSet.dataset.setnumber);
    });
})

for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", (event) => {
        let parent = button.parentElement.parentElement;

        // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
        let setnumber = document.querySelector(".active").dataset.setnumber;

        console.log("Satz#", setnumber)

        let score1 = parent.parentElement.querySelector(".score1");
        let score2 = parent.parentElement.querySelector(".score2");

        let player = (parent.className.includes("left"))?1:2;
        if (button.classList.contains("minus")) {
            changeScore(false,player, score1, score2,setnumber)
        }
        if (button.classList.contains("plus")) {
            changeScore(true,player, score1, score2,setnumber)
        }

    })
}



