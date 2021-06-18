package tennis.scoreboard.match;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tennis.scoreboard.match.exceptions.MatchNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

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
    /**
     *
     */
    public List<Match> getCurrent() {
        return matchRepository.findAll().stream().filter(c -> c.isFinished() == false).collect(Collectors.toList());
    }
    /**
     *
     */
    public List<Match> getFinished() {
        return matchRepository.findAll().stream().filter(c -> c.isFinished()).collect(Collectors.toList());
    }

    public void finishMatch(Long id) throws MatchNotFoundException{
        Match m = matchRepository.findById(id);
        if(m!= null) {
            m.setFinished(true);
            matchRepository.save(m);
        }else {
            throw new MatchNotFoundException();
        }

    }


}
