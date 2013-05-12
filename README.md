# Super-Cache
Control caching behavior on the client side!

## Features

 * Override caching policy that has been set on the server.
 * Select a host on which the caching is required and all requests from a page with that host will be cached.
 * Caching of static content which are on a different host will also be cahed _(read Note for further explanation)_
 

**Note:** say you have a site _example.com_ on which you have set a caching policy thru the extension.
Now if the any page on _example.com_ links to external scripts and sites which are on a different domain such as static.example.com or ajax.googleapis.com, the extension will automatically apply the same caching behavior as that of _example.com_


Grab it from [Chrome Webstore](https://chrome.google.com/webstore/detail/super-cache/fglobbnbihckpkodmeefhagijjcjnbeh)