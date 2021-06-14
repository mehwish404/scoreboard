package tennis.scoreboard.match;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tennis.scoreboard.match.exceptions.MatchNotFoundException;
import java.util.List;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;
    /**
     *
     */
    public Match createMatch(String player1, String player2,String court){

        Match match = new Match(player1,player2,court);
        return matchRepository.save(match);
    }
    /**
     *
     */
    public Match getMatch(Long id) throws MatchNotFoundException {
        Match match = matchRepository.findById(id);
        if(match != null) {
            return match;
        }
        throw new MatchNotFoundException();
    }

    /**
     *
     */
    public List<Match> getAll() {
        return matchRepository.findAll();
    }


}
