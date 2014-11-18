

getParameterByName = (name) ->
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
	regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
	results = regex.exec(location.search)
	(if not results? then "" else decodeURIComponent(results[1].replace(/\+/g, " ")))

loadScript = (path, callback) ->
	$.ajax
		url: path
		dataType: "text",
		success: (data) ->
			eval(data)
			callback(data)
		error: (err) ->
			console.log "err", err
			callback(err)


$(document).ready ->

	exampleName = getParameterByName "name"

	# Set the base dir so images load
	$("head").append $("<base href=\"/static/examples/#{exampleName}/\">")
	$('head').append $("<link rel=\"stylesheet\" type=\"text/css\" href=\"/static/examples/#{exampleName}/framer/style.css\">")

	loadScript "framer/framer.js", ->
		loadScript "app.js", ->


	showExample = (exampleName) ->
		if ga?
			ga("send", "pageview", "/examples/#{exampleName}")

		$("#code").attr "src", "code.html?name=#{exampleName}"
		$("#example").attr "src", "/example/index.html?name=#{exampleName}"
		# $("a.download").attr "href", "/static/examples/#{exampleName}.zip"

	if not window.location.hash[1..]
		window.location.hash = "carousel-onboarding.framer"
		loadExample "carousel-onboarding.framer"