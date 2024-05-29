using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using UnityEngine.UI;
using LitJson;
using TMPro;

public class TitleScreenUI : MonoBehaviour
{
    [SerializeField] GameObject titleScreen, instructionsScreen, settingsScreen, selectLevelScreen, quizButtonPrefab;
    [SerializeField] Transform quizListHolder;
    string endpoint = "http://ec2-52-15-179-17.us-east-2.compute.amazonaws.com:2024";
    JsonData data;

    public void StartGame()
    {
        SceneManager.LoadScene("Game");
    }

    public void SelectLevel()
    {
        HandleGetQuizes();
        titleScreen.SetActive(false);
        selectLevelScreen.SetActive(true);
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
        selectLevelScreen.SetActive(false);
        // Destroy all quiz buttons
        foreach (Transform child in quizListHolder)
        {
            Destroy(child.gameObject);
        }
    }

    public void QuitGame()
    {
        Application.Quit();
    }

    public void HandleGetQuizes()
    {
        StartCoroutine(GetQuizes());
    }

    IEnumerator GetQuizes()
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(endpoint + "/quizes"))
        {
            yield return webRequest.SendWebRequest();

            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log(webRequest.error);
            }
            else
            {
                string json = webRequest.downloadHandler.text;
                data = JsonMapper.ToObject(json);
                for (int i = 0; i < data.Count; i++)
                {
                    GameObject quizButton = Instantiate(quizButtonPrefab, quizListHolder);
                    quizButton.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = data[i]["quiz_name"].ToString() + " - " + data[i]["topic_name"].ToString() + " - " + data[i]["author"].ToString();
                    quizButton.name = data[i]["quiz_id"].ToString();
                    quizButton.GetComponent<Button>().onClick.AddListener(() => selectQuiz(int.Parse(quizButton.name)));
                }

            }
        }
    }

    IEnumerator GetQuiz(int id)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(endpoint + "/quizes/" + id))
        {
            yield return webRequest.SendWebRequest();

            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log(webRequest.error);
            }
            else
            {
                string json = webRequest.downloadHandler.text;
                quizInfo.Instance.quizJson = json;
                StartGame();
            }
        }
    }

    public void selectQuiz(int index)
    {
        StartCoroutine(GetQuiz(index));
    }

}
