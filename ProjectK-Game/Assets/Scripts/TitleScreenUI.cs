using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class TitleScreenUI : MonoBehaviour
{
    [SerializeField] GameObject titleScreen;
    [SerializeField] GameObject instructionsScreen;
    [SerializeField] GameObject settingsScreen;

    public void StartGame()
    {
        SceneManager.LoadScene("Game");
    }

    public void ShowInstructions()
    {
        titleScreen.SetActive(false);
        instructionsScreen.SetActive(true);
    }

    public void ShowSettings()
    {
        titleScreen.SetActive(false);
        settingsScreen.SetActive(true);
    }

    public void BackToTitle()
    {
        titleScreen.SetActive(true);
        instructionsScreen.SetActive(false);
        settingsScreen.SetActive(false);
    }

    public void QuitGame()
    {
        Application.Quit();
    }

}
