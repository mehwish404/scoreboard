package tennis.scoreboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import tennis.scoreboard.match.Match;
import tennis.scoreboard.match.MatchRepository;
import tennis.scoreboard.match.MatchService;
import tennis.scoreboard.matchset.MatchSetRepository;
import tennis.scoreboard.matchset.MatchSetService;

@Component
public class DataLoader {

    //private Match match1 = new Match("Home","Away","Test");
    @Autowired
    MatchSetService matchSetService;
    @Autowired
    MatchService matchService;

    @Autowired
    MatchRepository matchRepository;

    @Autowired
    MatchSetRepository matchSetRepository;

    @Autowired
    public DataLoader(MatchSetService matchSetService, MatchService matchService){
        this.matchService = matchService;
        this.matchSetService= matchSetService;
        loadMatch();
    }

    private void loadMatch(){
        Match match = matchService.createMatch("Home","Away","Test");
        matchSetService.createMatchSet(match);

    }

}
