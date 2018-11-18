---
title: "Making a dialogue system using Coroutine"
date: "2018-11-19"
---

Coroutine allows you to implement the primary dialogue system intuitively.

Dialogs are used in so many games.
Many games use dialogs. Visual novel, as well as RPG, action games, puzzle games, and all other games can  have characters that speak, and they use the dialogue to provide information to the player. Also, users are familiar with the dialogue system.

However, Unity does not provide a dialogue system. A programmer should buy an asset or manually implement it. If the requirements for the dialog are complicated, you will use a feature-rich and complex paid asset, but if you have a simple need, it is better to create it yourself.

Let's begin with a pure spec that does not consider any user's input.

1. Show a line of text to the user, character by character.
1. Wait a while.
1. Show another line of text again.

Implementing the spec is easy.

```cs
IEnumerator Run()
{
    for (int i = 0; i < texts.Count; i += 1)
    {
        yield return PlayLine(texts[i]);
    }
}

IEnumerator PlayLine(string text)
{
    for (int i = 0; i < text.Length() + 1; i += 1)
    {
        yield return new WaitForSeconds(0.05f);
        uiText.text = text.Substring(0, i);
    }

    yield return new WaitForSeconds(3f);
}
```

However, most users do not want to read the dialogue. They want to pass the dialogue and play the game as soon as possible. However, if we provide a "total" skip button to the users, the users will not know the essential contents, and they will be wandering in the game. Therefore, it is necessary to show the information quickly enough for the impatient user to be able to understand the minimum contents.

1. While showing a line of text character by character, if a user skips it, show all the remaining characters.
1. Wait a while.
1. If the user skips the text or waits long enough, show another line of text character by character.

Let's add some code to the above code.

```cs
enum State
{
    Playing,
    PlayingSkipping,
}

IEnumerator Run()
{
    for (int i = 0; i < texts.Count; i += 1)
    {
        yield return PlayLine(texts[i]);
    }
}

IEnumerator PlayLine(string text)
{
    for (int i = 0; i < text.Length() + 1; i += 1)
    {
        if (state == State.PlayingSkipping)
        {
            uiText.text = text;
            state = State.Playing;
            break;
        }
        yield return new WaitForSeconds(0.05f);
        uiText.text = text.Substring(0, i);
    }

    yield return new WaitForSeconds(0.5f);

    for (int i=0; i<25; i+=1)
    {
        yield return new WaitForSeconds(0.1f);
        if (state == State.PlayingSkipping)
        {
            state = State.Playing;
            break;
        }
    }
}

public void Skip()
{
    state = State.PlayingSkipping;
}
```

The vital point of the above code is that when a user clicks the skip button, it simply changes the state. This makes it safe for users to skip multiple times, and it is easy to manage the code because the control flow of the code is concentrated in the `PlayLine` function.

You can find a sample project in [this link](https://github.com/majecty/DialogueByCoroutineExample).

P.S: the above example does not support rich text. There is a library that supports rich text by replacing two lines. Please check this at [the link](https://github.com/majecty/Unity3dRichTextHelper)

```cs
for (int i = 0; i < text.RichTextLength() + 1; i += 1)
{
    yield return new WaitForSeconds(0.05f);
    uiText.text = text.RichTextSubString(i);
}
```