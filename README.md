# AccordionCarousel（一个简单的手风琴轮播组件）(V2)
当前是`V2`版本，查看和使用`V1`版请切换到`master`分支查看。
>> Update:
* 使用原生JavaScript编写代码，不再依赖jQuery;
* 提供压缩版本的JS和CSS文件；
* 优化几处代码的性能；
* 添加通过鼠标悬停在指示器时切换到对应图片功能；
* 优化代码架构，各部分代码功能更加明确，调用关系更清晰；
* 添加部分注释，便于大家学习；

# 1：最终要实现的效果—（V2）
Github地址：[github.com/ovenzeze/AccordionCarousel](https://github.com/ovenzeze/AccordionCarousel)

Demo地址：[http://urlc.cn/RCa7B2](http://123.206.204.163/AccordionCarousel/index.html)
# 2：使用方法
**文件引入：**  

引入`src`目录下的`accordion-carousel.min.js`和`accordion-carousel.min.css`文件。  

**代码：**  

```
var carousel1 = new accordionCarousel({
    wrap:包裹轮播图的父元素,
    data:[{
    url:点击图片跳转到的链接,
    img:图片的资源地址
    },{
    url:点击图片跳转到的链接,
    img:图片的资源地址
    }]
    });
```
`new`一个`accordionCarousel`实例，传入包裹轮播的`DIV`和每一张图片的链接和地址。传入的参数是一个对象.
>> 说明：
* 图片的数量和指示器会根据传递的`data`参数自动计算和生成；
* 传入的`wrap`元素建议设置高度和宽度，轮播图会占据父级元素`100%`的高度和宽度，同时轮播图的最小高度为`300px`,最小宽度为`500px`;
* 如果未传递`wrap`参数，会自动以`body`作为轮播图的父级元素，`data`项是必选项，如果未传入会报错。

# 3：实现方案
## 3.1：整体布局

 最外层是包裹整个轮播和指示器的`div`，所有的图片放在`class`为`img-list`的这个`div`内，与`img-list`同级的还有一个`class`为`switchbox`指示器的`div`.
## 3.2：CSS结构
因为这种方式的轮播图每张图片的位置都不一样，所以无法使用将所有图片拼接为一张再通过控制`left`值的方式来达到轮播的效果。所以在这里我为每个图片的位置设置了定位，一共五个位置，每个位置根据不同的`class`类名来区分，通过动态的切换类名来达到轮播的效果。
具体类名和位置如下：


在这里，为了达到有切换时图片从一个位置到另一个位置的切换效果，我一共使用了五个位置，在`img-list`的区域内有前一张图片（对应类名为`img-prev`），当前图片（对应类名为`img-current`），下一张图片（对应类名为`img-next`），而就绪状态的前一张图片（对应类名为`img-prev-ready`）和就绪状态的下一张图片（`img-next-ready`）。左右两侧的四张图片使用了`CSS3`中的`transform`属性，主要用到的是`perspective` `rotateY` `translateZ`三个属性，具体的使用大家可以参考`MDN`。  

参考资料：

[MDN-transform属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)

[MDN-使用CSS3transform属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms)
## 3.3：JS控制
文件的基本结构如下：
```
function accordionCarousel(event) {
    this.imgNumber = options.data.length;
    this.indexPrevReady = 0;
    this.indexPrev = 1;
    this.indexCurrent = 2;
    this.indexNext = 3;
    this.indexNextReady = 4;
    this.indexLastActived = 0;
    this.wrap = options.wrap || $('body');
    this.data = options.data;
    this.init(options.data);
    this.imgContainer;
    this.switchContainer; 
}
AccordionCarousel.prototype = {
    constructor: AccordionCarousel,
    //将constructor重新指向构造函数
    init: function(data) {
    //初始化数据，插入DOM结构
    this.bindEvent();
    //初始状态时为指示器添加状态
    this.switchActivedItemColor();
},
    bindEvent:function(data){
    //为图片绑定点击事件
    //为指示器绑定鼠标悬停事件
},
    switchByClick:function(){
    //通过点击前一张后一张时管理index
    this.switchItem();

},
    switchByItem:function() {
    //通过鼠标悬停在指示器时管理index
    this.switchItem();

},
    switchPic:function(data){
    //根据index切换图片
    this.switchActivedItemColor();
}
    switchActivedItemColor:function(){
    //为当前图片点亮指示器
}
```
# 4：此方案中需要注意的一点问题

# 5：思路拓展

# 6：总结

