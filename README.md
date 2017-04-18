# Mastodon Lang Remover

Remove a lang from the mastodon web interface.

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

By default, the script remove Japanese toots, but you can remove another langage

Just go to settings/preferences, and edit the "Lang Remover" on the bottom of the page. Click on "save changes", and you can remove this one.

## How it's work ?

The script call a NodeJS server usinge Google Translate API to detect toot langage, he give a JSON array like that :

https://obscure-fjord-89228.herokuapp.com/lang/obrigado

```
{"lang":"pt"}
```
