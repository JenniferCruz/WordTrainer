package api;
import java.util.Map;

public class Translation {

    private final long id;
    private final Map<String, String> words;
    private final String example;

    public Translation(long id, Map<String, String> words, String ex) {
        this.id = id;
        this.words = words;
        this.example = ex;
    }

    public long getId() {
        return this.id;
    }

    public Map<String, String> getWords() {
        return this.words;
    }

    public String getExample() {
        return this.example;
    }

}
