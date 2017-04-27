function accordionCarousel(options) {
    this.imgNumber = options.data.length;
    this.indexPrevReady = 0;
    this.indexPrev = 1;
    this.indexCurrent = 2;
    this.indexNext = 3;
    this.indexNextReady = 4;
    this.wrap = options.wrap || $('body');
    this.data = options.data;
    this.imgContainer;
    this.switchContainer;
    this.indexLastActived = 0;
    this.init(options.data);
}
accordionCarousel.prototype = {
        constructor: accordionCarousel,
        init: function(data) {
                var imgList = '',
                    imgItem = '',
                    switchBox = '',
                    imgNumber = data.length;
                // splice DOM fragment
                for
                var i = 0;
                i < imgNumber;
                i++) {
                switch (i) {
                    case 0:
                        imgItem = '<div class="img-item prev-img-ready" position = "prevReady"><img src="' + data[i].img + '"></div>';
                        break;
                    case 1:
                        imgItem = '<div class="img-item prev-img" position = "prev"><img src="' + data[i].img + '"></div>';
                        break;
                    case 2:
                        imgItem = '<div class="img-item current-img" position = "current"><img src="' + data[i].img + '"></div>';
                        break;
                    case 3:
                        imgItem = '<div class="img-item next-img" position = "next"><img src="' + data[i].img + '"></div>';
                        break;
                    case 4:
                        imgItem = '<div class="img-item next-img-ready" position = "nextReady"><img src="' + data[i].img + '"></div>';
                        break;
                    default:
                        imgItem = '<div class="img-item other-img"><img src="' + data[i].img + '"></div>';
                }
                imgList += imgItem;
            }
            // splice navigation DOM fragment
        for (var j = 0; j < imgNumber; j++) {
            var switchItem = '<li class = "switch-item" index = "' + j + '"></li>';
            switchBox += switchItem;
        }
        // insert DOM fragment
        this.wrap.innerHTML = '<div class = "carousel"><div class = "img-list" id="imgList">' + imgList + '</div><div class = "switch-box" id="switchBox"><ul>' + switchBox + '</ul></div></div>';
        // get DOM object after DOM inserted
        this.imgContainer = document.getElementById("imgList").getElementsByTagName("div");
        this.switchContainer = document.getElementById("switchBox").getElementsByTagName("li");
        // bind event and activte selected item
        this.bindEvent();
        this.switchActivedItemColor();
    },
    bindEvent: function() {
        var wrapper = document.getElementById("imgList");
        var switchBox = document.getElementById("switchBox");
        wrapper.addEventListener("click", this.switchByClick.bind(this));
        switchBox.addEventListener("mouseover", this.switchByItem.bind(this));
    },
    switchByClick: function(event) {
        var position = event.target.parentNode.getAttribute("position");
        if (position === "current") {
            window.location = this.data[this.indexCurrent].url;
            return;
        } else if (position === "next") {
            this.indexPrevReady = this.indexPrevReady >= this.imgNumber - 1 ? 0 : ++this.indexPrevReady;
            this.indexPrev = this.indexPrev >= this.imgNumber - 1 ? 0 : ++this.indexPrev;
            this.indexCurrent = this.indexCurrent >= this.imgNumber - 1 ? 0 : ++this.indexCurrent;
            this.indexNext = this.indexNext >= this.imgNumber - 1 ? 0 : ++this.indexNext;
            this.indexNextReady = this.indexNextReady >= this.imgNumber - 1 ? 0 : ++this.indexNextReady;
        } else if (position === "prev") {
            this.indexPrevReady = this.indexPrevReady <= 0 ? this.imgNumber - 1 : --this.indexPrevReady;
            this.indexPrev = this.indexPrev <= 0 ? this.imgNumber - 1 : --this.indexPrev;
            this.indexCurrent = this.indexCurrent <= 0 ? this.imgNumber - 1 : --this.indexCurrent;
            this.indexNext = this.indexNext <= 0 ? this.imgNumber - 1 : --this.indexNext;
            this.indexNextReady = this.indexNextReady <= 0 ? this.imgNumber - 1 : --this.indexNextReady;
        }
        this.switchPic();
    },
    switchByItem: function(event) {
        var index = event.target.getAttribute("index");
        if (!index) {
            return;
        } else {
            this.indexCurrent = Number(index);
            this.indexPrevReady = this.indexCurrent - 2 < 0 ? this.imgNumber - (2 - this.indexCurrent) : this.indexCurrent - 2;
            this.indexPrev = this.indexCurrent - 1 < 0 ? this.imgNumber - 1 : this.indexCurrent - 1;
            this.indexNext = this.indexCurrent + 1 > this.imgNumber - 1 ? 0 : this.indexCurrent + 1;
            this.indexNextReady = this.indexCurrent + 2 > this.imgNumber - 1 ? (this.indexCurrent + 2) - this.imgNumber : this.indexCurrent + 2;
        }
        this.switchPic();
    },
    switchPic: function() {
        this.imgContainer[this.indexPrevReady].setAttribute("class", "img-item prev-img-ready");
        this.imgContainer[this.indexPrev].setAttribute("class", "img-item prev-img");
        this.imgContainer[this.indexPrev].setAttribute("position", "prev");
        this.imgContainer[this.indexCurrent].setAttribute("class", "img-item current-img");
        this.imgContainer[this.indexCurrent].setAttribute("position", "current");
        this.imgContainer[this.indexNext].setAttribute("class", "img-item next-img");
        this.imgContainer[this.indexNext].setAttribute("position", "next");
        this.imgContainer[this.indexNextReady].setAttribute("class", "img-item next-img-ready");
        this.switchActivedItemColor();
    },
    switchActivedItemColor: function() {
        this.switchContainer[this.indexLastActived].setAttribute("class", "switch-item");
        this.switchContainer[this.indexCurrent].setAttribute("class", "switch-item item-actived");
        this.indexLastActived = this.indexCurrent;
    }
}