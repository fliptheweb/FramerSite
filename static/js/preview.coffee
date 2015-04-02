loadExample = (exampleName) ->

	ga("send", "pageview", "http://framerjs.com/examples/#{exampleName}") if ga?

	$("#code").attr "src", "code.html?name=#{exampleName}"
	$("#example").attr "src", "http://projects.framerjs.com/static/examples/#{exampleName}"
	$(".btn-dl").attr "href", "http://projects.framerjs.com/static/examples/#{exampleName}.zip"
	$(".btn-open").attr "href", "http://framer.link/projects.framerjs.com/static/examples/#{exampleName}.zip"

$(document).ready ->

	parts = window.location.href.split("#")

	if parts.length == 2
		exampleName = parts[1]
		exampleShowCode = false

	else if parts.length == 3
		exampleName = parts[1]
		exampleShowCode = true

	else
		exampleName = ""
		exampleShowCode = false

	# Strip trailing slash
	exampleName = exampleName.replace(/\/+$/, "")

	# exampleName = window.location.hash[1..]
	document.title = exampleName

	# # For document title
	# if exampleName.indexOf("#code") > -1
	# 	# For download link
	# 	exampleNameNoHash = window.location.hash[1..-6]
	# 	document.title = exampleNameNoHash

	loadExample(exampleName)

	$(".btn-close").hide()	

	$(".btn-code").click ->		
		$("#example").toggleClass "with-code"
		$("#code").toggleClass "show-code"
		$(".btn-code").hide()	
		$(".btn-close").show()	

	$(".btn-close").click ->		
		$("#example").toggleClass "with-code"
		$("#code").toggleClass "show-code"
		$(".btn-close").hide()	
		$(".btn-code").show()	

	if exampleShowCode is true
		$("#code").addClass "with-code"
		$("#example").addClass "with-code"	
		$(".btn-code").hide()		

	# If bookmarked
	if (window.navigator.standalone)
		window.location.href = "http://projects.framerjs.com/static/examples/#{exampleName}"

	# 	# if window.location.href.indexOf("%23code") > -1 
	# 	# 	window.location = "http://projects.framerjs.com/static/examples/#{exampleNameNoHash}"

mq = window.matchMedia("(max-width:800px)")

if (mq.matches)
	window.location.hash = '#' + window.location.hash.split('#')[1]
