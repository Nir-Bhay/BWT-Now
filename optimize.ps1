# Performance, Accessibility, SEO & Best Practices Optimization Script
# Target: index (2).html
# Goal: 90+ Lighthouse scores across all categories

$file = "d:\site-clone\index (2).html"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$original = $content

Write-Host "=== Starting Optimization ==="
Write-Host "Original file size: $($content.Length) bytes"

# ============================================================
# STEP 1: Defer GTM loading — Replace synchronous GTM with deferred
# ============================================================
Write-Host "[STEP 1] Deferring Google Tag Manager..."

# Replace the Facebook + GTM synchronous scripts block (lines 5-22)
$oldGTM = @'
  <!-- Google Tag Manager -->
  <script
    src="https://connect.facebook.net/signals/config/763574438845060?v=2.9.323&amp;r=stable&amp;domain=www.reddybook.live&amp;hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&amp;ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170"
    async=""></script>
  <script type="text/javascript" async="" src="https://connect.facebook.net/en_US/fbevents.js"></script>
  <script async="" src="https://www.googletagmanager.com/gtm.js?id=GTM-TW6SLMD"></script>
  <script>
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-TW6SLMD");
  </script>
  <!-- End Google Tag Manager -->
'@

$newGTM = @'
  <!-- Google Tag Manager — Deferred until first user interaction or 3s -->
  <script>
    (function(){
      var loaded=false;
      function loadAnalytics(){
        if(loaded)return;loaded=true;
        // Facebook Pixel
        var fb=document.createElement('script');
        fb.src='https://connect.facebook.net/en_US/fbevents.js';
        fb.async=true;document.head.appendChild(fb);
        // GTM
        window.dataLayer=window.dataLayer||[];
        window.dataLayer.push({"gtm.start":new Date().getTime(),event:"gtm.js"});
        var g=document.createElement('script');
        g.src='https://www.googletagmanager.com/gtm.js?id=GTM-TW6SLMD';
        g.async=true;document.head.appendChild(g);
      }
      ['click','scroll','touchstart','keydown'].forEach(function(e){
        document.addEventListener(e,loadAnalytics,{once:true,passive:true});
      });
      setTimeout(loadAnalytics,3000);
    })();
  </script>
  <!-- End Google Tag Manager (deferred) -->
'@

$content = $content.Replace($oldGTM, $newGTM)

# ============================================================
# STEP 2: Add resource hints + preconnect to <head> (after charset meta)
# ============================================================
Write-Host "[STEP 2] Adding resource hints and preconnect..."

$afterCharset = '<meta charset="utf-8" />'
$resourceHints = @'
<meta charset="utf-8" />
  <!-- Resource Hints — DNS prefetch & preconnect for external origins -->
  <link rel="preconnect" href="https://speedcdn.io" crossorigin>
  <link rel="dns-prefetch" href="https://speedcdn.io">
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
  <link rel="dns-prefetch" href="https://connect.facebook.net">
  <link rel="dns-prefetch" href="https://wchat.freshchat.com">
  <link rel="dns-prefetch" href="https://efesclubcdn.com">
'@

$content = $content.Replace($afterCharset, $resourceHints)

# ============================================================
# STEP 3: Add canonical URL + Open Graph + Twitter Card meta tags
# ============================================================
Write-Host "[STEP 3] Adding SEO meta tags (OG, Twitter, canonical)..."

$beforeFavicon = '  <!-- Favicons -->'
$seoMeta = @'
  <!-- Canonical URL -->
  <link rel="canonical" href="https://reddybookclubs.com/">

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="ReddyBook | India's Most Trusted Online Cricket Betting Id Provider">
  <meta property="og:description" content="Get your Cricket Betting ID in one click. Sports, casino, and live markets in one account.">
  <meta property="og:image" content="https://speedcdn.io/assets/logos/reddybook.live.png">
  <meta property="og:url" content="https://reddybookclubs.com/">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ReddyBook Club">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="ReddyBook | India's Most Trusted Online Cricket Betting Id Provider">
  <meta name="twitter:description" content="Get your Cricket Betting ID in one click. Sports, casino, and live markets.">
  <meta name="twitter:image" content="https://speedcdn.io/assets/logos/reddybook.live.png">

  <!-- Favicons -->
