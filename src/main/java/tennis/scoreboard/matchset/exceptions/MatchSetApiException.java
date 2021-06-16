package tennis.scoreboard.matchset.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST,reason = "MatchSet cant be added")
public class MatchSetApiException extends RuntimeException{

    public MatchSetApiException() {
    }

    public MatchSetApiException(String message) {
        super(message);
    }
}
