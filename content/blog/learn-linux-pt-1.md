---
title: "Learn You Some Linux For Great Good Part 1: Installation"
date: "2017-12-10"
categories:
    - Linux
---

{{< learn-linux >}}

So, you've decided to forge ahead. In this part we will discuss some important jargon to know, look at some distributions (and discuss how to tell them apart), create installation media, and install Linux. **WARNING:** Do *not* do this without backing up your data first. 

## A Note on Terminology
When people refer to "Linux," they generally mean an entire operating system, including lots of programs and graphical user interfaces. Technically, Linux is only the *kernel* of the operating system, which is in charge of communicating between programs and the hardware, allocating memory, scheduling different processes, and lots of other stuff. Most of the basic command-line utilities are part of the GNU project (which stands for GNU's not Unix), and all other programs are maintained by several different authors. There are several different *desktop environments* (which is a fancy term for the desktop, common programs, and things like notifications and the start menu), each of which have their own benefits and drawbacks.

## Choosing a Distribution

Collections of the Linux kernel, these programs, and (sometimes) desktop environments are called *distributions.* Each distribution is suited to its own particular task. Some are optimized for user interaction on a desktop; some are optimized for server use; still others are intended to be booted from external media. You can use any distribution for any purpose, but just know that there may be a better one out there for what you're trying to do.

Distributions of Linux generally ship with a program called a *package manager*, which does exactly what it says: it manages software packages. These download and install programs from central *repositories* maintained by the maintainers of the distribution. This is one of the selling points of Linux: not only are all of the programs in one place and easy to find, but they have been vetted by the maintainers of the distribution, unlike all of those emoticon addons, *mom.*

Here are some of the most common Linux distributions, organized by installation difficulty:

### Simpler Installation

- [Debian][]: The oldest distribution still in use. Rock solid, but slow to update. Very popular for servers.
    - [Kali Linux][]: A Debian derivative focused on penetration testing.
    - [Ubuntu][]: A Debian derivative that maintains its own set of packages, and which moves a little faster than Debian. Generally used for desktops.
    - [Linux Mint][]: A Debian derivative focused on ease of use. Good for beginners wanting to try Linux on their desktop.
- [Fedora][]: The development distribution by Red Hat. Generally stable, and a little more focused on security.
- [OpenSUSE][]: A distribution similar to Debian, but used more on desktops than servers.

### More Complex Installation

- [Arch Linux][]: A *rolling release* distribution that is constantly updating all of its packages. Can be extremely minimal or comprehensive. Relatively unstable. Generally favored by power users. (Also the most difficult to install.) **Not** recommended for beginners, as it has no graphical installer.
- [Slackware][]: An odd duck that does not use a package manager. 2/10 would not recommend.

Picking a distribution should best be left up to you. I've had the most experience with Debian and Ubuntu (which is what I'm currently using, although Fedora has been catching my eye recently), but the basics of most Linux distributions are the same.

## Creating Installation Media
Once you've chosen a distribution, you need to create installation media. The distribution website will offer downloads in the form of ISO image files. These files represent (in compressed form) the entire file system of the base distribution, which includes all of the programs and configuration required. You then need to transfer these ISOs to physical media. This generally takes the form of a burned disk or a flash drive. For creating a CD or DVD, most burners should be able to create your media; look for an option that involves creating a data disk with a \*.iso file. If you want to go the USB route (which I recommend), [UnetBootin][] is a popular system for creating bootable USB drives.

## Partitioning
If you want to boot Linux directly from the media you create, you can skip this section. However, if you want to install Linux alongside Windows, then you'll have to make space for it on your computer. 

Data disks are divided up into *partitions*, which separate one file system from another. This allows you to have multiple file systems on a single disk and install multiple operating systems onto that disk. Furthermore, Linux installers often separate different parts of the installation by placing different sections on different partitions (for example, system files on one file system and documents on another).

