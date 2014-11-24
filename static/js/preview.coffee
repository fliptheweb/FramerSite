loadExample = (exampleName) ->
	if ga?
		ga("send", "pageview", "/examples/#{exampleName}")

	$("#code").attr "src", "code.html?name=#{exampleName}"
	$("#example").attr "src", "/static/examples/#{exampleName}"
	$("a.download").attr "href", "/static/examples/#{exampleName}.zip"


$(document).ready ->


	exampleName = window.location.hash[1..]
	document.title = exampleName
	loadExample exampleName

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
