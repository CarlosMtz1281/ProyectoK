using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Player : MonoBehaviour
{
    float speed = 8f;
    [SerializeField] int life = 3;
    [SerializeField] Image h1, h2, h3;
    [SerializeField] Sprite full, empty;
    [SerializeField] GameObject projectilePrefab;
    AudioSource audioSource;
    void Start()
    {
        audioSource = GetComponent<AudioSource>();
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            audioSource.Play();
            Instantiate(projectilePrefab, transform.position + new Vector3(0.015f, 0.49f, 0), Quaternion.identity);
        }
    }

    public void Damage()
    {
        life--;
        UpdateLife();
        if (life <= 0)
        {
            Destroy(gameObject);
        }
    }

    void UpdateLife()
    {
        switch (life)
        {
            case 3:
                h1.sprite = full;
                h2.sprite = full;
                h3.sprite = full;
                break;
            case 2:
                h1.sprite = full;
                h2.sprite = full;
                h3.sprite = empty;
                break;
            case 1:
                h1.sprite = full;
                h2.sprite = empty;
                h3.sprite = empty;
                break;
            case 0:
                h1.sprite = empty;
                h2.sprite = empty;
                h3.sprite = empty;
                break;
        }
    }

    void FixedUpdate()
    {
        // Quiero que se mueva de derecha a izquierda pero solo entre los valores de -2 y 2
        float horizontal = Input.GetAxis("Horizontal");
        bool condition = transform.position.x > 2 && horizontal > 0 || transform.position.x < -2 && horizontal < 0;

        if (!condition)
        {
            transform.position += new Vector3(horizontal, 0, 0) * speed * Time.deltaTime;
        }
    }
}
