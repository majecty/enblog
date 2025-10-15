+++
title = 'Moving Beyond LangGraph'
date = '2025-10-01'
+++

When I first started building a product using LLM APIs, I adopted **LangGraph**. Later, I moved away from it and implemented chat history and state management myself. Here’s what I learned through that process.

### LangGraph — a Lifesaver at First

When I first needed to build a chatbot, LangGraph was a huge help. The goal was to create a chatbot that could respond based on existing data — something like a banking app chatbot.
At that time, I had no experience with similar systems. The chatbot needed to extract appropriate search keywords from user questions, query the database, and then format the results as proper answers — all of which were difficult to design.

By following LangGraph’s tutorials[^1], I could quickly build a minimal working chatbot and learn many new concepts: what **RAG**[^2] is, how to chunk and vectorize source data, and how to query it back. Even without deep understanding, I could make something that worked and learned a lot by analyzing it.

[^1]: I learned a lot by studying these two tutorials: [LangGraph RAG Tutorial](https://langchain-ai.github.io/langgraph/tutorials/rag/langgraph_agentic_rag/#1-preprocess-documents), [LangGraph Run Agent Tutorial](https://langchain-ai.github.io/langgraph/agents/run_agents/).

[^2]: RAG (Retrieval-Augmented Generation) refers to storing reference documents in a database and retrieving them via vector search when the LLM needs relevant information.

### Why I Moved Away — The Restrictive Graph Structure

The biggest reason was the **graph structure** itself.
LangGraph represents workflows as a graph — nodes connected from start to end, each performing tasks like LLM calls or database queries. The chatbot’s final output is what comes from the last node.

For example, consider a chatbot that can transfer or check assets. When Alice asks to send 500 KRW to Bob, the graph might look like this:

1. Detect Alice’s intent
2. Extract recipient and amount information
3. Call the server API to execute the transfer
4. Generate a response message for Alice

This looks clean in theory, but in practice, **the flow was hard to read**.
It was also difficult to verify dependencies between nodes or handle errors properly. Understanding all potential error paths often required reading LangGraph’s internal source code.

Using simple **if/else/while** logic was more straightforward for our use case.
With regular control flow, data passing between steps was explicit through function arguments and return values. Error handling was also much easier with familiar `try/catch` patterns.

### Why I Moved Away — Difficult to Extend

Managing **chat history** and **RAG** became another challenge.
LangGraph automatically stores chat history in PostgreSQL — convenient at first, but soon the context window overflowed as the history grew. Summarizing or deleting old messages was tricky.
If you simply removed history entries, runtime errors occurred because **tool calls and their results must be deleted together**. Querying the stored messages directly from the database was also cumbersome due to its complex schema.

It became easier to just implement our own lightweight history management system that met our specific needs.

Expanding RAG also became difficult. LangGraph’s RAG worked fine with a few trusted documents, but once we added time-sensitive or low-confidence data, it got complicated.
The built-in RAG system didn’t support ranking search results by source reliability or timestamp. It also stored metadata as JSON in a single column, which was inconvenient — we wanted to manage fields through a proper database schema.

Ultimately, building a minimal RAG system tailored to our needs required **less effort** than extending LangGraph’s.

### Conclusion

LangGraph was a great learning tool for building prototypes and understanding the LLM workflow.
However, for our project’s needs, it was overly complex.
Writing only the features we truly needed — with clear control flow and custom storage — turned out to be simpler and more maintainable in the long run.
