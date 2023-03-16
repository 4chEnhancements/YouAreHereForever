// ==UserScript==
// @name        NativeNoDerefLinks
// @namespace   76217905864509578956895
// @include     *://boards.4chan.org/*
// @include     *://boards.4channel.org/*
// @version     1
// @grant       none
// Author       Anonymous
// Description  Remove 4chan external url tracking
// ==/UserScript==

function removeDerefLink(n) {
  [...n.querySelectorAll('a[href^="//sys.4chan.org/derefer"], a[href^="//sys.4channel.org/derefer"]')].forEach(a =>
    a.href = decodeURIComponent(a.href.replace(/^(.*?).org\/derefer\?url\=/, '').replace('amp%3B', ''))

);
}
removeDerefLink(document);
new MutationObserver(function (ms) {
  ms.forEach(function(m) {
    [...m.addedNodes].forEach(removeDerefLink);
  });
}).observe(document.querySelector('.thread'), {childList: true});
