package tennis.scoreboard.feld.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MatchApiException extends RuntimeException {

    public MatchApiException() {
    }

    public MatchApiException(String message) {
        super(message);
    }
}
