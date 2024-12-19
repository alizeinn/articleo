export const getScriptCode = (siteId: string): string => `<script>
// Articleo SDK Initialization
(function() {
  window.articuleoConfig = {
    siteId: '${siteId}',
    autoInit: true
  };
  
  var s = document.createElement('script');
  s.src = 'https://articleo.ai/api/sdk/sdk.js';
  s.async = true;
  document.head.appendChild(s);
})();</script>`;

export const getGTMCode = (siteId: string): string => `<!-- Articleo GTM Integration -->
<script>
window.articuleoConfig = {
  siteId: '${siteId}',
  autoInit: true
};

(function(w,d,s,o,f,js,fjs){
  w['Articleo']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
  js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
  js.id='articleo-sdk';js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
}(window,document,'script','articleo','https://articleo.ai/api/sdk/sdk.js'));
</script>`;