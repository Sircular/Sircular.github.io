---
title: "Switching to Hugo"
date: 2018-10-22T19:37:56-05:00
categories: 
  - Programming
---

I've been using Jekyll to host this website since I've started it.  I originally
started using it because it's what Github Pages provided, but since I wanted to
use a custom theme, I had to use several hacks to publish a compiled version of
my site to the master branch.  I've finally switched to Hugo, since I figured
that if I was going to have to roll my own publication tools, I might as well
use a site generator that fit with my mental model.

Jekyll is a perfectly good piece of software, and I really enjoyed using it, but
there were a few issues that got me to switch:

* **Lots of special cases.**  To write a post in Jekyll, you had to create a file in
the \_posts directory; the templating engine now knows that these are blog posts
that should be included on the main blog pages.  This hooked into the pagination
system in a way that I'm not sure I could fully explain.  The posts' dates were
determined by looking at the prefixes of the files, rather than setting a
variable in the frontmatter.

    In contrast, Hugo treats *all* pages a little like this: each page in the
    `content/` directory is included in a tree of pages.  Lower directories are
    in their own subsections; this means that everything in the `blog/`
    directory is grouped together, as is anything in any other directory. I find
    this much easier to understand, because there's one general case instead of
    a general case and special case.  Oh, and the publication date is controlled
    by frontmatter, rather than *looking at the filename*.

    Likewise, Hugo's "taxonomy" system is equally general: there can be as many
    different taxonomies as you like (this site only uses `category`), and they
    can all be accessed by name.  I'm not 100% certain that Jekyll doesn't
    support this, but if they do, their docs don't make it apparent.

    There are several other features (*cough* Menus *cough*) that I think Hugo
    does better because it treats them as general-purpose features instead of
    special case features.

* **Combination of presentation and content.**  All static site generators have this
to some extent, whether we like it or not.  What I didn't like about Jekyll was
that all of the website content was in the top-level directory, mixed in with
all the configuration.  Hugo, on the other hand, places all website content in
the `content` directory.  It's a very small difference, but that separation
helps me keep track of which content gets published.

* **Lack of user-friendly tooling.**  Jekyll isn't *bad* in this respect, but I
think Hugo is better.  For example, Hugo has a feature that it calls
"archetypes," which are file templates for new content files.  The default one
just creates a draft page, but you can easily add others.  Which archetype is
used when creating a new page has to do with its subgroup, which is determined
by its directory.

    There are a few other examples of this lack of tooling, but I think the
    archetypes feature most clearly illustrates the differences that I see.

So I've switched!  This is the first post that I'm publishing with Hugo after a
long time setting up my theme (that's what I get for porting a custom theme).
Was it worth it? Yes. (Probably.)
