package api;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class DoQuizTest {

    private WebDriver driver;
    private static final String url = "http://localhost:3000/";
    //private static final Map<String, String> quizAnswers = new HashMap() {"der Hund":"dog", "":""};

    @Before
    public void setUpBrowserInstance() throws Exception {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        // Tested in Google Chrome 59 on Linux. More info on:
        // https://developers.google.com/web/updates/2017/04/headless-chrome
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");

        this.driver = new ChromeDriver(options);
        this.driver.get(url);
    }

    @After
    public void tearDownBrowserInstance() throws Exception {
        this.driver.quit();
    }

    @Test
    public void canChooseDifferentTypesOfQuizzes() {
        WebElement greeter = this.driver.findElement(By.id("greeter"));
        assertEquals("Must prompt to choose a test",
                "select a quiz!", greeter.getText().toLowerCase());

        List<WebElement> quizzesLinks = this.driver.findElements(By.className("quiz-option"));
        assertTrue("Must offer multiple quiz options to click", quizzesLinks.size() >= 2);
    }


    @Test
    public void canChooseMultipleChoiceQuiz() {
        WebElement multipleChoiceLink = this.driver.findElement(By.className("multiple-choice-quiz"));
        multipleChoiceLink.click();
        WebElement remaining = this.driver.findElement(By.className("questions-count"));
        assertTrue("Must include questions count", remaining.getText().toLowerCase().contains("remaining questions:"));

        List<WebElement> options = this.driver.findElements(By.className("user-response-option"));
        assertTrue("Must contain at least 2 options to choose from", options.size() >= 2);
    }

    @Test
    public void canCompleteMultipleChoiceQuizAllRight() {
        // TODO
        WebElement multipleChoiceLink = this.driver.findElement(By.className("multiple-choice-quiz"));
        multipleChoiceLink.click();

    }

}