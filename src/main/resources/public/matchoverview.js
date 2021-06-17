var matchid = localStorage.getItem("matchid");
let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
let court = document.getElementById("courtname");
function getmatch(){
    fetch("http://localhost:8080/match/"+matchid)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            name1.innerHTML = data.player1;
            name2.innerHTML = data.player2;
            court.innerHTML = data.court;
            let matchsets = data.matchsets;
            for(let i=0; i<matchsets.length;i++){
                let sets = document.getElementsByClassName("set");

                for(let j= 0; j<sets.length;j++){
                    if(sets[j].dataset.setnumber== (i+1)){
                        sets[j].classList.remove("hide");
                        let score1 = sets[j].querySelector(".score1");
                        let score2 = sets[j].querySelector(".score2");
                        console.log(matchsets[i].score1)
                        console.log(matchsets[i].score2)
                        score1.innerHtml = matchsets[i].score1;
                        score2.innerHtml = matchsets[i].score2;
                        console.log(score1);
                        console.log(score2);
                    }
                }
            }
        })
}
document.addEventListener("DOMContentLoaded", function(event) {
    getmatch();
});
