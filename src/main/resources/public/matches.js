let match= document.getElementsByClassName("set")[0];


function getmatches(){
    fetch("http://localhost:8080/match/all")
        .then(function (response) { return response.json(); })
        .then(function (data) {
            for(ele in data){
                if(ele==0){
                    match.getElementsByClassName("name1")[0].innerHTML= data[ele].player1
                    match.getElementsByClassName("name2")[0].innerHTML= data[ele].player2
                    match.classList.remove("hide");
                    match.dataset.id= data[ele].id;
                    match.style.transform = "rotate(90deg)";

                }else{
                    var newMatch = match.cloneNode(true);
                    newMatch.getElementsByClassName("name1")[0].innerHTML= data[ele].player1
                    newMatch.getElementsByClassName("name2")[0].innerHTML= data[ele].player2
                    newMatch.dataset.id= data[ele].id;
                    console.log(newMatch)
                    document.getElementsByClassName("grid-container")[0].appendChild(newMatch)
                }

            }

            let matches = document.getElementsByClassName("grid-item");
            for(let i=0; i< matches.length;i++){
                matches[i].addEventListener("click", event =>{
                    console.log(matches[i].dataset.id)
                    localStorage.setItem("matchid",matches[i].dataset.id);
                    window.open("matchoverview.html")
                })

            }
        })
}

getmatches();

