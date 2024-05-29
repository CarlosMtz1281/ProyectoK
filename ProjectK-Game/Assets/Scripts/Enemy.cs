using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    float speed = 2f;

    // Update is called once per frame
    void Update()
    {
        // Move the enemy down
        transform.Translate(Vector3.down * speed * Time.deltaTime);
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Projectile"))
        {
            Destroy(collision.gameObject);
            Destroy(gameObject);
        }

        if (collision.CompareTag("Player"))
        {
            collision.GetComponent<Player>().Damage();
            Destroy(gameObject);
        }

        if (collision.CompareTag("Border"))
        {
            collision.GetComponent<Border>().player.Damage();
            Destroy(gameObject);
        }
    }
}
