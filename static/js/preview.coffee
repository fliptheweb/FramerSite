loadExample = (exampleName, exampleNameNoHash) ->
	ga("send", "pageview", "http://framerjs.com/examples/#{exampleName}") if ga?

	$("#code").attr "src", "code.html?name=#{exampleName}"
	$("#example").attr "src", "http://projects.framerjs.com/static/examples/#{exampleName}"
	$(".btn-dl").attr "href", "http://projects.framerjs.com/static/examples/#{exampleNameNoHash}.zip"
	$(".btn-open").attr "href", "http://framer.link/projects.framerjs.com/static/examples/#{exampleNameNoHash}.zip"

$(document).ready ->

	exampleName = window.location.hash[1..]
	exampleNameNoHash = window.location.hash[1..]

	# For document title
	if exampleName.indexOf("#code") > -1
		document.title = window.location.hash[1..-6]
		# For download link
		exampleNameNoHash = window.location.hash[1..-6]

	loadExample exampleName, exampleNameNoHash
	document.title = exampleName

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

	if exampleName.indexOf("#code") > -1
		$("#code").addClass "with-code"
		$("#example").addClass "with-code"	
		$(".btn-code").hide()		
