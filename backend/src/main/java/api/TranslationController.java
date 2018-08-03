package api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationController {

    private static int id = 0;
    private final List<Translation> translations = new ArrayList<>();

    @RequestMapping("/translations")
    public List<Translation> translations() {
        translations.add(createTranslation("der Hund", "dog", "Zum Beispiel"));
        translations.add(createTranslation("die Katze", "cat", "Meow"));
        translations.add(createTranslation("das Haus", "house", "Weiss"));
        translations.add(createTranslation("gehen", "to go", "verbe"));
        return this.translations;
    }

    private Translation createTranslation(String de, String en, String ex) {
        Map<String, String> t = new HashMap<>();
        t.put("de", de);
        t.put("en", en);
        return new Translation(id++, t, ex);
    }
}