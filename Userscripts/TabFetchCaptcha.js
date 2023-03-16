// ==UserScript==
// @name TabFetchCaptcha
// @match *://boards.4channel.org/*
// @match *://boards.4chan.org/*
// @run-at document-idle
// @author Anonymous
// @description Tabbing from message <textarea> will click `Get Captcha` button
// ==/UserScript==
if (document.querySelector('.is_thread')) {
  document.documentElement.addEventListener('focusin', ({target}) => {
    if (target.matches('#qrForm textarea'))
      document.querySelector('#t-load').tabIndex = -1
    else if (target.matches('#t-resp') && !document.querySelector('#t-fg')?.style.backgroundImage
         && document.querySelector('#t-msg')?.textContent !== 'Verification not required.')
      document.querySelector('#t-load')?.click()
  })
}
