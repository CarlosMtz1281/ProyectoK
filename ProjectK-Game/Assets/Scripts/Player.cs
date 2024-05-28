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
    [SerializeField] GameManager gameManager;
    AudioSource audioSource;
    bool canShoot = true;
    void Start()
    {
        audioSource = GetComponent<AudioSource>();
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space) && canShoot)
        {
            audioSource.Play();
            canShoot = false;
            Invoke("AllowShoot", 0.3f);
            Instantiate(projectilePrefab, transform.position + new Vector3(0.015f, 0.49f, 0), Quaternion.identity);
        }
    }

    public void Damage()
    {
        life--;
        UpdateLife();
        if (life <= 0)
        {
            gameManager.gameOver();
            Destroy(gameObject);
        }
    }

    public void Heal()
    {
        if (life < 3)
        {
            life++;
            UpdateLife();
        }
    }

    void UpdateLife()
    {
        switch (life)
        {
            case 3:
                h1.sprite = full; h2.sprite = full; h3.sprite = full;
                break;
            case 2:
                h1.sprite = full; h2.sprite = full; h3.sprite = empty;
                break;
            case 1:
                h1.sprite = full; h2.sprite = empty; h3.sprite = empty;
                break;
            case 0:
                h1.sprite = empty; h2.sprite = empty; h3.sprite = empty;
                break;
        }
    }

    void FixedUpdate()
    {
        float horizontal = Input.GetKey(KeyCode.RightArrow) ? 1 : Input.GetKey(KeyCode.LeftArrow) ? -1 : 0;
        bool condition = transform.position.x > 2 && horizontal > 0 || transform.position.x < -2 && horizontal < 0;

        if (!condition)
        {
            transform.position += new Vector3(horizontal, 0, 0) * speed * Time.deltaTime;
        }
    }

    void AllowShoot()
    {
        canShoot = true;
    }
}
