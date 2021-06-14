package tennis.scoreboard.matchset.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MatchSetApiException extends RuntimeException{

    public MatchSetApiException() {
    }

    public MatchSetApiException(String message) {
        super(message);
    }
}
