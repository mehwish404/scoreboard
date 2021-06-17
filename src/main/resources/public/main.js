let formsubmit = document.getElementsByTagName("button").item(0)
var forminputs = document.getElementsByClassName("input-field");

//creates Match and returns id of created match
async function getId() {
    const matchdata = { court: forminputs[0].value, player1:forminputs[1].value,player2:forminputs[2].value };
    let response = await fetch("http://localhost:8080/match",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchdata)
    });
    let data = await response.json()
    return data.id;
}


formsubmit.addEventListener("click", async (event) =>  {
    let matchid = await getId();
    localStorage.setItem("matchid",matchid);
});





