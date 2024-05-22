using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class GameManager : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI scoreText;
    [SerializeField] TextMeshProUGUI pauseScoreText;
    [SerializeField] GameObject pausePanel;
    public float score;
    // Start is called before the first frame update
    void Start()
    {
        score = 0;
    }

    // Update is called once per frame
    void Update()
    {
        score += Time.deltaTime * 10;
        float roundedScore = Mathf.Round(score);
        scoreText.text = "SCORE\n" + roundedScore.ToString();
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
}
