# light and simple accordion-carousel with no-dependencies
this is a simple and light accordion-carousel coded by pure JavaScript, only 4KB in javascript and 1KB in CSS.
# how to use
just injected `accordion-carousel-min.js` and `accordion-carousel-min.css` into your website, and you can use like that:
```
var carousel1 = new accordionCarousel({
    wrap:father element of the carousel（optional parameter）,
    min-width:min-width of carousel contioner（optional parameter）,
    min-height：min-height of carousel container（optional parameter）,
    data:[{
    url:URL the pic link to,
    img:src URL of the pic
    },{
    url:URL the pic link to,
    img:src URL of the pic
    }](required parameter)
    });
```

# browser support
* IE9（basiclySupport）
* IE10、IE11 (fulllySupport)
* Microsoft Edge (fulllySupport)
* Chrome 12+ (fulllySupport)
* Firefox 16+ (fulllySupport)
* Opera 15+ (fulllySupport)
* Safari 4+ (fulllySupport)
* Android Browser 4.0+ (fulllySupport)
* iOS Safari 6.0+ (fulllySupport)