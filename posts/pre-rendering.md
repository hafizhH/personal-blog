---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
author: 'Blog Writer'
thumbImg: 'https://miro.medium.com/max/1176/1*LvA59wJi3O9jTMQQsw_cRA.png'
previewContent: 'Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page. ...'
---

![Next](https://miro.medium.com/max/1176/1*LvA59wJi3O9jTMQQsw_cRA.png)

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.