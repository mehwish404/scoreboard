package tennis.scoreboard.matchset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tennis.scoreboard.feld.Match;

import java.util.List;

@Repository
public interface MatchSetRepository extends JpaRepository<MatchSet,Long> {

    List<MatchSet> findByMatch(Match match);
    MatchSet findById(long setId);

}