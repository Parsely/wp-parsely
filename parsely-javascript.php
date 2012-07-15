<? if (!isset($parselyOptions['tracker_implementation']) || empty($parselyOptions['tracker_implementation']) || $parselyOptions['tracker_implementation'] == 'standard') { ?>

<!-- START Parse.ly Include: Standard -->
<div id="parsely-root" style="display: none">
  <div id="parsely-cfg" data-parsely-site="<? echo $parselyOptions["apikey"]; ?>"></div>
</div>
<script>
(function(s, p, d) {
  var h=d.location.protocol, i=p+"-"+s,
      e=d.getElementById(i), r=d.getElementById(p+"-root"),
      u=h==="https:"?"d1z2jf7jlzjs58.cloudfront.net"
      :"static."+p+".com";
  if (e) return;
  e = d.createElement(s); e.id = i; e.async = true;
  e.src = h+"//"+u+"/p.js"; r.appendChild(e);
})("script", "parsely", document);
</script>
<!-- END Parse.ly Include: Standard -->

<? } elseif ($parselyOptions['tracker_implementation'] == 'dom_free') { ?>

<!-- START Parse.ly Include: DOM-Free -->
<script>
(function(d) {
  var site = "<? echo $parselyOptions["apikey"]; ?>",
      b = d.body,
      e = d.createElement("div");
  e.innerHTML = '<span id="parsely-cfg" data-parsely-site="'+site+'"></span>';
  e.id = "parsely-root";
  e.style.display = "none";
  b.appendChild(e);
})(document);
(function(s, p, d) {
  var h=d.location.protocol, i=p+"-"+s,
      e=d.getElementById(i), r=d.getElementById(p+"-root"),
      u=h==="https:"?"d1z2jf7jlzjs58.cloudfront.net"
      :"static."+p+".com";
  if (e) return;
  e = d.createElement(s); e.id = i; e.async = true;
  e.src = h+"//"+u+"/p.js"; r.appendChild(e);
})("script", "parsely", document);
</script>
<!-- END Parse.ly Include: DOM-Free -->

<? } else { ?>

<!-- START Parse.ly Include: Async -->
<div id="parsely-root" style="display: none">
  <div id="parsely-cfg" data-parsely-site="<? echo $parselyOptions["apikey"]; ?>"></div>
  <script>
  $LAB.script(document.location.protocol==="https:"?
    "https://d1z2jf7jlzjs58.cloudfront.net/p.js":
    "http://static.parsely.com/p.js");
  </script>
</div>
<!-- END Parse.ly Include: Async -->
    
<? } ?>