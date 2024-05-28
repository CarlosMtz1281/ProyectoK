using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class quizInfo : MonoBehaviour
{
    public static quizInfo Instance { get; private set; }
    public string quizJson;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
}
