---
title: "Gui Composability"
date: 2018-10-24T22:13:26-05:00
draft: true
categories: ['Programming', 'Linux']
---

The Bourne shell was developed for UNIX in 1977 and has remained largely
unchanged since.  The largest thing added to `/bin/sh` since 1977 was support
for functions; all other additions added conveniences and syntactic sugar.  Even
though most users of modern Unices tend to favor other shells, the influence of
the Bourne shell is evident in most (if not all) of them.

What made the Bourne shell so tenacious that even Generation Z computer science
students are still taught the basics?  I posit that it's two things: *scripts*
and *pipes*.  Pipes allow you to "connect" two commands together, i.e.  "piping"
the output of one into the input of another, allowing simple commands to be
*composed* together.  Scripts are more complex, and allow for tasks in which one
command must be run sequentially.  Most problems that can be solved with one can
be solved with the other, but each has different strengths.

These two features allow small, general-purpose commands to be combined to do
large, complex, or specialized tasks.  Not only that, but *people that don't
necessarily understand the internals can still write useful and powerful scripts
and command chains.* This is why the Bourne shell and its derivatives stuck
around for so long.

Compare this with modern GUI programs.  They're generally larger than
command-line tools, attempt to be general-purpose (within their domain), and
often incorporate many features.  Additionally, it's difficult to chain them
together without a good deal of manual labor.

## Accounting for the Unexpected

Consider an example: imagine a GUI accounting program.  This program tracks
various accounts that can be in different currencies or commodities.  The
relative value of these currencies may fluctuate.  Imagine that you want to
graph the market value (in dollars) of a particular commodity, say, an index
fund.  You might navigate to the account holding that fund and find a button
that says "Graph."  The designer of this program would have to both a) realize
that the user might want to track the price of a commodity over time *and* b)
realize that the user may want to graph it.  The designer would then have to
implement these two systems (perhaps pulling in a library to do graphing) and
then connect them together.  You can do little outside of what the designer
anticipated.

Contrast this with a CLI approach.  Suppose there are two programs: one does
various accounting tasks, and another draws graphs.  To achieve your goal of
graphing the market value of an account over time, you would use both commands.
You would tell the first command that we wanted the market value of x account
over time, and the second command how to interpret the columns of data output by
the first.  Neither one has to know anything about the implementation of the
other.

Now, suppose that you wanted to do something... *weird.*  Like express the value
of your account in terms of ounces of gold, given the market value of both your
find and of gold.  With the CLI, as long as the accounting program can figure
that out, graphing it is no problem: just pipe that output into the graphing
program.  But although the GUI accounting program may be able to express one
commodity in any other commodity, it most likely wasn't set up to graph two
independent commodities in terms of each other.  It's easy to see why
composability is useful in this scenario.

But if you really wanted to, you could still use GUI tools to get that graph.
You could, say, export the market value of gold into a `.csv` file, export the
market value of your account into another, import both into a spreadsheet
program, and then draw your graph with that.  You've essentially done manually
what the CLI did automatically.

Conversely, a "composable" GUI system would allow you to connect two unrelated
widgets in any conceivable way, like a CLI system allows.

### Hidden Complexity

Of course, I've glossed over some of the functionality required to compose
command-line tools: the format for data exchange.  Every command-line tool is
concerned with data input and output.  In our previous example, the accounting
program needed to output data in a way that was readable by the graphing
program.  When designing for a CLI, determining a data format is relatively
straightforward: since all interaction takes place through text, plain text is
an acceptable format.

Of course, not all GUI data can be represented with plain text. For example, how
would you represent a graph using purely textual data?  What about something
like Microsoft's WordArt (do we still use that)?  While both of these could be
represented as images, there is other data that would require more complex
representations.  Structured text might be feasible, but I shudder to think
about how programmers would cram a complex graph representation into XML.

## A Node-Based Approach

So far, we've discovered that having a completely text-based approach is
inadequate for making GUI programs with the same composability as shell scripts.
We need a data interchange format that can handle many types of data, and can
coerce one to another easily.  Where has this been done before?

The [Blender](https://www.blender.org/) 3D suite has, among other things, a node
editor.  These nodes can be used either for material creation or for image and
video compositing.

(TODO: Input image of material created with nodes)

You can see that there are several different node types.  In this image, gray
nodes represent scalar values, blue nodes represent vectors, yellow nodes
represent image/pixel data, and green nodes represent shaders.  This
color-coding makes it intuitive to know which outputs can be connected to which
inputs.  However, certain types of data can be "coerced" to other types of data;
for instance, scalar values can be converted to image data.

Blender isn't the only software using this concept; most 3D software and
compositing software has something similar.  In fact, 
