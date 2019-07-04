---
title: "Quick Tip: Lazy Loaded Values in C#"
date: 2019-07-03T20:00:55-05:00
categories: ["Programming"]
---

At my internship, I've been spending the past few weeks overhauling the
authentication and authorization for all of the company's internal applications.
The new authorization system uses a third-party service that handles all of the
niceties of logging in, two-factor authentication, synchronization with Active
Directory permissions, and all the other fluff.  All we have to do is set up
authentication with [OpenId Connect][1] and receive access and id tokens from
our third-party provider.  For the most part this is already handled for us
through existing middleware, but there are a couple of special cases that
require custom handling.

There are certain cases where an application requires authentication without
being able to open a web browser.  OpenId supports the [Resource Owner Password
Grant Flow][2], which is a fancy way of saying that the application can
absolutely be trusted with the username and password of the user.  Since these
accounts just give access to internal systems, this isn't much of an issue.
However, to increase security, the responses from the authentication service
should be verified.  Part of this process involves a *signing key,* which
ensures that the tokens that the service issued haven't been modified by some
other party.

Signing keys can change at any time, which means that any cache that contains
them must be kept up to date.  I considered using Microsoft's own in-memory
cache, but found that it was cumbersome to use.  What I really wanted was a way
to define a value that would keep itself up-to-date without me having to worry
about it.  This is the code I came up with to generalize that idea:

```csharp
using System.Threading;

namespace Utilities
{
    public class AsyncCache<T>
    {
        private DateTimeOffset? lastLoaded;
        private TimeSpan timeout;
        private Func<Task<T>> loader;
        private T item;

        public AsyncCache(TimeSpan timeout, Func<Task<T>> loader)
        {
            this.timeout = timeout;
            this.loader = loader;
        }

        public async Task<T> GetValue()
        {
            var current = DateTimeOffset.Now;
            if (!lastLoaded.HasValue || (current - lastLoaded.Value) > timeout)
            {
                await Reload();
            }
            return item;
        }

        public async Task Reload()
        {
            item = await loader.Invoke();
            lastLoaded = DateTimeOffset.Now;
        }
    }
}
```

An `AsyncCache` class can be created to contain any type, including both
reference and value types.  When it's created, it accepts a timeout and a
function that returns type `T` asynchronously.  Then, whenever `GetValue` is
called, it checks to see if the item has been loaded and whether or not the
timeout is expired.  If necessary, it invokes the `loader` function and then
caches that value, resetting the timeout.

Sometimes a signing key might change with time still left on the timeout.  If
this happens, it might be necessary to reload the signing key manually.  In that
case, the code using this class can simply call the `Reload` method.

Here's an example of creating and using the `AsyncCache` class:

```csharp
var cachedKey = new AsyncCache<string>(TimeSpan.FromMinutes(5), async () =>
{
    var httpClient = new HttpClient();
    return await httpClient.GetStringAsync(url);
});

string signingKey = cachedKey.GetValue();
```

This isn't the ideal solution.  Since the value is lazy-loaded, it will
definitely cause some delay when the value is actually requested.  I would like
to have a good way of triggering the loading when the `AsyncCache` is first
instantiated, but I haven't yet found a way that doesn't introduce
synchronization issues.

I hope this has been useful to someone.  If you have any questions or
suggestions, please get in touch!

[1]: https://openid.net/connect/
[2]: https://auth0.com/docs/api-auth/tutorials/password-grant
