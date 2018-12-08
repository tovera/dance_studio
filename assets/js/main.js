function showLessons() { //sia funcija paleidzia mygtukas kuris parodo pamoku tvarkarasti
    //paleidziam vex biblioteka kuri rodo dialogo langas su lenetele
    vex.dialog.alert({

        className: 'vex-theme-wireframe', //naudojam vex wirefame clase css
        input: //cia suraso htmla kuri parodys dialogas/lenetel
            `
<div class="divTable row" >
        
        <div class="column week">
            <div class="divCell head-row">PIRMADIENIS</div>
            <div class="divCell">LABAS</div>
            <div class="divCell">ALIO</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
        </div>
        <div class="column week">
            <div class="divCell head-row">ANTRADIENIS</div>
            <div class="divCell">LABAS</div>
            <div class="divCell">ALIO</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
        </div>
        <div class="column week">
            <div class="divCell head-row">TREČIADIENIS</div>
            <div class="divCell">LABAS</div>
            <div class="divCell">ALIO</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
        </div>  
        <div class="column week">
            <div class="divCell head-row">KETVIRTADIENIS</div>
            <div class="divCell">LABAS</div>
            <div class="divCell">ALIO</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
        </div>
        <div class="column week">
            <div class="divCell head-row">PENKTADIENIS</div>
            <div class="divCell">LABAS</div>
            <div class="divCell">ALIO</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
            <div class="divCell">1</div>
        </div>
    </div>

`,

    })

}



function showTeam(member) { //sia funcija paleidzia mygtukas kuris parodo pamoku tvarkarasti
    //paleidziam vex biblioteka kuri rodo dialogo langas su lenetele
    var input;
    if (member == 1)
        input = `Živilė Kučauskienė šokių studijos ,,Alemanda’’ įkūrėja, studijos prezidentė,
    trenerė, choreografė ir varžybų teisėja. Živilė šokių pasaulyje sukasi jau daugiau, kaip 40metų.
    Labai anksti pradėjo šokti sportinių šokių kolektyve ,,Žuvėdra’’Klaipėdoje. Buvo daugkartinė Lietuvos
    sportinių šokių čempionė, tarptautinių varžybų nugalėtoja, prizininkė bei finalistė. Tarybų Sąjungos vice čempionė.Buvusi legendinio ansamblio,,Žuvėdra’’ šokėja.Vėliau baigė Klaipėdos universitetą ir įgijo šokio pedagogo kvalifikaciją.  ,,Šokiai mane išmokė siekti užsibrėžto tikslo,disciplinos,konkretumo,grožio ir
    estetikos. Visa tai stengiuosi perduoti ir savo mokiniams. ŠOKIS-visas mano gyvenimas!
`
    if (member == 2)
        input = `Treneris
nikita
`

    if (member == 3)
        input = `Treneris
Laura
`

    vex.dialog.alert({

        className: 'vex-theme-wireframe', //naudojam vex wirefame clase css
        input: input //cia suraso htmla kuri parodys dialogas/lenetel

            ,

    })

}


function LoadSwiper() { //karuseles paleidimo funkcija
    var swiper = new Swiper('.swiper-container', { //standartiniai parametrai
            slidesPerView: 1,
            speed: 1000,
            keyboard: {
                enabled: true,
            },
            navigation: {
                nextEl: '.next_btn',
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

}

function myMap() {
var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function initNav(){
      var nav = responsiveNav(".nav-collapse", { // Selector
  animate: true, // Boolean: Use CSS3 transitions, true or false
  transition: 284, // Integer: Speed of the transition, in milliseconds
  label: "Menu", // String: Label for the navigation toggle
  insert: "before", // String: Insert the toggle before or after the navigation
  customToggle: "", // Selector: Specify the ID of a custom toggle
  closeOnNavClick: true, // Boolean: Close the navigation when one of the links are clicked
  openPos: "relative"});  
}

function OnLoad() { //paleiziam kai uzsikrauna puslapi

//initNav()
    menuSelector();
    LoadSwiper(); //paleiziam karusele kai puslapis uzsikrauna. Swiper
    initPhotoSwipeFromDOM('.galery');
   //myMap();

}




var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// meniu funkcija


function menuSelector() {
    var menuItems = document.querySelectorAll(".main-nav>li");

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener("click", function () {
            document.getElementsByClassName('main-nav-active')[0].classList.remove('main-nav-active');
            this.classList.add('main-nav-active');
        })
    });
}
