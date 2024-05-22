using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Projectile : MonoBehaviour
{
    // Start is called before the first frame update

    float speed = 5f;
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        // Quiero que el proyectil se mueva hacia arriba
        transform.Translate(Vector2.up * Time.deltaTime * speed);
    }
    // Quiero que el proyectil se destruya si sale de la pantalla
    void OnBecameInvisible()
    {
        Destroy(gameObject);
    }

    // Quiero que el proyectil se destruya si colisiona con un enemigo

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Enemy"))
        {
            Destroy(gameObject);
        }
    }
}
