(function() {

var FramerSite = {};

var _downloadLink = null;

FramerSite.getDownloadLink = function(callback) {

	if (_downloadLink) {
		return callback(_downloadLink);
	}

	var sparkleHost = "//s3.amazonaws.com/studio.update.framerjs.com"
	var downloadHost = "http://studio.update.framerjs.com"

	$.get(sparkleHost + "/latest.txt?date=" + Date.now(), function(result) {
		
		_downloadLink = downloadHost + "/" + result;

		if (window.mixpanel && window.mixpanel.get_distinct_id) {
			_downloadLink += "?mp_id=" + mixpanel.get_distinct_id();
		}

		callback(_downloadLink)
	})
}

FramerSite.doDownload = function() {
	FramerSite.getDownloadLink(function(downloadLink) {

		// Resirect to the download link in one second
		setTimeout(function() { window.location = downloadLink; }, 3000)

		// Record the event in google analytics
		if (window.ga) {
			ga('send', 'event', 'Download', 'Framer Studio', downloadLink)
		}

		// Record the event in mixpanel
		if (window.mixpanel && window.mixpanel.track) {
			mixpanel.track("page.download", {
				"title": document.title,
				"url": window.location.pathname,
				"link": downloadLink
			})
		}

		// Record the event in gosquared
		if (window._gs) {
			_gs('event', 'Download', {'Name': 'Framer Studio', 'Link': downloadLink});
		}
		
		// Record the download event in Twitter
		if (window.twttr) {
			twttr.conversion.trackPid('l5elj');
		}
	})
}

FramerSite.verifyEmailAddress = function(email, callback) {

	function validateEmail(email) {
    	var re = /\S+@\S+\.\S+/;
    	return re.test(email);
	}
	// Trim the whitespace
	email = $.trim(email);
	callback({address:email, did_you_mean:null, is_valid:validateEmail(email)});


	// This function verifies the email address and will return a response like:
	// {address: "koen@mac.com", did_you_mean: null, is_valid: true, parts: Object}
	// It might also return "timout" if it could not verify the email for more than 5 seconds

	// var success = false;
	// var mailGunApiKey = "pubkey-6aa8daa73bf18270e2e1586cbbccbcdd";

	// // Trim the whitespace
	// email = $.trim(email);

	// // Start the request to mailgun
	// $.ajax({
	// 	type: "GET",
	// 	url: 'https://api.mailgun.net/v2/address/validate?callback=?',
	// 	data: {address:email, api_key:mailGunApiKey},
	// 	dataType: "jsonp",
	// 	crossDomain: true,
	// 	success: function(data, status_text) {
	// 		success = true;
	// 		callback(data);
	// 	}
	// });

	// // Set a timeout function so we always get some result
	// setTimeout(function() {
	// 	if (success) {
	// 		return;
	// 	}
	// 	callback("timeout")
	// }, 5000);

}

FramerSite.registerNameAndEmailNewsletter = function(name, email, callback) {
	// Sign up this person for our email news letter
	$.ajax({
		url: "http://podium.createsend.com/t/d/s/jujtid/",
		method: "POST",
		dataType: "jsonp",
		data: {"cm-name": name, "cm-jujtid-jujtid": email},
		success: function(data) {
			callback(data);
		}
	});
}

FramerSite.registerNameAndEmailMixpanel = function(name, email, callback) {
	if (!window.mixpanel || !window.mixpanel.get_distinct_id) {
		return;
	}
	mixpanel.identify(mixpanel.get_distinct_id())
	mixpanel.people.set_once({
		"$name": name,
		"$email": email
	});
	// mixpanel.people.set_once(MixpanelExperiments.listExperiments("experiments."));
}

FramerSite.registerNameAndEmail = function(name, email, callback) {
	FramerSite.registerNameAndEmailNewsletter(name, email, function() {})
	FramerSite.registerNameAndEmailMixpanel(name, email, function() {})
}

window.FramerSite = FramerSite;

})()
