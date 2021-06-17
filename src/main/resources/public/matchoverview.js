var matchid = localStorage.getItem("matchid");
let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
let court = document.getElementById("courtname");


fetch("http://localhost:8080/match/"+matchid)
    .then(function (response) { return response.json(); })
    .then(data =>{
        showMatch(data);
    })

function showMatch(matchdata){
    name1.innerHTML = matchdata.player1;
    name2.innerHTML = matchdata.player2;
    court.innerHTML = matchdata.court;

    for(match in matchdata.matchsets){
        console.log(match)
        console.log(matchdata.matchsets[match])
        let matchset = document.getElementsByClassName("set")[match];
        matchset.classList.remove("hide");
        var score1 = matchset.querySelector(".score1");
        var score2 = matchset.querySelector(".score2");
        score1.innerHTML= matchdata.matchsets[match].score1;
        score2.innerHTML=matchdata.matchsets[match].score2;
    }
}