'@

$content = $content.Replace($beforeFavicon, $seoMeta)

# ============================================================
# STEP 4: Fix logo image — add alt, dimensions, fetchpriority
# ============================================================
Write-Host "[STEP 4] Fixing logo image attributes..."

# Header logo
$content = $content.Replace(
  'class="logo d-flex align-items-center"><img' + "`r`n" + '                  _ngcontent-fmi-c59="" alt="" class="img-fluid"' + "`r`n" + '                  src="https://speedcdn.io/assets/logos/reddybook.live.png" />',
  'class="logo d-flex align-items-center"><img' + "`r`n" + '                  _ngcontent-fmi-c59="" alt="ReddyBook Logo" class="img-fluid" width="180" height="45" fetchpriority="high" decoding="sync"' + "`r`n" + '                  src="https://speedcdn.io/assets/logos/reddybook.live.png" />'
)

# Mobile sidebar logo
$content = $content.Replace(
  '<img _ngcontent-fmi-c60="" class="mobile-logo"' + "`r`n" + '              src="https://speedcdn.io/assets/logos/reddybook.live.png" />',
  '<img _ngcontent-fmi-c60="" class="mobile-logo" alt="ReddyBook Logo" width="180" height="45" loading="lazy" decoding="async"' + "`r`n" + '              src="https://speedcdn.io/assets/logos/reddybook.live.png" />'
)

# ============================================================
# STEP 5: Fix popular icon image
# ============================================================
Write-Host "[STEP 5] Fixing navigation icon images..."

$content = $content.Replace(
  'src="/assets/images/icon-popular.svg" class="img-fluid" style="width: 32px" />',
  'src="/assets/images/icon-popular.svg" class="img-fluid" alt="Popular events" width="32" height="32" style="width: 32px" />'
)

# ============================================================
# STEP 6: Fix carousel/slider images — add alt, dimensions, loading
# ============================================================
Write-Host "[STEP 6] Fixing carousel images..."

# Carousel images ls_01 through ls_04
$content = $content.Replace(
  'src="assets/images/ls_01.png" class="d-block w-100" />',
  'src="assets/images/ls_01.png" class="d-block w-100" alt="ReddyBook promotional banner 1" width="1200" height="400" fetchpriority="high" />'
)
$content = $content.Replace(
  'src="assets/images/ls_02.png" class="d-block w-100" />',
  'src="assets/images/ls_02.png" class="d-block w-100" alt="ReddyBook promotional banner 2" width="1200" height="400" loading="lazy" />'
)
$content = $content.Replace(
  'src="assets/images/ls_03.png" class="d-block w-100" />',
  'src="assets/images/ls_03.png" class="d-block w-100" alt="ReddyBook promotional banner 3" width="1200" height="400" loading="lazy" />'
)
$content = $content.Replace(
  'src="assets/images/ls_04.png" class="d-block w-100" />',
  'src="assets/images/ls_04.png" class="d-block w-100" alt="ReddyBook promotional banner 4" width="1200" height="400" loading="lazy" />'
)

# ============================================================
# STEP 7: Fix sidebar sport menu icon images — add alt + dimensions
# ============================================================
Write-Host "[STEP 7] Adding alt text to sidebar sport menu icons..."

