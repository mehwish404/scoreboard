package tennis.scoreboard.feld;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tennis.scoreboard.feld.exceptions.MatchApiException;
import tennis.scoreboard.feld.exceptions.MatchNotFoundException;

import java.util.List;

@RestController
public class MatchController {

    @Autowired
    MatchService matchService;

    @PostMapping ("/match")
    public Match addMatch(@RequestBody Match match){

        return matchService.createMatch(match.getPlayer1(), match.getPlayer2(),match.getCourt());


    }

    @GetMapping("/match/{id}")
    public Match getMatch(@PathVariable Long id){
        try {
            return matchService.getMatch(id);
        }catch(MatchNotFoundException ex) {
            throw new MatchApiException("Match doesnt exist");
        }

    }


    @GetMapping ("/match/all")
    public List<Match> getAll(){
        return matchService.getAll();

    }

}
