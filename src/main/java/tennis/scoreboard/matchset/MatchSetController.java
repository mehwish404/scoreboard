package tennis.scoreboard.matchset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import tennis.scoreboard.feld.Match;
import tennis.scoreboard.feld.MatchService;
import tennis.scoreboard.feld.exceptions.MatchNotFoundException;
import tennis.scoreboard.matchset.exceptions.MatchSetApiException;
import tennis.scoreboard.matchset.exceptions.MatchSetLimitCrossExceptions;
import tennis.scoreboard.matchset.exceptions.MatchSetNotFoundException;

import java.util.List;

@RestController
public class MatchSetController {
    @Autowired
    MatchSetService matchSetService;

    @Autowired
    MatchService matchService;

    @PostMapping("/match/{matchid}/addSet")
    public MatchSet createMatchSet(@PathVariable long matchid) throws MatchSetLimitCrossExceptions {
        try {
            Match match = matchService.getMatch(matchid);
            return matchSetService.createMatchSet(match);
        }catch(MatchSetLimitCrossExceptions ex) {
            throw new MatchSetApiException("MatchSet cant be added to match");
        } catch(MatchNotFoundException ex) {
            throw new MatchSetApiException("Match not found");
        }

    }



    @PostMapping("/match/{matchid}/{setnumber}/increase/{player}")
    public MatchSet increaseScore(@PathVariable long matchid,@PathVariable int setnumber,@PathVariable int player ) throws MatchSetNotFoundException {
        try {
            Match match = matchService.getMatch(matchid);
            MatchSet matchset= matchSetService.getMatchSetByMatch(match,setnumber);
            return matchSetService.increaseScore(matchset.getId(),player);
        }catch (MatchSetNotFoundException ex){
            throw new MatchSetApiException("MatchSet cant be found");
        }catch(MatchNotFoundException ex) {
            throw new MatchSetApiException("Match not found");
        }


    }

    @PostMapping("/match/{matchid}/{setnumber}/decrease/{player}")
    public MatchSet decreaseScore(@PathVariable long matchid,@PathVariable int setnumber,@PathVariable int player ) throws MatchSetNotFoundException {
        try {
            Match match = matchService.getMatch(matchid);
            MatchSet matchset= matchSetService.getMatchSetByMatch(match,setnumber);
            return matchSetService.decreaseScore(matchset.getId(),player);
        }catch (MatchSetNotFoundException ex){
            throw new MatchSetApiException("MatchSet cant be found");
        }catch(MatchNotFoundException ex) {
            throw new MatchSetApiException("Match not found");
        }


    }

}
