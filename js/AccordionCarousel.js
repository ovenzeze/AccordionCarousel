function AccordionCarousel(event) {
    imgNumber = event.data.length;
    indexNext = 4;
    indexPrev = 0;
    indexCurrent = 2;
    this.wrap = event.wrap || $('body');
    this.init(event.data);
}
AccordionCarousel.prototype = {
    constructor: AccordionCarousel,
    init: function(data) {
        var imgList = '';
        var imgItem = '';
        var switchBox = '';
        // console.log(this.constructor);
        // 插入图片
        for (var i = 0; i < imgNumber; i++) {
            switch (i) {
                case 0:
                    imgItem = '<div class="img-item prev-img-ready"><img src="' + data[i].img + '"></div>';
                    break;
                case 1:
                    imgItem = '<div class="img-item prev-img"><img src="' + data[i].img + '"></div>';
                    break;
                case 2:
                    imgItem = '<div class="img-item current-img"><img src="' + data[i].img + '"></div>';
                    break;
                case 3:
                    imgItem = '<div class="img-item next-img"><img src="' + data[i].img + '"></div>';
                    break;
                case 4:
                    imgItem = '<div class="img-item next-img-ready"><img src="' + data[i].img + '"></div>';
                    break;
                default:
                    imgItem = '<div class="img-item other-img"><img src="' + data[i].img + '"></div>';
            }
            imgList += imgItem;
        }
        this.wrap.append('<div class = "carousel"><div class = "img-list">' + imgList + '</div></div>');
        console.log(this.indexCurrent);

        // 插入导航圆点
        for (var j = 0; j < imgNumber; j++) {
            var switchItem = '<li class = "switch-item"></li>';
            switchBox += switchItem;
        }
        $('<div class = "switch-box"><ul>' + switchBox + '</ul></div>').insertAfter('.img-list');
        this.switchItem();
        this.bindEvent(data);
    },
    bindEvent: function(data) {
        $('.img-item').on('click', data, this.switchPic);
        $('.img-item').on('click', this.switchItem);
    },
    switchPic: function(event) {
        $('.switch-box ul .switch-item:eq(' + indexCurrent + ')').removeClass('item-actived');
        if ($(this).hasClass('current-img')) {
            window.location = event.data[indexCurrent].url;
        } else if ($(this).hasClass('next-img')) {
            $('.prev-img-ready').removeClass('prev-img-ready').addClass('other-img');
            $('.prev-img').removeClass('prev-img').addClass('prev-img-ready');
            $('.current-img').removeClass('current-img').addClass('prev-img');
            $(this).removeClass('next-img').addClass('current-img');
            $('.next-img-ready').removeClass('next-img-ready').addClass('next-img');
            indexNext = indexNext < imgNumber - 1 ? ++indexNext : 0;
            $('.img-list .img-item:eq(' + indexNext + ')').removeClass('other-img').addClass('next-img-ready');
            indexCurrent = indexCurrent >= imgNumber - 1 ? 0 : ++indexCurrent;
            indexPrev = indexPrev > imgNumber - 1 ? 0 : ++indexPrev;
        } else if ($(this).hasClass('prev-img')) {
            $('.next-img-ready').removeClass('next-img-ready').addClass('other-img');
            $('.next-img').removeClass('next-img').addClass('next-img-ready');
            $('.current-img').removeClass('current-img').addClass('next-img');
            $('.prev-img').removeClass('prev-img').addClass('current-img');
            $('.prev-img-ready').removeClass('prev-img-ready').addClass('prev-img');
            indexPrev = indexPrev < 1 ? imgNumber - 1 : --indexPrev;
            $('.img-list .img-item:eq(' + indexPrev + ')').removeClass('other-img').addClass('prev-img-ready');
            indexCurrent = indexCurrent < 1 ? imgNumber - 1 : --indexCurrent;
            indexNext = indexNext < 1 ? imgNumber - 1 : --indexNext;
        }
    },
    switchItem: function() {
        $('.switch-box ul .switch-item:eq(' + indexCurrent + ')').addClass('item-actived');
    }
}
