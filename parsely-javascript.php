<?php if(!isset($parselyOptions['apikey']) || empty($parselyOptions['apikey'])) { return; } ?>

<!-- START Parse.ly Include: Standard -->
<script>
    PARSELY = {
        onload: function() {
            var rootUrl = 'https://api.parsely.com/v2/profile?apikey=<?php echo esc_html($parselyOptions["apikey"]); ?>';
            var uuid = '&uuid=' + PARSELY.config.parsely_site_uuid;
            var requestUrl = rootUrl + uuid + '&url=' + window.location.href;
            console.log(requestUrl);
            jQuery.ajax({
                url: requestUrl,
                dataType: "jsonp",
            });
        }
    }
</script>

<div id="parsely-root" style="display: none">
  <div id="parsely-cfg" data-parsely-site="<?php echo esc_html($parselyOptions["apikey"]); ?>"></div>
</div>
<script data-cfasync="false">
(function(s, p, d) {
  var h=d.location.protocol, i=p+"-"+s,
      e=d.getElementById(i), r=d.getElementById(p+"-root"),
      u=h==="https:"?"d1z2jf7jlzjs58.cloudfront.net"
      :"static."+p+".com";
  if (e) return;
  e = d.createElement(s); e.id = i; e.async = true;
  e.setAttribute('data-cfasync', 'false'); e.src = h+"//"+u+"/p.js"; r.appendChild(e);
})("script", "parsely", document);
</script>

<!-- END Parse.ly Include: Standard -->
