[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)

# Mastodon Lang Remover

Remove toots from some langages on Mastodon web interface.

## Install

### 1. Install Tampermonkey

On chrome, install the Tampermonkey extension here :
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=fr

On firefox, is should be here :
https://addons.mozilla.org/fr/firefox/addon/tampermonkey/

### 2. Go to this page and click on "install" button : 	

https://github.com/arthurlacoste/mastodon-lang-remover/raw/master/mastodonLangRemover.user.js

### 3. You need to start on a your.instance/web/* page, like :
https://mastodon.social/web/

## Can I edit the langage to remove ?

By default, the script remove Japanese toots, but you can remove others langages.

Just go to settings/preferences on your Mastodon web interface, and edit the "Lang Remover" on the bottom of the page. Click on "save changes", and you can remove others.

## How it's work ?

Magicaly :)

## Changelog

### v1.0.0

- New version without server :)

### v0.0.2
- Not blinking anymore : hiding element before analyze it
- You can select multiples langages to avoid
- bug : analyze first 200 chars (more is not possible with this API, about japanese toots)

### v0.0.1
- first commit
