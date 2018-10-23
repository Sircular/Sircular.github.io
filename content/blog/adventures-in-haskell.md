---
title: "Adventures in Haskell"
date: "2017-12-08"
categories:
    - Programming
---

Something has possessed me to learn Haskell. I'm not sure what exactly, but it must be an evil, illogical demon, since none of my courses nor my possible internships use Haskell. Additionally, I am convinced that Haskell programmers have an IQ of at least 170 (which I most certainly do *not* have), so it's probably an impossible task. Nonetheless, I shall soldier on.

My first thought was to attempt to port a working program to Haskell. I recently completed some assignments including problems that are somewhat practical, and I thought that perhaps porting one of those (in this case, an application to analyze simple weather data) would be useful.

The task is this: given two sets of data collected from different weather stations (which may or may not be in chronological order), determine which stations are missing entries and detect when there are discrepancies between the two. This is a rather procedural task, so Haskell may not be the best choice, but the interesting blend of functional and procedural code that I got out of this seems like it would be common in "real world" Haskell.

I'll post two sections of the code: one where I explain each of the sections, and one where all the code is grouped together. If you are just interested in the end result, feel free to skip the first section.

## Explanation

The first section imports the different libraries and defines function "prototypes" (I'm not sure if that's what they're called, and if any Haskellians could let me know, I'd appreciate it.).

```haskell
import Data.Function
import Data.List

import System.Environment
import System.IO

parseEntry :: String -> (String, Double)
getEntries :: String -> IO [(String, Double)]
sortEntries :: [(String, Double)] -> [(String, Double)]
processEntries :: [(String, Double)] -> [(String, Double)] -> IO ()
```

Here is the implementation of the main function:

```haskell
main = do
    args <- getArgs
    if length args < 2 then
        putStrLn "Usage: weather <file1> <file2>"
    else do
        e1 <- getEntries (head args)
        e2 <- getEntries (args !! 1)
        processEntries (sortEntries e1) (sortEntries e2)
```

One of the things I love about Haskell is its readability. This gets the arguments that I pass to my program, determines if there are enough, then uses those names as file paths to read entries (there is no error checking; that's something I need to learn how to do if I want to do any real programming). It then sorts those entries, and then processes them.

Here are the bodies of my other functions:

```haskell
parseEntry str = case words str of [s,d] -> (s, read d :: Double)

getEntries fname = do
    contents <- readFile fname
    let entries = map parseEntry $ tail (lines contents)
    return entries

sortEntries = sortBy (compare `on` fst)

processEntries _ [] = return ()
processEntries [] _ = return ()

processEntries (f:fs) (s:ss) 
    | fst f > fst s = do
        putStrLn ("Missing entry in first file at " ++ fst s)
        processEntries (f:fs) ss
    | fst f < fst s = do
        putStrLn ("Missing entry in second file at " ++ fst f)
        processEntries fs (s:ss)
    | snd f /= snd s = do
        putStrLn ("Discrepancy of " ++ show (abs (snd f - snd s)) ++ " at " ++ fst f)
        processEntries fs ss
    | otherwise = processEntries fs ss
```

The first function, parseEntry, accepts a string and returns a tuple containing a String and a Double. It parses the raw string and converts it into a pair that contains the date and the temperature on that date. GetEntries is a helper function that accepts a filename and returns a list of parsed entries. Sort entries does exactly what it says on the tin: it sorts the date.

The final one, process entries, is probably the most complex function in the program. Even it is simple: given two lists of (String, Double) tuples, it processes them and determines if any entries are missing from either file. This is almost inherently a procedural process, and my C implementation used loops to accomplish this. 

Instead, I used recursion, following a pattern that I've seen in a few other Haskell programs: splitting the list into its first element and its tail. This way, if I realize that I need to process the first element again (which happens, in this case, when a file is missing an entry), I can simply join it back to the list with either `(f:fs)` or `(s:ss)`. Despite my initial hesitation about implementing this process recursively, I find that the new version is extremely readable.

The two patterns that I include are the base cases, which stop recursion if either of the lists are completely emptied. While this could possibly cause problems if there is a missing entry at the end of the file, for simplicity the assignment did not include that particular edge case.

## Full Code

Here's the entire source of my program:

```haskell
import Data.Function
import Data.List

import System.Environment
import System.IO

parseEntry :: String -> (String, Double)
getEntries :: String -> IO [(String, Double)]
sortEntries :: [(String, Double)] -> [(String, Double)]
processEntries :: [(String, Double)] -> [(String, Double)] -> IO ()

main = do
    args <- getArgs
    if length args < 2 then
        putStrLn "Usage: weather <file1> <file2>"
    else do
        e1 <- getEntries (head args)
        e2 <- getEntries (args !! 1)
        processEntries (sortEntries e1) (sortEntries e2)

parseEntry str = case words str of [s,d] -> (s, read d :: Double)

getEntries fname = do
    contents <- readFile fname
    let entries = map parseEntry $ tail (lines contents)
    return entries

sortEntries = sortBy (compare `on` fst)

processEntries _ [] = return ()
processEntries [] _ = return ()

processEntries (f:fs) (s:ss) 
    | fst f > fst s = do
        putStrLn ("Missing entry in first file at " ++ fst s)
        processEntries (f:fs) ss
    | fst f < fst s = do
        putStrLn ("Missing entry in second file at " ++ fst f)
        processEntries fs (s:ss)
    | snd f /= snd s = do
        putStrLn ("Discrepancy of " ++ show (abs (snd f - snd s)) ++ " at " ++ fst f)
        processEntries fs ss
    | otherwise = processEntries fs ss
```

I'm sure that any Haskell purist would reel back in horror upon encountering this code, but dammit, I worked hard on this. It's significantly shorter than my original C implementation (which clocks in at 140 lines of code, including comments and whitespace).

Overall, I'm impressed by Haskell's terseness balanced with good readability. I look forward to actually finding an application for this.
