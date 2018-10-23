---
title: My Crazy Notetaking Setup
date: "2017-12-04"
categories:
    - Git
    - Vim
    - Linux
---
Without going into too much detail, let's just say that I enjoy messing with my workflow far too much. I'm constantly trying to get a more efficient setup, a faster, newer, better, shinier plugin, and a more robust tool to use. I have an addiction for configuration. However, for the past few months, I've found a workflow that works pretty consistently for me.

## Note-Taking
I take all of my notes in Vim. I'll leave it to you to determine whether this is because I'm very efficient in Vim, or because I'm a little bit masochistic. (Hint: it's a bit of both.) I take all of my notes in Markdown, which I find very easy to write, read, and use. It's especially nice when I want to generate a study guide for my classes, since I can use the amazing `pandoc` command.

## Note Management
Since I take my notes in plaintext, I can take advantage of the power of Git to track revisions. Each separate class has its own Git repository which I host on Gitlab (I would have used Github, but the fact that I can't have infinite private repositories means that all of my university's administration would jump down my throat for academic dishonesty). This way, I can properly synchronize my repositories between my desktop and laptop.

## Study Guides
This is where my love of Linux (and ancient technologies) rears its ugly head. Generally, I want to take all of the notes that I've taken over the quarter or semester and compile them into one document that I can easily read anywhere. I use `pandoc` to convert all of my notes into LaTeX, which I then `\input` into a container document. Then I can compile my document and voila! I have a beautifully typeset (like that matters) study guide with all of my notes. I generally format the container to be a tiny bit fancier than usual, including a table of contents and multiple chapters.

Of course, running these commands by hand every time I updated my notes would get quite cumbersome. So, looking into the past for inspiration, I landed on another ancient Unix utility: `make`. I always make sure to implement a clean rule and that I use wildcards to prevent having to update my makefile with every new note markdown file. I also modify my .gitignore so I don't actually include those automatically generated .tex files in my version control history.

## Advantages(?)
Any "time benefits" I get from this system are undoubtedly negated by the time it takes to maintain it. It's more about creating a system in which I can use my favorite tools (Vim, Git, and the command line) and in which I have total control. Are the results better than just biting the bullet and using Microsoft Word or Google Drive? Probably not. It would probably be usable from more computers, and the revision history would be just as good. But it's more about the principle of being able to take notes in a way that's comfortable for me.

> Efficiency is doing things right; effectiveness is doing the right things. -- Peter Drucker
