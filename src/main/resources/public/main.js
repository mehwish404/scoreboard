console.log("Hello World")
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
fetch("http://localhost:8080/match/1")
    .then(function(response) {return response.json();})
    .then(function(data) {
        console.log(data)
        let match = data.id;
        score1.innerHTML = data.matchsets[0].score1;
        score2.innerHTML = data.matchsets[0].score2;
    })

document.getElementById("score1plus").addEventListener("click",(event) =>{
    addscore(1);
})
document.getElementById("score2plus").addEventListener("click",(event) =>{
    addscore(2);
})

document.getElementById("score1minus").addEventListener("click",(event) =>{
    minusscore(1);
})
document.getElementById("score2minus").addEventListener("click",(event) =>{
    minusscore(2);
})

function addscore(player){
    value=0;
    fetch("http://localhost:8080/match/1/1/increase/"+player, {
        method:"POST"
    })
        .then(function(response) {return response.json();})
        .then(function(data) {
            if(player ===1){
                score1.innerHTML = data.score1
            }else{
                score2.innerHTML = data.score2
            }
        })
}
function minusscore(player){
    value=0;
    fetch("http://localhost:8080/match/1/1/decrease/"+player, {
        method:"POST"
    })
        .then(function(response) {return response.json();})
        .then(function(data) {
            if(player ===1){
                score1.innerHTML = data.score1
            }else{
                score2.innerHTML = data.score2
            }
        })
}
