(function(exports) {

!function(t){var e=new Date(0),n=t.JSON,r=n.stringify,i=encodeURI,o=decodeURI,c=function(t){try{return n.parse(t)}catch(e){}return t},u=function(t){return"object"==typeof t&&r?r(t):t},s={set:function(t,e,n,r,o){var c=i(t)+"="+i(u(e));n&&(n.constructor===Number?c+=";max-age="+n:n.constructor===String?c+=";expires="+n:n.constructor===Date&&(c+=";expires="+n.toUTCString())),c+=";path="+(r?r:"/"),o&&(c+=";domain="+o),document.cookie=c},setObject:function(t,e,n,r){for(var i in t)this.set(i,t[i],e,n,r)},get:function(t){return this.getObject()[t]},getObject:function(){var t,e=document.cookie.split(/;\s?/i),n={};for(var r in e)t=e[r].split("="),t.length<=1||(n[o(t[0])]=c(o(t[1])));return n},unset:function(t){document.cookie=t+"=; expires="+e.toUTCString()},clear:function(){var t=this.getObject();for(var e in t)this.unset(e)}};"function"==typeof define&&define.amd?define(function(){return s}):t.CM=s}(this);

function isDefined(obj) {
	return typeof obj !== "undefined";
}

function mixpanelFirstVisit(f) {

	var firstVisitKey = "page.visit.first";

	if (!CM.get(firstVisitKey)) {
		CM.set(firstVisitKey, (new Date()).toString(), new Date(2099, 1, 1));
		f();
	}
}

function setupMixpanel(mixpanelId) {

	(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
	for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
	
	mixpanel.init(mixpanelId);

	mixpanel.track("page.visit", {
		"title": document.title,
		"url": window.location.pathname
	})

	// Track the first page visit
	mixpanelFirstVisit(function() {
		mixpanel.track("page.visit.first", {
			"title": document.title,
			"url": window.location.pathname
		})
	})
}

setupMixpanel("bd91546ef3426049deb32087461d6f9e");

})()


