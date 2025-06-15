## Live Project

View the live application here: [URL Shortener Client](https://url-shortener-client-lake.vercel.app/)  

## Server Code

[https://github.com/Nishant8826/url-shortener-api.git](https://github.com/Nishant8826/url-shortener-api.git)

---

# URL Shortener

A simple **URL Shortener** application that converts long URLs into short, more manageable codes.

Built with **Node.js**, **Postgres**, and **Redis**.

---

## 🔹 Tech Stack

- **Node.js**
- **Express**
- **Postgres** (for persistent storage of URLs and metadata)
- **Redis** (for cache layer)

---

## 🔹 Features

- Shortens long URLs into unique codes.
- Stores long-to-short mapping in **Postgres**.
- Caches frequently accessed URLs in **Redis** for faster retrieval.
- Logs metadata (like timestamp, IP, referrer) for each redirection.
- Allows retrieving total number of redirects, last few accesses, referrer breakdown, and country statistics.

---

## 🔹 API Endpoints

### Shorten URL `POST /shorten`
- **Input:** Long URL
- **Output:** Shortened code (e.g., `abc123`)
- Stores long → short mapping in the database.

### Redirect `GET /:code`
- Redirects the user to the original long URL.
- Logs metadata (timestamp, IP, referrer).

### Analytics `GET /analytics/:code`
- **Response:**
  - Number of redirects
  - Timestamps of last few accesses
  - Referrer breakdown
  - Country/IP statistics (mock allowed)

---

## 🔹 Installation

1️⃣ **Clone this repository:**

```bash
git clone https://github.com/Nishant8826/url-shortener.git
