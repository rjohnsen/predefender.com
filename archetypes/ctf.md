---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
hidden: false
tags:
    - ctf
summary: ""
---

|Revised Date | Author | Comment |
| ----------- | ------ | ------- |
| {{ .Date | time.Format "02.01.2006" }}  | Roger Johnsen | Article added |

## Introduction

> _Introduction text here_

--- 

## Solution

