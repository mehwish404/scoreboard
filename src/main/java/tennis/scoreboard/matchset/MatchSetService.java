package tennis.scoreboard.matchset;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tennis.scoreboard.match.Match;
import tennis.scoreboard.match.MatchRepository;
import tennis.scoreboard.matchset.exceptions.MatchSetLimitCrossExceptions;
import tennis.scoreboard.matchset.exceptions.MatchSetNotFoundException;

import java.util.List;

@Service
public class MatchSetService {

    @Autowired
    MatchSetRepository matchSetRepository;
    @Autowired
    MatchRepository matchRepository;
    Logger logger = LoggerFactory.getLogger(MatchSetService.class);

    /**
     *
     */
    public MatchSet createMatchSet(Match match) throws MatchSetLimitCrossExceptions {
        List<MatchSet> matchesets = matchSetRepository.findByMatch(match);
        int setnumber = matchesets.size() + 1;
        if ((setnumber == 3 && matchesets.get(1).getScore1() == matchesets.get(1).getScore2()) || setnumber < 3) {
            logger.warn("am anfang " + match.getMatchsets().size());
            MatchSet matchSet = matchSetRepository.save(new MatchSet(match, setnumber));
            match.getMatchsets().add(matchSet);
            matchRepository.save(match);
            return matchSet;
        }
        throw new MatchSetLimitCrossExceptions();

    }

    /**
     *
     */
    public MatchSet getMatchSetByMatch(Match match, int setnumber) throws MatchSetNotFoundException {
        List<MatchSet> matchesets = matchSetRepository.findByMatch(match);
        if (matchesets == null || matchesets.size() < setnumber) {
            throw new MatchSetNotFoundException();
        }
        return matchesets.get(setnumber - 1);

    }

    /**
     *
     */
    public MatchSet getMatchSetByMatchSetid(long matchSetid) throws MatchSetNotFoundException {
        MatchSet matchset = matchSetRepository.findById(matchSetid);
        if (matchset == null) {
            throw new MatchSetNotFoundException();
        }
        return matchset;
    }

    /**
     *
     */
    public MatchSet increaseScore(long matchSetid, int player) throws MatchSetNotFoundException {
        MatchSet matchset = matchSetRepository.findById(matchSetid);
        if (matchset == null) {
            throw new MatchSetNotFoundException();
        }

        int p1score = matchset.getScore1();
        int p2score = matchset.getScore2();

        if (player == 1) {
            // Abfragen, dass es nicht über 6 bzw. 7 ist abhängig von getScore2
            // Wenn player1 und player2 unter 6 eins draufzählen
            // Wenn player1 oder player2 bei 6 und der andere bei maximal 4 dann aufhören
            // Wenn player1 oder player2 beide bei 5 dann weiter bis 7
            // Wenn einer der beiden player 7 erreicht dann stopp

            // Alles okay... Beide Scores unter 5
            if (p1score < 6 && p2score < 6) {
                // Änderungsschritt
                matchset.setScore1(matchset.getScore1() + 1);
            } else if (p1score == 5 && p2score == 5) {
                matchset.setScore1(matchset.getScore1() + 1);
            } else if (p1score == 6 && p2score == 5) {
                matchset.setScore1(matchset.getScore1() + 1);
            } else if (p1score == 5 && p2score == 6) {
                matchset.setScore1(matchset.getScore1() + 1);
            } else if (p1score == 6 && p2score == 6) {
                matchset.setScore1(matchset.getScore1() + 1);
            }

        } else {
            // Hier wird Player 2 manipuliert

            if (p2score < 6 && p1score < 6) {
                // Änderungsschritt
                matchset.setScore2(matchset.getScore2() + 1);
            } else if (p2score == 5 && p1score == 5) {
                matchset.setScore2(matchset.getScore2() + 1);
            } else if (p2score == 6 && p1score == 5) {
                matchset.setScore2(matchset.getScore2() + 1);
            } else if (p2score == 5 && p1score == 6) {
                matchset.setScore2(matchset.getScore2() + 1);
            } else if (p2score == 6 && p1score == 6) {
                matchset.setScore2(matchset.getScore2() + 1);
            }
        }

        return matchSetRepository.save(matchset);
    }

    /**
     *
     */
    public MatchSet decreaseScore(long matchSetid, int player) throws MatchSetNotFoundException {
        MatchSet matchset = matchSetRepository.findById(matchSetid);
        if (matchset == null) {
            throw new MatchSetNotFoundException();
        }

        int p1score = matchset.getScore1();
        int p2score = matchset.getScore2();

        if (player == 1) {
            if (p1score > 0) {
                matchset.setScore1(matchset.getScore1() - 1);
            }
        } else {
            if (p2score > 0) {
                matchset.setScore2(matchset.getScore2() - 1);
            }
        }
        return matchSetRepository.save(matchset);
    }

}
