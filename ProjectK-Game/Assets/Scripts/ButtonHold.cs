using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class ButtonHold : MonoBehaviour
{
    public bool isHolding = false;

    public void OnPointerDown()
    {
        isHolding = true;
    }

    public void OnPointerUp()
    {
        isHolding = false;
    }
}