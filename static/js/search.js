/*

highlight v4

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function main() {

	jQuery.fn.highlight = function(pat) {
		function innerHighlight(node, pat) {
			var skip = 0;
			if (node.nodeType == 3) {
				var pos = node.data.toUpperCase().indexOf(pat);
				if (pos >= 0) {
					var spannode = document.createElement('div');
					spannode.className = 'highlight-search';
					var middlebit = node.splitText(pos);
					var endbit = middlebit.splitText(pat.length);
					var middleclone = middlebit.cloneNode(true);
					spannode.appendChild(middleclone);
					middlebit.parentNode.replaceChild(spannode, middlebit);
					skip = 1;
				}
			}
			else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
				for (var i = 0; i < node.childNodes.length; ++i) {
					i += innerHighlight(node.childNodes[i], pat);
				}
			}
			return skip;
		}
		return this.length && pat && pat.length ? this.each(function() {
			innerHighlight(this, pat.toUpperCase());
		}) : this;
	};

	jQuery.fn.removeHighlight = function() {
		return this.find("div.highlight-search").each(function() {
			this.parentNode.firstChild.nodeName;
			with (this.parentNode) {
				replaceChild(this.firstChild, this);
				normalize();
			}
		}).end();
	};


	(function($) {
		$.fn.goTo = function() {
			$('html, body').animate({
				scrollTop: $(this).offset().top - 32 + 'px'
			}, 100);
			return this; // for chaining...
		}
	})(jQuery);

	var searchNode = $("#docs-search");

	$("#docs-search").focus()

	function _updateSearch() {
		var query = searchNode.val();
		$("body").removeHighlight()
		
		if (query.length < 2) {
			return;
		}

		$("body").highlight(query)
		var firstNode = $(".align-right div.highlight-search:first-child").first()

		if (firstNode) {
			firstNode.goTo()
		}
	}

	var updateSearch = debounce(_updateSearch, 300);
	
	searchNode.keyup(updateSearch)
	searchNode.change(updateSearch)

	$("#docs-search").on("search", updateSearch);
}

$(document).ready(main)

