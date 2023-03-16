// ==UserScript==
// @name        remove all inlines buttan
// @namespace   Violentmonkey Scripts
// @match       https://boards.4channel.org/*/thread/*
// @match       https://boards.4chan.org/*/thread/*
// @grant       none
// @version     2.0
// @author      -
// @description 16/03/2023, 19:00:00
// ==/UserScript==
 
(() => {
    'use strict'
 
    const updateRemovalLink = (parentNode) => {
        const prev = parentNode.querySelector('.removal-link')
        if (prev) {
            parentNode.removeChild(prev)
        }
        const el = Object.assign(document.createElement('a'), {
            textContent: ' RM',
            classList: 'removal-link',
            href: 'javascript:;',
        })
        el.addEventListener('click', () => {
            el.parentNode.querySelectorAll('.inlined')
                .forEach(inlined => inlined.click())
            el.parentNode.removeChild(el)
        })
        if (parentNode.querySelectorAll('.inlined').length) {
            parentNode.appendChild(el)
        }
    }
 
    const config = { childList: true, subtree: true }
    const callback = (mutationsList) => {
        const [one, two] = mutationsList
        if (
            mutationsList.length === 1
            && one?.removedNodes[0]?.classList?.contains('inline')
            && one.previousSibling?.classList?.contains('container')
            && one.previousSibling?.firstChild?.classList?.contains('backlink')
        ) {
            updateRemovalLink(one.previousSibling)
        } else if (
            mutationsList.length === 2
            && (one.target?.classList?.contains('postInfo') || one.target?.classList?.contains('post'))
            && two.addedNodes[0]?.classList?.contains('postContainer')
            && one.previousSibling?.classList.contains('container')
            && one.previousSibling?.firstChild?.classList.contains('backlink')
            && !one.previousSibling?.firstChild?.classList.contains('removal-link')
        ) {
            updateRemovalLink(one.previousSibling)
        } else {
            for (const mutation of mutationsList) {
                if (
                    mutation.type === 'childList'
                    && mutation.target?.classList.contains('container')
                    && (mutation.addedNodes[0]?.classList?.contains('backlink') || mutation.addedNodes[1]?.classList?.contains('backlink'))
                    && !mutation.addedNodes[0]?.classList?.contains('removal-link')
                    && !mutation.addedNodes[1]?.classList?.contains('removal-link')
                ) {
                    updateRemovalLink(mutation.target)
                }
            }
        }
    }
    const observer = new MutationObserver(callback)
    observer.observe(document.querySelector('.thread'), config)
})()