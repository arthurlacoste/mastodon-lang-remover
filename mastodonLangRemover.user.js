// ==UserScript==
// @name         mastodonLangRemover
// @namespace    https://arthurlacoste.com
// @version      0.0.4
// @description  Remove a lang from web interface
// @author       Arthur Lacoste <arthak@gmail.com>
// @match        *://*/web/*
// @match        *://*/settings/preferences
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://raw.githubusercontent.com/pietrasiak/jquery.initialize/master/jquery.initialize.min.js
// @connect      detect-lang-api.irz.fr
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
	'use strict';

	$(".status").initialize(function () {

		// prevent displaying toot by hidding it
		$(this).hide();
		getTranslation($(this));
	});

	/*
	 * getTranslation() analyze status content and deducts
   * langage. If GM_getValue('lang') not include this langage,
	 * it display the toot.
	 * toot: .status element
	 */
	function getTranslation(toot) {
		var langText = {};
		var text = 	toot.children('.status__content').text()
		.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // remove links
		.substring(0, 200) // analyze first 200 chars (more in japananese don't work !)
		.replace(/\#\w\w+\s?/g, '') // remove hashtags words
		.replace(/\@\w\w+\s?/g, ''); // remove mentions
		text = encodeURIComponent(text);

		// ask langage from server (json)
		GM_xmlhttpRequest({
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			},
			url: "https://detect-lang-api.irz.fr/lang/"+text,
			onload: function(res) {
				var resJson = JSON.parse(res.responseText);
				langText = resJson.lang;
				if(GM_getValue('lang', ['ja']).includes(langText)) {
					console.log(langText + '==RM--' + text);
				} else {
					toot.show();
					console.log(langText + '==' + text);
				}
			},
			onerror: function() {
				toot.show();
				console.log('There was an error');
			}
		});
		return String(langText);
	}

	/*
	 * saveSettings() save selected values by user in /settings/preferences
	 * event: click
	 */
	 function saveSettings(event) {
		if (event.target.tagName.toLowerCase() === 'button') {
			event.preventDefault();
			//var input = document.getElementById('translation_locale');
			//var selectedLanguage = input.options[input.selectedIndex].value;
			var selectedValues = [];
			$("#translation_locale :selected").each(function(){
				selectedValues.push($(this).val());
			});
			//alert(selectedValues);

			GM_setValue('lang', selectedValues);

			setTimeout(function() {
				document.querySelector('body').removeEventListener('click', saveSettings, false);
				actions.children[0].click();
			}, 500);
		}
	}

	if (window.location.pathname === '/settings/preferences') {
		// We're on the settings page
		var form = document.querySelector('form.simple_form');
		var actions = document.querySelector('div.actions');

		var settingsGroup = form.querySelector('div.fields-group').cloneNode(true);
		settingsGroup.children[1].remove(); // Remove the privacy element from the clone

		var notice = document.createElement('div');
		var noticeMsg = 'Select here the langage you want to remove.';
		notice.setAttribute('id', 'translation_notice');
		notice.innerHTML = '<h3 style="color: #d9e1e8; font-size: 20px; line-height: 24px; font-weight: 400; margin-bottom: 20px;">Lang Remover</h3><p style="margin-bottom: 20px;">'+noticeMsg+'</p>';

		var languageDiv = settingsGroup.children[0];
		languageDiv.classList.remove('user_locale');
		languageDiv.classList.add('translation_locale');
		var label = languageDiv.children[0].children[0];
		label.setAttribute('for', 'translation_locale');
		label.textContent = 'Language to remove';
		var input = languageDiv.children[0].children[1];
		input.setAttribute('multiple','');
		input.setAttribute('name', 'user[translation]');
		input.setAttribute('id', 'translation_locale');
		input.setAttribute('style', 'height: 300px; max-height: 300px;');

		settingsGroup.insertBefore(notice, languageDiv);
		form.insertBefore(settingsGroup, actions);

		var selectedValues = GM_getValue('lang', ['ja']);
		$("#translation_locale").val(selectedValues);

		document.querySelector('body').addEventListener('click', saveSettings, false);
	}

})();
