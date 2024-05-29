using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.Networking;
using LitJson;

public class GameManagerMobile : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI scoreText, pauseScoreText, endScoreText;
    [SerializeField] GameObject pausePanel, endPanel, enemyPrefab, questionContainer;
    [SerializeField] PlayerMobile player;
    TextMeshProUGUI W, A, S, D, QuestionT, timerText;
    public float score;
    int correctAnswer, currentQuestion = 0;
    float timer = 10f, timerTransition = 3f;
    bool flag = true, transition = false, questions = false;
    JsonData data; 
    string endpoint = "http://ec2-52-15-179-17.us-east-2.compute.amazonaws.com:2024";

    // Start is called before the first frame update
    void Start()
    {
        score = 0;
        W = questionContainer.transform.GetChild(0).GetComponentInChildren<TextMeshProUGUI>();
        A = questionContainer.transform.GetChild(1).GetComponentInChildren<TextMeshProUGUI>();
        S = questionContainer.transform.GetChild(2).GetComponentInChildren<TextMeshProUGUI>();
        D = questionContainer.transform.GetChild(3).GetComponentInChildren<TextMeshProUGUI>();
        QuestionT = questionContainer.transform.GetChild(4).GetComponentInChildren<TextMeshProUGUI>();
        timerText = questionContainer.transform.GetChild(5).GetComponentInChildren<TextMeshProUGUI>();
        data = JsonMapper.ToObject(quizInfo.Instance.quizJson);
        if(data["questions"].Count > 0)
        {
            questions = true;
            getQuestions();
        }
        else
        {
            questions = false;
        }
    }

    // Update is called once per frame
    void Update()
    {
        score += Time.deltaTime * 10;
        float roundedScore = Mathf.Round(score);
        scoreText.text = "SCORE\n" + roundedScore.ToString();

        handleSpawnEnemy();
        handleTimer();
    }

    public void PauseGame()
    {
        pausePanel.SetActive(true);
        pauseScoreText.text = "Tu puntaje actual\n" + Mathf.Round(score).ToString();
        Time.timeScale = 0;
    }

    public void ResumeGame()
    {
        pausePanel.SetActive(false);
        Time.timeScale = 1;
    }

    public void endGame()
    {
        Time.timeScale = 1;
        UnityEngine.SceneManagement.SceneManager.LoadScene("TitleScreen");
    }

    public void gameOver()
    {
        endPanel.SetActive(true);
        endScoreText.text = "Tu puntaje fue de\n" + Mathf.Round(score).ToString();
        Time.timeScale = 0;
    }

    public void SpawnEnemy()
    {
        flag = true;
        Instantiate(enemyPrefab, new Vector3(Random.Range(-2f, 2f), 3.5f, 0), Quaternion.identity);
    }

    void handleSpawnEnemy(){
        if(flag)
        {
            flag = false;
            Invoke("SpawnEnemy", 1.7f);
        }
    }

    void handleTimer()
    {
        if(!questions){
            return;
        }
        if(transition){
            timerTransition -= Time.deltaTime;
            if(timerTransition <= 0){
                transition = false;
                timerTransition = 3f;
                getQuestions();
            }
            return;
        }
        timer -= Time.deltaTime;
        timerText.text = Mathf.Round(timer).ToString();
        if(timer <= 0)
        {
            player.Damage();
            timer = 10f;
            transition = true;
        }
    }

    void checkAnswer(int answer)
    {
        if(transition){ return; }
        Transform correct = questionContainer.transform.GetChild(correctAnswer-1);
        correct.GetComponent<Image>().color = new Color(0.4f, 1f, 0.4f, 1f);
        transition = true;

        if(answer == correctAnswer)
        {
            player.Heal();
            timer = 10f;
        }
        else
        {
            Transform selected = questionContainer.transform.GetChild(answer-1);
            selected.GetComponent<Image>().color = new Color(1f, 0.4f, 0.4f, 1f);
            player.Damage();
            timer = 10f;
        }
    }

    void getQuestions(){
        // Restart the color of the answers
        for(int i = 0; i < 4; i++)
        {
            questionContainer.transform.GetChild(i).GetComponent<Image>().color = Color.white;
        }

        QuestionT.text = data["questions"][currentQuestion]["question"].ToString();
        W.text = data["questions"][currentQuestion]["options"][0].ToString();
        A.text = data["questions"][currentQuestion]["options"][1].ToString();
        S.text = data["questions"][currentQuestion]["options"][2].ToString();
        D.text = data["questions"][currentQuestion]["options"][3].ToString();

        correctAnswer = int.Parse(data["questions"][currentQuestion]["correct_answer"].ToString());

        if(currentQuestion >= data["questions"].Count - 1){
            currentQuestion = 0;
        } else{
            currentQuestion++;
        }

    }

    public void handleAnswerInput(int answer){
        if(!questions){
            return;
        }
        checkAnswer(answer);
    }
}
