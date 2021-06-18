let firstmatch= document.getElementsByClassName("grid-item")[0];
var checkBoxCurrent = document.getElementById("currentMatches");
var checkBoxEnded = document.getElementById("endedMatches");

function createMatchfield(match,matchdata){
    match.getElementsByClassName("player1")[0].innerHTML= matchdata.player1
    match.getElementsByClassName("player2")[0].innerHTML= matchdata.player2
    match.classList.remove("hide");
    match.dataset.id= matchdata.id;
}

function addListener(){
    let matches = document.getElementsByClassName("grid-item");
    for(let i=0; i< matches.length;i++){
        matches[i].addEventListener("click", event =>{
            localStorage.setItem("matchid",matches[i].dataset.id);
            window.location.replace("matchoverview.html");
        })
    }
}
function getAllMatches(url){
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            for(ele in data){
                if(ele==0){
                    createMatchfield(firstmatch,data[ele]);
                }else{
                    var newMatch = firstmatch.cloneNode(true);
                    createMatchfield(newMatch,data[ele]);
                    document.getElementsByClassName("grid-container")[0].appendChild(newMatch)
                }
            }
            addListener();
        })
}

function clearMatches(){
    let d = document.getElementById("uebericht")
    var last = d.lastElementChild;
    var first = d.firstElementChild;
    while (last != first) {
        last.remove();
        last = d.lastElementChild;
    }
    first.classList.add("hide");
}

getAllMatches("http://localhost:8080/match/all");

function filterCurrent(){
    clearMatches();
    if (checkBoxCurrent.checked == true){
        checkBoxEnded.checked=false;
        getAllMatches("http://localhost:8080/match/current");

    } else {
        getAllMatches("http://localhost:8080/match/all");
    }
}
function filterEnded(){
    clearMatches();
    if (checkBoxEnded.checked == true){
        checkBoxCurrent.checked=false;
        getAllMatches("http://localhost:8080/match/finished");

    } else {
        getAllMatches("http://localhost:8080/match/all");
    }
}





