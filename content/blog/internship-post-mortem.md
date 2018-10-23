---
title: "Internship Post-Mortem"
date: "2018-08-07"
categories:
  - Personal
  - Programming
---

On Friday I finished my internship at CBOE.  Quite honestly I'm going to miss
working there; I learned a lot, both from my coworkers and from the codebase.
In this post I'm going to go over what I liked (and disliked) about my summer
internship.

## The Known Unknowns

Going into this internship, I knew that I would have to learn how to properly
develop software with others.  Most of my prior experience involved me writing a
program to solve a problem or complete an assignment.  Once I was done with the
code, it was finished, and rarely would I make any further changes.  This
experience was fine as far as it went, but I knew it wouldn't scale.

Going into my internship, I knew that I would have to learn how to effectively
use version control; how to effectively compromise my own ideas and style with
precedents set by others; and most importantly, how to read others' code.  I
knew that code written in a large codebase was written first and foremost with
other programmers in mind.  In my own personal projects, it didn't matter how
many cool tricks I used, but in a large codebase, readability and clarity trumps
all else.

I wasn't disappointed on this front.  Although CBOE does version control a
little differently than some other companies, I found it relatively
straightforward to merge in my changes.  It certainly helped that most of my
projects involved code that others weren't using, so merge conflicts weren't a
concern.

I didn't really understand how important unit and integration tests were until I
had to work with code that leveraged them (or didn't).  Code with tests is so
much easier to understand, because there are examples of desired behavior.  It's
also more fun to poke around in, because you can rest assured that good tests
will tell you if you've broken from desired behavior.  These experiences spoiled
me; I can't go back to reading code without tests (although that doesn't mean
that I now enjoy writing them).

I learned that a lot of constructs that I use often (such as generators in
Python) can be very inconvenient for people that aren't used to working with
them.  Even though there were a few places where I think a generator (or a
similarly high-level construct) would have been a perfect fit, I now had to
think about consistency with the rest of the codebase.

And the reading.  *My God, the reading.*  Working with my own code, or even
occasionally with others' code, I would generally read about three lines for
every line that I wrote.  At CBOE, that ratio was closer to 20:1.  Several of my
projects involved modifying or improving existing code, so I needed to read the
code (and often underlying API and framework code) in its entirety to properly
understand my task, let alone its implementation.  Even my "green field"
projects still had to conform to and interact with the rest of the codebase.

While I did expect to learn all these lessons, there were several other lessons
that came as a surprise.

## The Unknown Unknowns

As with all new experiences, there were some aspects of this internship I didn't
anticipate.  Most of them were software-development-related, but a few had more
to do with, for lack of a better phrase, workplace conduct.  I'm sure none of
these are very surprising to people that have worked in industry, but they were
eye-openers for me.

I thought that I knew design patterns.  How wrong I was.  I had a vague grasp of
many of the [Gang of Four's Design Patterns][1], but knowledge and application
are sometimes very different.  Furthermore, I learned that paradigms can be
considered (large) design patterns, and that some paradigms are better-suited to
certain problems than others.  I'm sure this one comes down to personal
experience; I learned to program in Java, and even when I moved to Python and
other languages I maintained an object-oriented approach.  However, for some of
my projects, a procedural style was clearer.  I didn't realize this until one of
my coworkers pointed it out in a code review, when I rewrote my code to be more
procedural, it was simpler, clearer, and shorter.

I also thought that I had a fairly good idea of my role as "just an intern": fix
bugs, write some small scripts, and do as much learning as possible.  That was
very far from the truth.  The software development part of CBOE, while it does
have a defined hierarchy, is very free-form as far as decision-making is
concerned.  Even as a lowly intern, I had final say over the implementation
details of my code.  I was expected to know when I had chosen rightly or
wrongly, even if the person doing my code review disagreed.  I was pleasantly
surprised; I had expected CBOE to be far more bureaucratic than it was.

## Intern-ly Duties

*This section is very subjective, so please take it with a grain of salt.*

No job is perfect.  No internship is perfect either.  There were several
negative aspects of my internship at CBOE, but almost all of them were centered
around the fact that I was an intern.  My weekly schedule involved any number of
classes, icebreakers, and occasional presentations.  I think that these have
value, but I also think that I would have gotten more out of the internship if I
had more time to do real work.

Don't get me wrong; the classes were useful.  Although I didn't go into this
internship with a rabid curiosity of the stock and options market, I came away
with a better appreciation of the financial world.  They were even more valuable
as context for the problems I was solving.

The icebreakers and presentations on the other hand... were less valuable for
me. I understand the value of presentations, but I don't understand why it's
necessary to fly all the Kansas City interns out to Chicago to give them in
front of high-level executives.  The Chicago trip, while very useful for some of
the other interns, was unproductive for me.  This may be the solitary, brooding
programmer in me, but I'd rather discuss ideas than try to network.

## Conclusion

Given the choice, I would do this internship all over again.  I worked with
fantastic people, both managers and coworkers, that taught me more than I
thought I could learn in a summer.  I got to solve interesting problems, and
learned a lot about computer science in the industry as opposed to academia.
Even though I didn't enjoy many of the intern-specific aspects, I still found
the overall experience worthwhile.

Would I recommend this internship for someone else?  Absolutely.  If you want to
solve hard problems and work with good people (and who among us doesn't), CBOE
will offer you that opportunity.

I'm not going back next summer, but not because I didn't enjoy it; I just want
to get more experience working with different types of companies.  I have a
hunch that CBOE will rank highly among them.

[1]: <https://www.amazon.com/Design-Patterns-Object-Oriented-Addison-Wesley-Professional-ebook/dp/B000SEIBB8> "Design Patterns: Elements of Reusable Object-Oriented Software"
