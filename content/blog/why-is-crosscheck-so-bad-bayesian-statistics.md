---
title: "Why Is Crosscheck So Bad? Bayesian Statistics"
date: 2019-06-22T16:20:17-05:00
math: true
categories: ["Politics", "Random"]
---

It's June of 2019, and political tensions are at an all-time high.  Fear of
election fraud, either from fears of hacking or double voting, is widespread on
all political sides.  Do you know what this country needs?  Another hot take on
the Interstate Voter Registration Crosscheck system.

## Background

I've seen plenty of excellent criticisms leveled at this system.  For those of
you not familiar with it, the Crosscheck system takes voting records from all
participating states, then checks for any duplicate people.  The stated purpose
is to prevent double voting, which is where one person votes twice, each in two
different states.  The main problem with its system is with *how* it detects
duplicate voters: it compares first name, last name, and date of birth.  That's
it.  It doesn't consider middle name(s), social security numbers, physical
appearance, or any other metric.

There is one main problem with this: *lots of people have common names.*  I
would be willing to bet that there are two "Justin Smith"s living in Kansas
City, MO *alone* without considering all cities in the 27 states that are *still
using* Crosscheck.  It doesn't help that because of the distribution of surnames
in the United States, [white people are underrepresented in matches by 8%, while
people of color can be overrepresented by anywhere from 24% to 45% depending on
racial category.][1] Clearly, this is not an unbiased system.

Oh, and by the way, voter fraud isn't widespread.  I came across [this article
in the Federalist][2] that claims there are "a stunning 18 million invalid voter
registrations on the books."  Their source is [this study from the Pew
Charitable Trust][3], which does indeed include that number, *if you count
people whose addresses have changed as invalid registrations.*  While that
certainly is a discrepancy that needs to be checked, that doesn't mean that
there are 18 million fraudulent votes cast every year.

For a second though, let's pretend that none of that mattered.  Let's pretend
that the metric used to match people was far more accurate, that it still had a
reasonably good change of catching fraudulent votes, and that voter fraud was
very widespread.  *It would still be a bad system.*

## Bayesian Analysis

I don't want to spend too much of this post explaining Bayesian statistics;
[Wikipedia has a pretty good summary of it][4].  In short, given the following
probabilities that:

1. A person has voted fraudulently
2. A person's vote has been marked as fraudulent
3. Given a person has voted fraudulently, they have been marked such

we can determine how likely it is that a person whose vote has been marked as
fraudulent did indeed vote fraudulently.  That's a lot, so I'm not going to use
the formula, but rather a verbal explanation of it.

Let's set up some probabilities as an example.  Let's say that:

1. If you voted legitimately, Crosscheck has a 0.1% chance of marking you
fraudulent
2. If you voted fraudulently, Crosscheck has a 99% chance of marking you
fraudulent, and
3. 1 in 1000 people vote fraudulently.

Now let's apply those probabilities to a sample of one million people.

1. 99% of fraudulent votes are caught: that's 990 votes.
2. 0.1% of legitimate votes are marked fraudulent: that's 999 votes.

Even with extremely effective false-positive and false-negative rates, a greater
number of legitimate votes is marked as fraudulent.  The numbers are close to
equal, but this still shows that even with quite high rates of voter fraud, a
system like Crosscheck needs to be extremely reliable to be effective at all.
In practice?  [This study][5] suggests that for every fraudulent vote prevented,
approximately 300 legitimate votes are rejected.

That doesn't sound like democracy to me.

[1]: https://web.archive.org/web/20190511082031/https://www.healthofstatedemocracies.org/factors/intercross.html
[2]: https://thefederalist.com/2016/10/13/voter-fraud-real-heres-proof/
[3]: https://www.pewtrusts.org/~/media/legacy/uploadedfiles/pcs_assets/2012/pewupgradingvoterregistrationpdf.pdf
[4]: https://en.wikipedia.org/wiki/Bayesian_statistics
[5]: https://5harad.com/papers/1p1v.pdf
