---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
hidden: true
tags:
    - Tagname
summary: ""
---

By: Roger Johnsen, {{ .Date | time.Format "02.01.2006" }}

![Banner](/images/articles/image.png)

## Introduction

_Introduction text here_

---


--- 

|Revised Date | Author | Comment |
| ----------- | ------ | ------- |
| {{ .Date | time.Format "02.01.2006" }}  | Roger Johnsen | Article added |