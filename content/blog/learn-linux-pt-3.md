---
title: "Learn You Some Linux for Great Good Part 3: Command Line Syntax"
date: "2018-03-05"
categories:
  - Linux
---

{{< learn-linux >}}

To fully understand the command line, you need to have a good grasp of the syntax of the command line.
If you already understand how the shell breaks up arguments, and the concepts of flags, pipes, and redirections, then skip ahead to the next part.
Otherwise, read on!

### A Note Before We Begin

The design of the command line might seem overly modular at first.
You'll see what I mean when you read on.
However, there's a reason that the system is broken down into such small parts: *The Unix Philosophy*, which states that a program should "do one thing and do it well."
I'll discuss more about this after the syntax explanation.

## Command Line Structure

Most terminal commands (with the exceptions of "shell built-ins," which we'll talk about in the next part) are individual programs that are separate from the shell.
Any program, even graphical programs, can be run from the shell, and most (if not all) programs written for Linux accept some "command line arguments."
These are pieces of additional data the user provides to the program when running it.
Here's a basic example:

```shell
$ echo Hello
```

The `echo` command outputs its arguments to the terminal. It's not super useful as-is, but can be very useful in scripts.

Arguments can also be filenames.

```shell
$ cat file.txt
```

`cat` prints out the contents of whatever file you provide; in this case, that's "file.txt."

File paths can be specified using *relative paths*, which are relative to the *current working directory*, and *absolute paths*, which are not.
The current working directory is the directory the shell is currently in.
You'll see the current working directory before the prompt, e.g. `/usr/share/bin $`.
If `file.txt` is in `/home/user/documents`, then command above can be written as `cat /home/user/documents/file.txt`.

Programs can also accept multiple command-line arguments: for example, the `diff` program compares two or more files.
Arguments are separated by spaces.

```shell
$ diff file1.txt file2.txt file3.txt
```

Since spaces are used as separators, directories and files with spaces in their names can be problematic.
UNIX convention is to name directories without spaces, generally using only alphanumeric characters (a-z, 0-9) and the underscore (\_).
However, if you ever need to interact with document structures with spaces (or include other non-file arguments with spaces), surround that argument with double quotes:

```shell
$ cat "/home/user/My Documents/file 1.txt"
```

In our `echo` example above, we only passed in one command line argument, but `echo` actually prints out all its arguments.
However, spaces aren't maintained between arguments, so echo only outputs one space between words unless the arguments are surrounded by quotes.

```shell
$ echo  Hello      world.  # outputs "Hello world."
$ echo "Hello      world." # outputs "Hello      world." 
```

## Separating Commands

Sometimes a command will take a long time to run, and you don't want to have to wait until that command finishes to enter the next one.
Bash and its siblings supply two operations to do this: `;` and `&&`.
`;` runs one command, then the other, regardless of whether or not the first command succeeds.

```shell
$ command 1; command 2
```

`&&` on the other hand runs the second command if and only if the first command succeeds.
This is useful when one command is dependent on the other.

``` shell
# The first command fails
$ failing command && echo "success"
<output from first command>

# The first command succeeds
$ succeeding command && echo "success"
<output from first command>
success
```

## Flags

Sometimes programs need to have options that are more complex.
For example, the `rm` program by default only deletes individual files (but not directories), but can be told to recursively delete a folder full of files (or other folders).
The solution is "flags," which are arguments preceeded by a "-."
Thus, the "recursive" option is passed to `rm` with the `-r` flag.

```shell
$ rm folder/    # this will fail
$ rm -r folder/ # this will recursively remove the directory
```

Another flag that `rm` accepts is the `-f` flag, which "forces" removal.
What this really means is that there are no warnings for files or directories that don't exist, which makes it useful in automated scripts.
When using multiple single-character flags, you can (usually) combine them into a single group of characters.

```shell
# These two are equivalent
$ rm -r -f folder/
$ rm -rf folder/
```

Flags can also be several characters long.
The `ls` program which lists the contents of a directory accepts the `--colors` option to display different colors for different types of files.
Sometimes, longer flags are multiple words; these flags are written like `--name-of-flag`.

### The Help (Flag)

Programs have lots of different flags, and they're often not standard.
Remembering them all is tricky, and no one really remembers them all.
Mostly every program, therefore, implements at least one of these two flags: `-h` and `--help`.
These flags print out help files that tell you the purpose of the program, the arguments it expects, and its various flags.

```shell
$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
  -A, --almost-all           do not list implied . and ..
      --author               with -l, print the author of each file
  -b, --escape               print C-style escapes for nongraphic characters
# ...

$ diff --help
Usage: diff [OPTION]... FILES
Compare FILES line by line.

Mandatory arguments to long options are mandatory for short options too.
      --normal                  output a normal diff (the default)
  -q, --brief                   report only when files differ
  -s, --report-identical-files  report when two files are the same
  -c, -C NUM, --context[=NUM]   output NUM (default 3) lines of copied context
  -u, -U NUM, --unified[=NUM]   output NUM (default 3) lines of unified context
  -e, --ed                      output an ed script
#...
```

You'll see a couple of interesting patterns when describing the syntax: some of the options are surrounded by brackets. 
These are optional arguments, and aren't required.
`ls` doesn't require any files; by default, it uses the current directory.
`diff` on the other hand does require files, so these are required.

Also, you'll see that the argument descriptions are completely capitalized.
This tells the user that they don't need to literally type "FILES" in the command line, but rather that they should type the name of the files they want to compare.


## Redirection

When I was talking about programs like `echo` and `cat`, I said that they sent their output to the terminal.
That's not exactly true; in fact, they send their output to *standard output*, which just happens to be *redirected* to the terminal.

That sounds overly complicated, but it's really not.
Standard input and standard output are just communication channels that text or other data can move through.
When running a single command, standard input is connected to the terminal as keyboard input, and standard output is connected to the terminal as text output.
However, these streams of communication can be redirected to several different locations.

### Basics of Redirection

The `>` character tells the terminal to output standard output to a file.
Any output from the command preceding the `>` is redirected to a file.

```shell
# Echo some data into a file
$ echo "This is my data." > out.txt

# Copy the current directory's contents into a file
$ ls > out.txt
```

There is also another output channel, just to make things more confusing: *standard error*.
Any errors that occur while processing data is output to standard error.
It's very useful when you have a command that is writing standard output to a file but fails; this way, you can see the error without it contaminating your file.

There are often cases when you want to redirect standard error to a file as well.
This is especially useful when someone wants to see an error message that you're getting, or if you want to save the message to look at it later.
To do this, you use the same syntax as you'd use for redirection to standard output, except this time, use `2>`.

```shell
# On any command that is going to fail
$ diff 2> out.txt
```

### Deep Redirection Magic

We've been talking as if files and output streams are two separate things, but they're technically not in the Linux world.
You can output *to* an output stream if you like, although this really only has one use case: merging standard output and standard error.
To reference the standard output stream as if it's a file, use `&1`. 

```shell
$ diff 2>&1 > out.txt
```

This command redirects standard error to standard output, then redirects standard output (which now includes standard error) to out.txt.

### Standard Input Redirection

Using *standard input* is very similar to standard output, except the other way around: you read from a file and put its contents into a program.
Programs that read from standard in can also accept input directly from the terminal.
In the below example: `<-` represents data typed into the terminal, and `->` represents the output from `cat`.

```shell
$ cat
# <- Hello
# -> Hello
# <- World
# -> World
# ...

$ echo "Hello World" > file.txt
$ cat < file.txt
Hello world
```

## Pipes

We've seen how streams can be connected to programs in both directions.
Programs can also be connected to *each other*.
These use the *pipe character* (|) to "pipe" data between two programs.
This works by connecting the standard output of the first program to the standard output of the second.
This example uses the `wc` (word count) program with the `-l` flag to count lines instead.

```shell
$ cat file.txt | wc -l
17 # or whatever
```

Piping or "chaining" commands together is what really makes the command line powerful.
With just a handful of commands, you can manipulate data in complex ways.
For example, if you wanted to see how many files in the current directory are files, you can run the following command.
It uses `grep` to search for a pattern and leave in only lines matching that pattern.

```shell
$ ls | grep txt | wc -l
17
```

Of course, you can combine redirection and pipes in more complex ways.
Let's say that you wanted to run a program, include any error messages in the output, filter it only to lines that include the word "token," and then output that to a file.
This is a complex request, but the command to do it is very short:

```shell
$ my_program 2>&1 | grep token > out.txt
```

Doing this with a graphical program might be more intuitive if you're used to it, but it won't be nearly as robust.
This approach that I've written above will work with *any* program on *any* Linux (or similar Unix-like system) machine, even if the program authors never thought about this particular use case.

## Circling Back to the Unix Philosophy

The command line has been around since before computers had screens, and it wasn't until 1973 that the concept of pipes was formally introduced into the shell.
However, a lot of modern idioms in Unix-y command lines come from the designs of the original Unix.
The creators of Unix, Ken Thomson and Dennis Ritchie, codified a lot of their design decisions into the Unix philosophy.
Other sources can give you a much more detailed look than I can into the Unix philosophy; [the Wikipedia page](https://en.wikipedia.org/wiki/Unix_philosophy) is a good place to start.
However, I'll provide a short summary here.

The basic idea is this: "do one thing and do it well."
Rather than creating a program that does everything, make a lot of small programs that when chained together do everything.
This emphasizes the design philosophy of *composability*, where complex tasks can be accomplished by composing several small programs together.

Another way of thinking of the Unix Philosophy (this term coined by Andrew Hunt and David Thomas in their book *The Pragmatic Programmer*) is by designing "small, sharp tools."

Other parts of the Unix philosophy are concerned more with programmers and the tools they build, rather than the end users.
For example, it emphasizes simplicity of implementation over speed, since more complex code has more places for bugs to enter.

The main point is that building a large system out of smaller parts is much easier and more reliable than building a large system as a monolith.
This is the basic principle between the design of the modern (heh) command line.

## Next Up

My next post will go into more detail about some specific command-line programs that I find very useful.
They might not be the most useful programs for you, and you might find some different programs more useful than I.
That's fine!
One of the great things about Linux is that each system can be tailored to each user.
My setup doesn't have to look mostly like anyone else's, and neither does yours.
