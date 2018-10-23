---
title: "Learn You Some Linux For Great Good Part 2: Getting Comfortable"
date: "2018-03-01"
categories:
  - Linux
---

{{< learn-linux >}}

Once you've finished installation, your computer should ask you to restart.
If it doesn't, do it anyway.
I'm sure you're just *dying* to test out your new installation of Linux.

## Baby Steps

When you reboot, you should see a menu pop up.
This is the GRUB menu, and it lets you select which operating system to boot.
If you already had Windows installed on this computer, then there should be an option to boot it.
If there isn't, there's probably something wrong.
You'll also see multiple entries for your new Linux installation.
They'll usually be "normal mode" (which may have no label) and "safe mode."
Depending on the options you selected, there may be an option for something along the lines of "memtest86."
This choice is useful if something is so wrong with your computer that you can't boot properly and you want to diagnose it.

Once you select one of the Linux options, you'll find a login screen.
Enter your credentials that you made during installation.
Although it might be tempting to log in as "root," *don't do this* unless you have a very good reason.

### A Side Rant on Security

Those of you that use Windows might use the administrator account for your day-to-day usage.
While you *can* do this on Linux, I wouldn't recommend it.
Being the superuser at all times can lead to some security vulnerabilities.
If any program you launch can immediately do anything on your computer *without asking permission,* some things can go very badly very quickly.
Use the user account that you set up during installation instead.

However, knowing your root password (assuming you're running Linux on a personal computer, where you have the root password) is essential if you want to use Linux.
Since the superuser is the only user that can make system-wide changes, you need to have that password available in case you want to download software or configure global settings.
You won't have to log in as root: your desktop environment will ask you for the password if necessary.

## User Interface

If you've installed a distribution that is using Cinnamon, LXDE, or XFCE, you'll find something that looks strikingly familiar if you've ever used Windows XP.
Although not known for their innovative layouts, these two desktop environments make it easy to get started by providing a common interface.

KDE is very similar, although much flashier, than the previous environments.
Some configurations and themes for KDE feature a dock not unlike the dock found on Apple computers.
If these themes suit your tastes, then by all means continue.

Gnome 2 is also uses menus similar to all the desktop environments previously mentioned.
Gnome 3, however, is completely different.

Gnome 3 embraced the "activities" menu as the be-all-end-all menu.
Want to open a new application or document?
Activities menu.
Want to switch to a different desktop?
Activities menu.
Want to see all of your open applications?
*Activities menu.*

You can probably tell that I'm not the biggest fan of this design decision.
However, if you find it intuitive, then go ahead and use it.

Now go and explore!
Play with your new Linux install, complete with desktop environment.
The best way to learn is by doing.

## Applications

Most Linux distributions give you a set of programs to get started.
They generally include a web browser (generally Firefox or some variant, although I've also seen Chromium), a text editor, a music player, an email client, an "application store," settings applications, and miscellaneous utilities (e.g. calculator, some simple games).

A couple of those might have jumped out to you as odd.
"Settings applications" don't really make sense when you're used to something like Windows, which provides applications for setting up your computer.
Linux leaves that to the desktop environment, which has to provide its own settings applications.

Also, you'll see that I put "application store" in quotes.
It's really just a wrapper around the *package manager* (which I mentioned in Part 1).
While it does give you a safe source of applications that will be automatically updated, the package manager doesn't limit you to the programs installed in its repositories.

### Office Programs

You'll also notice a common group of applications that's missing from the above list: office programs.
The most common set of office programs, which includes a word processor, a spreadsheet program, and program for presentations is [LibreOffice](https://www.libreoffice.org/).
While not as feature-complete as the latest versions of Microsoft Office, they certainly will get the job done.
Additionally, LibreOffice has good support for the Microsoft file types like .docx and the like; you'll be able to edit most any document that doesn't have fancy effects.

To install LibreOffice, open your package manager program (or "application store") and search for LibreOffice.
You can choose to install either the entire suite or individual programs if you like.
Whenever you do anything with installing software, you'll need to have your root password handy, since the root user (or technically, in this case, a regular user with superuser privileges) is the only user that can make system-wide changes.

## Command Line Basics

I know.
This is a scary concept.
Interacting with your computer through commands that you type into a terminal (like it's 1992 again!) isn't intuitive for most people.
Fortunately, when you use Linux, you can use GUI programs for most things.
However, if you want to really be proficient with using Linux, a basic understanding of the command line is a must.

Navigate to your program launcher and look for something called "terminal."
It may be called something like "LXTerminal" or "Konsole": this is just the developers of the DE attempting to differentiate their terminal from all the others.
Yes, there are actually many terminal applications (I myself prefer Urxvt, since it's dead-simple and lightweight, but you are free to choose your own path).

When you open the terminal, it should show you something like this: `~$`.
This prompt tells you several things: a) you are in your home directory and b) you are running as a "normal user" (AKA not root).

That's a little non-obvious, so let me break it down.

When you open a terminal, it launches a *shell.*
This program is responsible for taking what you type and interpreting it as a command.
By far the most common default shell is `bash`.
If you want to know why it's called that, well... there's a bit of history to that.

Bash's prompt (by default) is laid out like this: `<current directory><prompt character>`.
The "current directory" is the folder that the shell is currently in.
This might not make sense for most GUI applications: why would a program run "in" any particular folder?
Suffice to say that the terminal acts like a file browser and tells other programs to open certain files.
Your current directory is apparently `~`. What that really means it you are in your home directory. This is the folder that holds all of "your files" (which includes the current user's documents, etc. but doesn't include applications and system configuration files, even if you *technically* own the computer).
Whenever you navigate into any subdirectories, you'll see `~/path/to/folder` in your prompt.
The home folder is often shortened to `~`, and you can use that when you're specifying files that aren't in your current directory.

The "prompt character" tells you whether you are running as a regular user or a superuser.
When it's a `$`, that means that you are a regular user.
If it's a `#`, then you're a superuser.
This can be very important: if you're a superuser, running certain commands can ruin your installation if you're not careful.

Now that we've got that out of the way, let's run our first command. Type `ls` into the terminal and press enter.

You should see a list of files and folders that are in your home directory.
Find one of the folders and type `cd <folder name>`. If it includes spaces, then surround the name of the folder with quotes: `cd "<folder name>"`.

Now you'll see that your prompt has changed.
It should now include the name of the folder you typed after `cd`.
Congratulations, you've just changed your current directory!

### A Mouthful of Nonsense

The commands `ls` and `cd` seem like random strings of characters if you don't know what they mean.
They're short for "list" and "change directory" respectively.
Lots of commands in the Unix world (which Linux's commands are based on) are just cryptic groups of letters.
Commands like `tar`, `sed`, and `sudo` are also abbreviated like this.
It's part of the [tradition.](https://www.youtube.com/watch?v=sWSoYCetG6A)

## Conclusion

My next couple of posts will be getting you more familiar with the command line (if you couldn't tell, it's one of my favorite subjects).
I'll give a more in-depth explanation of the shell's syntax, ways to customize it, and some of the Unix philosophy in general.

