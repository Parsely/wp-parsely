<?php if(!isset($parselyOptions['apikey']) || empty($parselyOptions['apikey'])) { return; } ?>

<!-- START Parse.ly Include: Standard -->
<?php if (!empty($parselyOptions['api_secret'])) : ?>
<script data-cfasync="false">

    function uuidProfileCall() {
        var rootUrl = 'https://api.parsely.com/v2/profile?apikey=<?php echo esc_html($parselyOptions["apikey"]); ?>';
        var uuid = '&uuid=' + PARSELY.config.parsely_site_uuid;
        var requestUrl = rootUrl + uuid + '&url=' + window.location.href;
        jQuery.ajax({
            url: requestUrl,
            dataType: "jsonp"
        });
    }

    if (typeof PARSELY == 'object') {
        var oldonload = PARSELY.onload;
        if (typeof PARSELY.onload != 'function')
        {
            PARSELY.onload = uuidProfileCall
        }
        else
        {
            PARSELY.onload = function() {
                if (oldonload)
                {
                    oldonload();
                }
                uuidProfileCall();
            };
        }
    }

    else {
        PARSELY = {
            onload: uuidProfileCall
        }
    }
</script>
<?php endif; ?>

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
