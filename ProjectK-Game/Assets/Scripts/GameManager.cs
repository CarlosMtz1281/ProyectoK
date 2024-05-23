using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class GameManager : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI scoreText;
    [SerializeField] TextMeshProUGUI pauseScoreText;
    [SerializeField] TextMeshProUGUI endScoreText;
    [SerializeField] GameObject pausePanel;
    [SerializeField] GameObject endPanel;
    [SerializeField] GameObject enemyPrefab;
    public float score;
    bool flag = true;
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

        if(flag)
        {
            flag = false;
            Invoke("SpawnEnemy", 1f);
        }
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
}
