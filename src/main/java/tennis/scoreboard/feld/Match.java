package tennis.scoreboard.feld;

import org.springframework.lang.NonNull;
import tennis.scoreboard.matchset.MatchSet;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Match {

    @Id
    @GeneratedValue
    private Long id;

    private String player1;
    private String player2;
    private String court;


    @OneToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<MatchSet> matchsets;

    public Match() {
    }

    public Match(String player1, String player2, String court) {
        this.player1 =player1;
        this.player2=player2;
        this.court = court;
        this.matchsets= new ArrayList<MatchSet>(3);
    }


    public String getPlayer1() {
        return player1;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }


    public Long getId() {
        return id;
    }

    public List<MatchSet> getMatchsets() {
        return matchsets;
    }
    public void setMatchsets(List<MatchSet> matchsets) {
        this.matchsets = matchsets;
    }

    public String getCourt() {
        return court;
    }

    public void setCourt(String court) {
        this.court = court;
    }
}