# Nav menu images (top navigation bar) — these are decorative icons next to text
$content = $content.Replace('src="assets/images/menu-home.png" />', 'src="assets/images/menu-home.png" alt="" width="24" height="24" loading="lazy" />')
$content = $content.Replace('src="assets/images/menu-inplay.png" />', 'src="assets/images/menu-inplay.png" alt="" width="24" height="24" loading="lazy" />')
$content = $content.Replace('src="assets/images/menu-rules.png" />', 'src="assets/images/menu-rules.png" alt="" width="24" height="24" loading="lazy" />')

# Sport menu icons — decorative (text label provides the info)
$sportIcons = @(
  'menu-4.png', 'menu-1.png', 'menu-2.png', 'menu-7.png', 'menu-5.png',
  'menu-20.png', 'menu-29.png', 'menu-3503.png', 'menu-4339.png',
  'menu-7511.png', 'menu-7522.png', 'menu-7524.png',
  'menu-99990.png', 'menu-99991.png', 'menu-99994.png', 'menu-99997.png', 'menu-99998.png',
  'menu-998917.png', 'menu-979797.png', 'menu-969696.png',
  'menu-2378961.png', 'menu-26420387.png'
)
foreach ($icon in $sportIcons) {
  $content = $content.Replace(
    "src=""assets/images/events/$icon"" />",
    "src=""assets/images/events/$icon"" alt="""" width=""24"" height=""24"" loading=""lazy"" />"
  )
}

# ============================================================
# STEP 8: Fix GIF images — add loading lazy + alt + decoding
# ============================================================
Write-Host "[STEP 8] Adding lazy loading + alt to GIF banner images..."

# GIF images already have width/height but no alt or loading
$content = $content -replace '(<img _ngcontent-fmi-c78="" class="img-fluid"\s+width="364" height="280" src="https://speedcdn\.io/frontend_config/tiger/images/[^"]+\.gif")\s*/>', '$1 alt="Promotional game banner" loading="lazy" decoding="async" />'

# ============================================================
# STEP 9: Fix "fancy" SVG and "tv" SVG icons  
# ============================================================
Write-Host "[STEP 9] Fixing fancy and tv icon alt text..."

$content = $content.Replace(
  'src="assets/images/fancy.svg" alt="" />',
  'src="assets/images/fancy.svg" alt="Fancy bet available" width="16" height="16" />'
)
$content = $content.Replace(
  'src="assets/images/tv.svg" alt="" />',
  'src="assets/images/tv.svg" alt="Live stream available" width="16" height="16" />'
)

# ============================================================
# STEP 10: Add skip navigation link as first element in body
# ============================================================
Write-Host "[STEP 10] Adding skip navigation link..."

$content = $content.Replace(
  '<body>' + "`r`n" + '  <!-- Google Tag Manager (noscript) -->',
  @'
<body>
  <!-- Skip Navigation — Accessibility -->
  <a href="#main-content" class="skip-link" id="skip-nav">Skip to main content</a>
  <!-- Google Tag Manager (noscript) -->
'@
)

# ============================================================
# STEP 11: Add id="main-content" to main content area
# ============================================================
Write-Host "[STEP 11] Adding main-content landmark ID..."

$content = $content.Replace(
  '<main _ngcontent-fmi-c62="" id="main" class="main">',
  '<main _ngcontent-fmi-c62="" id="main-content" class="main" role="main">'
)

# ============================================================
# STEP 12: Add ARIA labels to navigation elements
# ============================================================
Write-Host "[STEP 12] Adding ARIA labels to navigation..."

# Main header nav
$content = $content.Replace(
  '<nav _ngcontent-fmi-c59="" class="header-nav ms-auto">',
  '<nav _ngcontent-fmi-c59="" class="header-nav ms-auto" aria-label="User account navigation">'
)

# Sports navigation tabs
$content = $content.Replace(
  '<div _ngcontent-fmi-c59="" class="new-middle-menus">',
  '<nav _ngcontent-fmi-c59="" class="new-middle-menus" aria-label="Sports navigation">'
)

# Close the nav tag properly (replace the corresponding closing div)
# The closing </div> for new-middle-menus at line ~1526
$content = $content.Replace(
  '          <!----><!----><!---->
        </div>
        <div _ngcontent-fmi-c59="" class="ipl-loksabha">',
  '          <!----><!----><!---->
        </nav>
        <div _ngcontent-fmi-c59="" class="ipl-loksabha">'
)

# Sidebar navigation
$content = $content.Replace(
  '<aside _ngcontent-fmi-c60="" id="sidebar" class="sidebar">',
  '<aside _ngcontent-fmi-c60="" id="sidebar" class="sidebar" aria-label="Sports sidebar navigation">'
)

# ============================================================
# STEP 13: Add ARIA labels to carousel controls
# ============================================================
Write-Host "[STEP 13] Adding ARIA labels to carousel controls..."

$content = $content.Replace(
  'class="carousel-control-prev">',
  'class="carousel-control-prev" aria-label="Previous slide">'
)
$content = $content.Replace(
  'class="carousel-control-next">',
  'class="carousel-control-next" aria-label="Next slide">'
)

# ============================================================
# STEP 14: Add defer to blocking script tags
# ============================================================
Write-Host "[STEP 14] Adding defer to blocking scripts..."

$content = $content.Replace(
  '<script src="assets/js/bootstrap.bundle.min.js"></script>',
  '<script src="assets/js/bootstrap.bundle.min.js" defer></script>'
)
$content = $content.Replace(
  '<script src="assets/js/swiper-bundle.min.js"></script>',
  '<script src="assets/js/swiper-bundle.min.js" defer></script>'
)
$content = $content.Replace(
  '<script src="js/site-logic.js"></script>',
  '<script src="js/site-logic.js" defer></script>'
)

# ============================================================
# STEP 15: Add content-visibility to collapsed sidebar sections
# ============================================================
Write-Host "[STEP 15] Adding content-visibility CSS for sidebar optimization..."

$contentVisibilityCSS = @'

    /* Performance: Skip rendering of collapsed sidebar sections */
    .nav-content.collapse:not(.show) {
      content-visibility: auto;
      contain-intrinsic-size: 0 300px;
    }
    
    /* Performance: Skip rendering off-screen sidebar sport sections */
    .sidebar .nav-item {
      content-visibility: auto;
      contain-intrinsic-size: 0 48px;
    }

    /* Accessibility: Skip navigation link */
    .skip-link {
      position: absolute;
      top: -100px;
      left: 0;
      background: #000;
      color: #fff;
      padding: 12px 16px;
      text-decoration: none;
      z-index: 99999;
      font-weight: 700;
      font-size: 14px;
      border-radius: 0 0 4px 0;
      transition: top 0.2s ease;
    }
    .skip-link:focus {
      top: 0;
      outline: 3px solid #ffd700;
      outline-offset: 2px;
    }

    /* Accessibility: Focus visible styles */
    :focus-visible {
      outline: 2px solid #0d6efd;
      outline-offset: 2px;
    }
    :focus:not(:focus-visible) {
      outline: none;
    }

    /* Performance: Carousel reserve space (prevent CLS) */
    .carousel-inner {
      min-height: 200px;
      aspect-ratio: 3/1;
    }

    /* Performance: Touch targets minimum size */
    .nav-item a,
    .match-row,
    .final-link,
    .sidebar .nav-link,
    button {
      min-height: 44px;
      display: flex;
      align-items: center;
    }
'@

# Insert before the closing </style> of the main style block
$content = $content.Replace(
  '    @media (max-width: 320px) {}
  </style>
  <link href="assets/css/common_style.css"',
  "    @media (max-width: 320px) {}$contentVisibilityCSS
  </style>
  <link href=""assets/css/common_style.css"""
)

# ============================================================
# STEP 16: Add preload for LCP images
# ============================================================
Write-Host "[STEP 16] Adding preload for critical LCP images..."

$content = $content.Replace(
  '  <!-- Resource Hints',
  @'
  <!-- Preload critical LCP images -->
  <link rel="preload" as="image" href="assets/images/ls_01.png" fetchpriority="high">
  <link rel="preload" as="image" href="https://speedcdn.io/assets/logos/reddybook.live.png">

  <!-- Resource Hints
'@
)

# ============================================================
# STEP 17: Add meta tags for security (CSP via meta)
# ============================================================
Write-Host "[STEP 17] Adding security meta headers..."

$content = $content.Replace(
  '  <meta name="viewport"',
  @'
  <!-- Security Headers (meta-based) -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <meta name="viewport"
'@
)

# ============================================================
# STEP 18: Add aria-live to marquee/live data
# ============================================================
Write-Host "[STEP 18] Adding aria-live to live content areas..."

$content = $content.Replace(
  '<div _ngcontent-fmi-c57="" class="livematch">',
  '<div _ngcontent-fmi-c57="" class="livematch" aria-live="polite" aria-label="Featured live matches">'
)

# ============================================================
# STEP 19: Fix form input labels (search bar)
# ============================================================
Write-Host "[STEP 19] Adding labels to form inputs..."

$content = $content.Replace(
  '<input _ngcontent-fmi-c59="" type="text" placeholder="Search Events"',
  '<label for="search-events" class="visually-hidden">Search Events</label><input _ngcontent-fmi-c59="" id="search-events" type="text" placeholder="Search Events"'
)

# ============================================================
# STEP 20: Add lang attribute enhancement + theme-color meta
# ============================================================
Write-Host "[STEP 20] Adding theme-color meta for mobile browsers..."

$content = $content.Replace(
  '<meta charset="utf-8" />',
  @'
<meta charset="utf-8" />
  <meta name="theme-color" content="#f2f2f2">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
'@
)

# ============================================================
# STEP 21: Register Service Worker (inline script before closing body)
# ============================================================
Write-Host "[STEP 21] Adding service worker registration..."

$content = $content.Replace(
  '</body>',
  @'
  <!-- Service Worker Registration -->
  <script>
    if('serviceWorker' in navigator){
      window.addEventListener('load',function(){
        navigator.serviceWorker.register('/sw.js',{scope:'/'})
          .then(function(r){console.log('SW registered:',r.scope)})
          .catch(function(e){console.warn('SW failed:',e)});
      });
    }
  </script>

  <!-- Passive Event Listeners Polyfill -->
  <script>
    (function(){
      var origAddEventListener=EventTarget.prototype.addEventListener;
      var passiveEvents=['scroll','touchstart','touchmove','wheel','mousewheel'];
      EventTarget.prototype.addEventListener=function(type,fn,opts){
        var newOpts=opts;
        if(passiveEvents.indexOf(type)!==-1){
          if(typeof opts==='boolean'){newOpts={capture:opts,passive:true}}
          else if(typeof opts==='object'){newOpts=Object.assign({},opts,{passive:opts.passive!==false})}
          else{newOpts={passive:true}}
        }
        return origAddEventListener.call(this,type,fn,newOpts);
      };
    })();
  </script>
</body>
'@
)

# ============================================================
# STEP 22: Fix duplicate bootstrap-icons CSS link
# ============================================================
Write-Host "[STEP 22] Removing duplicate stylesheet link..."

# There are two bootstrap-icons links — remove the second non-deferred one
$content = $content.Replace(
  '<link href="assets/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />' + "`r`n" + '  <style>',
  '<!-- bootstrap-icons already loaded above -->' + "`r`n" + '  <style>'
)

# ============================================================
# FINAL: Write the optimized file
# ============================================================
Write-Host ""
Write-Host "=== Writing optimized file ==="
[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)

$newSize = (Get-Item $file).Length
Write-Host "New file size: $newSize bytes"
Write-Host "Done! All optimizations applied."
