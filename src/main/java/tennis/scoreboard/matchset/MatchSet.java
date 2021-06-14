package tennis.scoreboard.matchset;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import tennis.scoreboard.feld.Match;

import javax.persistence.*;

@Entity
public class MatchSet {

    public Long getId() {
        return id;
    }

    @Id
    @GeneratedValue
    private Long id;
    private int setnumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = "matchsets", allowSetters = true)
    private Match match;
    private  int score1;
    private  int score2;

    public MatchSet(Match match,int setnumber) {
        this.score1=0;
        this.score2=0;
        this.match=match;
        this.setnumber=setnumber;
    }

    public MatchSet() {

    }

    public void setScore1(int score1) {
        this.score1 = score1;
    }

    public int getScore2() {
        return score2;
    }

    public void setScore2(int score2) {
        this.score2 = score2;
    }
    public int getScore1() {
        return score1;
    }
    public int getSetnumber() {
        return setnumber;
    }

    public void setSetnumber(int setnumber) {
        this.setnumber = setnumber;
    }
    public Match getMatch() {
        return match;
    }

}
