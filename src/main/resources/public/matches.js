let firstmatch= document.getElementsByClassName("grid-item")[0];

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

fetch("http://localhost:8080/match/all")
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




