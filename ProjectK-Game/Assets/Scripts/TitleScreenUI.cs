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
    string jwt = "";
    string endpoint = "https://proyecto-k-backend.vercel.app";
    // string endpoint = "http://localhost:2025";
    JsonData data;

    void Start(){
        StartCoroutine(GetToken());
    }

    public void StartGame()
    {
        SceneManager.LoadScene("GameMobile");
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
        using (UnityWebRequest webRequest = UnityWebRequest.Get(endpoint + "/quizes/" + jwt))
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
        UnityWebRequest webRequest = UnityWebRequest.Get(endpoint + "/quizes/quizId/" + id);
        webRequest.SetRequestHeader("sessionKey", jwt);
        /*
        using (webRequest)
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
        */
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

    IEnumerator GetToken()
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(endpoint + "/users/ixpolingame@gmail.com")){
            yield return webRequest.SendWebRequest();

            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log(webRequest.error);
            }
            else
            {
                string json = webRequest.downloadHandler.text;
                JsonData data = JsonMapper.ToObject(json);
                jwt = data["session"]["session_key"].ToString();
                Debug.Log(jwt);
            }
        }
    }

    public void selectQuiz(int index)
    {
        StartCoroutine(GetQuiz(index));
    }

}
