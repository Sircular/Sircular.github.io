---
title: "The Physics of Impossibly Loud Music"
date: "2018-05-16"
categories:
  - Random
note: This post was inspired very heavily by xkcd's [What If](https://what-if.xkcd.com/) series.
math: true
---

I was re-reading Douglas Adams's *Restaraunt at the End of the Universe*, and I came across one of Adams's many flights of fancy:

> "Disaster Area was a plutonium rock band from the Gagrakacka Mind Zones and
> was generally regarded as not only the loudest rock band in the Galaxy, but
> also as being the loudest noise of any kind at all. Regular concert goers
> judged that the best sound balance was usually to be heard from within large
> concrete bunkers some thirty-seven miles away from the stage, whilst the
> musicians themselves played their instruments by remote control from within a
> heavily insulated spaceship which stayed in orbit around the planet - or more
> frequently around a completely different planet.

I began to wonder *just how loud that actually was*; after all, I've been to concerts that made my ears ring for a couple of days, and those were nowhere near as loud.
So I decided that I would need to do some math to figure this out, because why not.

In my experience, the "best" sound balance is approximately in the middle of the venue.
According to some (slightly sketchy) research, it seems that for open-air venues, the speakers are set to approximately 120 dB at the front row (!!!).
If we assume that the front row is approximately 20 feet away from the speakers, then I would most likely want to be approximately 225 feet away from the speakers.
Additionally, since decibels are a logarithmic scale, every doubling of distance reduces the volume by 6 dB.
This yields an equation for "best sound balance":

$$
120\text{dB} - \left[6 \times \log_2\left(\frac{225}{20}\right)\right] \approx 99.049\text{dB}
$$

So that's the goal volume for our impossibly loud concert.
We also need to account for the "concrete bunker" part.
The noise isolation of construction materials is defined by a given material's "Sound Transmission Class" (STC).
As best I can tell, STC corresponds pretty closely with dB reduction (although high frequencies are generally muted more successfully than low frequencies).
A solid, 8-in. thick wall of concrete seems to have an STC rating of ~54.
Therefore, to reach ~99dB inside the bunker, the volume would need to be ~153dB immediately outside the bunker.
That is some serious volume.

We also need to account for the attenuation of distance. Given that the hypothetical bunker is ~37 miles from the stage, we can calculate the required decibels:

$$
153.049\text{dB} + \left[6 \times \log_2\left(\frac{37 \times 5280}{225}\right)\right] \approx 211.621\text{dB}
$$

*Good Lord.*
That's a lot of volume.
For context, the highest chart that I could find only goes up to 150dB, which is the threshold for eardrum rupture. This concert is about 1234.885 times as loud as a *jet take-off at 25m.*
When I converted this value into air pressure, it clocks in at *over 7 atmospheres.*

That's a lot of power.
