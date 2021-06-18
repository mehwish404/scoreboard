var forminputs = document.getElementsByClassName("input-field");
let form = document.getElementById("matchform");

 function getmatchid(matchdata){
    return fetch("http://localhost:8080/match",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchdata)
    })
        .then(response => {return response.json()})
        .then(data =>{
            return data.id
        });
}

form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const matchdata = { court: forminputs[0].value, player1:forminputs[1].value,player2:forminputs[2].value };
    let matchid = await getmatchid(matchdata);

    localStorage.setItem("matchid",matchid);
    window.location.replace("scoreboard.html")
});





