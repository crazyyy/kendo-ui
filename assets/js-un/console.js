!function(t,e){window.kendoConsole={log:function(e,r,n){var o=t(".console div:first",n),a=o.find(".count").detach(),s=o.text(),l=1*(a.text()||1);o.append(a),o.length&&e===s?(l++,a.length?a.html(l):o.html(s).append("<span class='count'>"+l+"</span>")):t("<div"+(r?" class='error'":"")+"/>").css({marginTop:-24,backgroundColor:r?"#ffbbbb":"#b2ebf2"}).html(e).prependTo(t(".console",n)).animate({marginTop:0},300).animate({backgroundColor:r?"#ffdddd":"#ffffff"},800)},error:function(t){this.log(t,!0)}}}(jQuery),function(t){function e(e){var r;return e&&e.constructor==Array&&3==e.length?e:(r=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e))?[parseInt(r[1],10),parseInt(r[2],10),parseInt(r[3],10)]:(r=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e),r?[parseInt(r[1],16),parseInt(r[2],16),parseInt(r[3],16)]:t.trim(e).toLowerCase())}function r(r,n){var o;do{if(o=t.css(r,n),o&&"transparent"!=o||t.nodeName(r,"body"))break;n="backgroundColor",r=r.parentNode}while(r);return e(o)}function n(){var t=$(this).val(),e=window.location.href;e.indexOf("culture")>-1?e=e.replace(/culture=([^&]*)/,"culture="+t):e+=e.indexOf("?")>-1?"&culture="+t:"?culture="+t,window.location.href=e}t.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(n,o){t.fx.step[o]=function(t){t.state&&"string"!=typeof t.end||(t.start=r(t.elem,o),t.end=e(t.end)),t.elem.style[o]=["rgb(",[Math.max(Math.min(parseInt(t.pos*(t.end[0]-t.start[0])+t.start[0],10),255),0),Math.max(Math.min(parseInt(t.pos*(t.end[1]-t.start[1])+t.start[1],10),255),0),Math.max(Math.min(parseInt(t.pos*(t.end[2]-t.start[2])+t.start[2],10),255),0)].join(","),")"].join("")}});var o=window.location.href;o.indexOf("culture")>-1&&$("#culture").val(o.replace(/(.*)culture=([^&]*)/,"$2")),$("#culture").change(n)}(jQuery);
!function(){for(var e,n=function(){},o=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],i=o.length,r=window.console=window.console||{};i--;)e=o[i],r[e]||(r[e]=n)}();