To make space on your disk to install Linux alongside Windows, open up the built-in Disk Management utility by typing "diskmgmt" into your search bar (you'll need to have Administrator access to modify partitions on your disk). Once it opens, find the main Windows partition, which should be the largest one, and shrink it. Make sure to leave enough space to still use your Windows partition; Linux can be installed on a small partition, so as long as you have at least around 30 gigabytes allocated for Linux, you should be good. However, I recommend allocating more, since you may want to install lots of large programs (especially if you intend to game on Linux).

## Installation
**WARNING:** Please, *please* do *not* run this step without backing up your data, unless you're on a computer you don't care about too much.

Once you've created your installation media, insert the installation media and restart your computer. If you're on a Windows machine, you'll see a screen when you boot up that says something along the lines of "Press F2 to open the boot menu." The key may vary, but the message should be similar. Then navigate to a section that should be along the lines of "boot menu" and select your installation media (either your CD/DVD or USB drive).

Once you get to this point, the interface will vary based on the distribution that you chose. Most installers that I've used generally have at least two menu options: *Try Without Installing* and *Install [Distro Name]*. If you'd like to try to familiarize yourself with the interface before proceeding with the installation, choose *Try Without Installing.* It will take a while to load up, but you will get the full user experience of using Linux. Go ahead and poke around; this guide will wait. For those of you that just *know* that Linux is the path for you, read on.

Once installation begins, most of the options should be self-explanatory. The installer will guide you through choosing your timezone, choosing your keyboard map, and setting up accounts. However, partitioning your disk is a little more complex. 

### Setting Up Partitions
There are two types of partitions: *primary* and *logical* partitions. Primary partitions are the original partitioning format, and only four of them are allowed per disk. Logical partitions implement partitions in another layer of software; you can create several logical partitions inside one primary partition. I would generally recommend creating several logical partitions to hold your Linux installation.

When you get to the partitioning screen, you should be presented with at least two options: 1. Wipe Disk And Install, or 2. Partition Manually. Some installers will include a third option: Install Alongside Windows. If you're feeling intimidated and just want to get Linux installed, choose Install Alongside Windows. If that option isn't offered, or you want more fine-grained control, select Partition Manually.

Partitioning manually can be daunting, so I'll just espouse the virtues of my favorite setup. It allows you to change distributions without losing your files (even though you should still back them up before switching distributions), and also allocates *swap space*, which your computer can use to "swap" out memory when you use too much. If you have an SSD, make a partition for your system files on the SSD and two logical partitions for your other files and swap space on your hard disk; if you are sharing them both across the same disk, create a several logical partitions, one each for system files, user files, and swap space.

The installer will guide you through choosing file system types and *mount points*. A mount point tells Linux where the documents on the partition should be located, e.g. the `/home` directory, the `/` directory, and so on. Create one partition for your system files (either on an SSD if you have it or your hard disk) and choose to format it as "ext4" (which is a file system that is very fast and good at recovering from expected shutdowns). Allocate as much space as you want for this, but make sure it's less than half of the space you've allocated for your entire installation. Set this partition's mount point to `/`. Create another partition, also ext4, and mount it at `/home`. If you want to use Secure Boot (and you likely are), examine the partitions that already exist on your drive and look for one that has an "EFI" file system. If there is one, select it and set its mount point to `/boot/efi`. If there isn't such a partition, create a primary partition, format it as an EFI partition, and mount it there. Finally, create another partition (10GB is the largest this one should be) and create a "swap" file system. Set this mount point to "swap space." 

Once you've verified that you've done all that, *double check __everything__*, and then continue with the installation.

## Finishing the Installation
After this, your installer may download updates. This could take a long time (up to an hour or two, depending on the kind of installer that you chose). The final step in the installation is to set up the *boot loader,* which tells your computer where to load the operating system. The most common boot loader that handles both Windows and Linux is GRUB, which your installer will install automatically.

After you finish installation, reboot to ensure that everything went according to plan. You should see the GRUB boot menu show up, containing entries for your new Linux installation and your Windows installation.

[Debian]: https://www.debian.org/
[Kali Linux]: https://www.kali.org/
[Ubuntu]: https://www.ubuntu.com/
[Fedora]: https://getfedora.org/
[Arch Linux]: https://www.archlinux.org/
[OpenSUSE]: https://www.debian.org/
[Slackware]: http://www.slackware.com/
[Linux Mint]: https://linuxmint.com/
[Unetbootin]: https://unetbootin.github.io/

