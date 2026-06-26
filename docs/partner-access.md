---
title: DDC MCP — Partner Access Guide
slug: partner-access
sidebar_position: -1
---
# DDC MCP — Partner Access Guide

Access to the **法鼓全集 (Master Sheng Yen, 聖嚴法師)** retrieval service over the
Model Context Protocol (MCP).

The corpus is the full 《法鼓全集》 — Master Sheng Yen's **authored books** (110
titles) — served as MCP tools you can call from Claude, an MCP-compatible client,
or directly over HTTP.

---

## 1. Endpoint

| | |
|---|---|
| **Base URL** | `https://ddc.changpt.org` |
| **Transports** | `GET/POST /sse` (SSE) · `POST /mcp` (streamable-HTTP) |
| **Protocol** | MCP `2024-11-05` |
| **Auth** | `Authorization: Bearer <YOUR_API_KEY>`  (or `X-API-Key: <YOUR_API_KEY>`) |

Your API key is issued to you privately. **Every request must carry it** — a
request with no/invalid key returns `401`. Do not share or commit the key.

---

## 2. Quick connectivity test

A 30-second check from any terminal — replace `<YOUR_API_KEY>`:

```bash
curl -s -X POST https://ddc.changpt.org/mcp \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -H "Accept: application/json, text/event-stream" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","versi
on":"1"}}}'
```

Expected: an `initialize` result with
`"serverInfo":{"name":"ddm-ddc-agent", ...}`.
If you instead get `401`, the key/header is wrong; `200` with that body means
you're connected.

---

## 3. Connect from a client

### Claude Desktop / Claude Code (`mcp` config)

```json
{
  "mcpServers": {
    "ddc": {
      "url": "https://ddc.changpt.org/sse",
      "headers": { "Authorization": "Bearer <YOUR_API_KEY>" }
    }
  }
}
```

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector
# Transport: SSE
# URL:       https://ddc.changpt.org/sse
# Header:    Authorization: Bearer <YOUR_API_KEY>
```

Any MCP-compatible client works the same way: point it at the `/sse` (or `/mcp`)
URL and add the `Authorization` header.

---

## 4. Tools

| Tool | Purpose |
|---|---|
| **`search_ddc_teachings`** | Natural-language search over 《法鼓全集》. Returns reranked passages with citation + `chapter_code`. Supports **bo
ok scoping**: search all books, a chosen list (`book_ids`), or all-except-a-list (`exclude_book_ids`). |
| **`list_ddc_books`** | Enumerate the 110-book catalog (`book_code`, `book_title`, `category_title`) to build `book_ids` / `exclude_book_ids`. N
o args. |
| **`get_chapter`** | Fetch one full chapter by `chapter_code` (from a search hit). |
| **`get_book_outline`** | List a book's chapters (table of contents) by `book_code`. |

### Example: search, scoped to a single book

```json
// search_ddc_teachings
{ "query": "默照禪的方法", "k": 5, "book_ids": ["04-03"] }
```

Returns a list of hits, each:

```json
{
  "title": "聖嚴法師教默照禪",
  "score": 0.98,
  "snippet": "…",
  "citation": "《聖嚴法師教默照禪》，第十一輯，頁 42",
  "book_code": "04-03",
  "chapter_code": "11-03-002",
  "source_url": "https://ddc.shengyen.org/…"
}
```

Then fetch the full chapter:

```json
// get_chapter
{ "chapter_code": "11-03-002" }
```

**Book scoping recap:** omit both `book_ids` and `exclude_book_ids` → search all
books; `book_ids: ["04-03"]` → only that book (exhaustive within it);
`exclude_book_ids: [...]` → everything except those. Discover codes with
`list_ddc_books`.

Full argument/return schemas: see [`TOOLS.md`](./TOOLS.md).

---

## 5. Notes & support

- **Encoding:** all text is Traditional Chinese (繁體中文), UTF-8.
- **Rate / availability:** this is a shared service; please keep request volume
  reasonable. Let us know your expected load if it's high.
- **Key rotation:** each partner has an individual key — tell us if you need it
  rotated or revoked.
- **Questions / issues:** reply to your onboarding contact with the failing
  request (URL, headers minus the key, and the response code).
