+++
date = '2025-09-28'
draft = false
title = 'How to Get Stable Outputs from LLM APIs'
+++

Building a structured and predictable product using an LLM API is challenging because, unlike traditional APIs, LLM outputs are non-deterministic. In this post, I’ll share what I learned while developing a chatbot that manages financial assets and how I made it stable.

Let’s assume a sample chatbot that manages two assets: **USD** and **KRW**. The user can check balances, transfer funds, or exchange currencies.

### Building a Prototype with LangGraph

Using **LangGraph**, it’s easy to build a working chatbot prototype. With [`create_react_agent`](https://langchain-ai.github.io/langgraph/agents/agents/#basic-configuration), you can create an agent by simply adding a prompt and a few tools.
For example, the prompt could be:

> “You are a friendly wallet chatbot that manages KRW and USD.”

Then add tools like `getBalance`, `transferAsset`, and `exchange`. LangGraph automatically handles message history, which makes prototyping fast and simple.

### Limitations of the Prototype

However, several issues soon appeared. The chatbot occasionally failed to respond correctly to requests it had handled well before. This happened because the entire behavior depended on a single, huge prompt.
For example, improving how asset balances were displayed sometimes broke the transfer feature.

Another issue was **incorrect use of chat history**. Suppose a user checked their balance and had no assets. After transferring some assets and asking again, the bot would still say there were no assets — because it referred to its previous response instead of calling the balance tool again.

### Solutions

To fix the first issue, I **split the prompts**.
For a balance inquiry, I made multiple LLM API calls:

1. One to detect the user’s intent.
2. If the intent was “check balance,” query the database.
3. Then call another LLM to format the balance output nicely.

This modular approach prevented one function from breaking others.

For the second issue, I added **control over history usage**.
When detecting user intent or extracting parameters, history helps — users often give instructions across multiple messages.
But when **generating final responses**, history should be excluded. Otherwise, the LLM might reuse outdated information.
For example, when formatting a balance result, I only provided the tool output as input — not any past messages.

With these changes, the chatbot became much more reliable.
During this process, I switched from LangGraph to OpenAI’s official library for more control. LangGraph can still achieve the same result, but after comparing pros and cons, I decided to go with the official API directly.
I’ll cover that comparison in the next post.
