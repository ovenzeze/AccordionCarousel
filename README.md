# AccordionCarousel（一个简单的手风琴轮播组件）(V2)
>> Tips:
English version please read [README_EN.md](https://github.com/ovenzeze/AccordionCarousel/blob/V2/README_EN.md)

当前是`V2`版本，查看和使用`V1`版请切换到`master`分支查看。
>> Update:
* 使用原生`JavaScript`编写代码，不再依赖`jQuery`;
* 提供压缩版本的`JS`和`CSS`文件;
* 优化几处代码的性能;
* 添加通过鼠标悬停在指示器时切换到对应图片功能;
* 优化代码结构，各部分代码功能更加明确，调用关系更清晰;
* 添加部分注释，便于大家学习;

# 兼容性（V2）
* IE9（基本功能，basiclySupport）
* IE10、IE11 (完整支持，fulllySupport)
* Microsoft Edge (完整支持，fulllySupport)
* Chrome 12+ (完整支持，fulllySupport)
* Firefox 16+ (完整支持，fulllySupport)
* Opera 15+ (完整支持，fulllySupport)
* Safari 4+ (完整支持，fulllySupport)
* Android Browser 4.0+ (完整支持，fulllySupport)
* iOS Safari 6.0+ (完整支持，fulllySupport)
# 1：最终要实现的效果—（V2）
Github地址：[github.com/ovenzeze/AccordionCarousel](https://github.com/ovenzeze/AccordionCarousel)

Demo地址：[http://urlc.cn/RCa7B2](http://123.206.204.163/AccordionCarousel/index.html)
# 2：使用方法
**文件引入：**  

引入`src`目录下的`accordion-carousel.min.js`和`accordion-carousel.min.css`文件。  

**代码：**  

```
var carousel1 = new accordionCarousel({
    wrap:包裹轮播图的父元素（可选参数，建议传入）,
    min-width:轮播图容器的最小宽度（可选参数，建议不设置）,
    min-height：轮播图容器的最小高度（可选参数，建议不设置）,
    data:[{
    url:点击图片跳转到的链接,
    img:图片的资源地址
    },{
    url:点击图片跳转到的链接,
    img:图片的资源地址
    }](必选参数)
    });
```
`new`一个`accordionCarousel`实例，传入包裹轮播的`DIV`和每一张图片的链接和地址。传入的参数是一个对象。
>> 说明：
* 图片的数量和指示器会根据传递的`data`参数自动计算和生成；
* 传入的`wrap`元素建议设置高度和宽度，轮播图会占据包裹元素`100%`的高度和宽度，同时为了美观轮播图的最小高度为`300px`,最小宽度为`500px`，如果确实有其他的尺寸需求可以在初始化时传入`min-widch`和`min-height`参数;
* 如果未传递`wrap`参数，会自动以`body`作为轮播图的父级元素，`min-height``min-width`为可选参数，`data`项是必选项，如果未传入会报错。

# 3：实现方案
## 3.1：整体布局

 最外层是包裹整个轮播和指示器的`div`，所有的图片放在`class`为`img-list`的这个`div`内，与`img-list`同级的还有一个`class`为`switchbox`指示器的`div`.
 ![整体布局](http://ovenzeze.coding.me/img/plan1.jpg "整体布局")
## 3.2：CSS结构
因为这种方式的轮播图每张图片的位置都不一样，所以无法使用将所有图片拼接为一张再通过控制`left`值的方式来达到轮播的效果。所以在这里我为每个图片的位置设置了定位，一共五个位置，每个位置根据不同的`class`类名来区分，通过动态的切换类名来达到轮播的效果。
具体类名和位置如下：
![](http://ovenzeze.coding.me/img/plan2.jpg)

在这里，为了达到有切换时图片从一个位置到另一个位置的切换效果，我一共使用了五个位置，在`img-list`的区域内有前一张图片（对应类名为`img-prev`），当前图片（对应类名为`img-current`），下一张图片（对应类名为`img-next`），而就绪状态的前一张图片（对应类名为`img-prev-ready`）和就绪状态的下一张图片（`img-next-ready`）。左右两侧的四张图片使用了`CSS3`中的`transform`属性，主要用到的是`perspective` `rotateY` `translateZ`三个属性，具体的使用大家可以参考`MDN`。  

参考资料：

[MDN-transform属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)

[MDN-使用CSS3transform属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms)
## 3.3：主函数实现
文件的基本结构如下：
```
function accordionCarousel(options) {
    this.imgNumber = options.data.length;
    this.indexPrevReady = 0;
    this.indexPrev = 1;
    this.indexCurrent = 2;
    this.indexNext = 3;
    this.indexNextReady = 4;
    this.indexLastActived = 0;
    this.wrap = options.wrap || document.getElementByTagName("body");
    this.data = options.data;
    this.init(options.data);
    this.imgContainer;
    this.switchContainer; 
}
AccordionCarousel.prototype = {
    //将constructor重新指向构造函数
    constructor: accordionCarousel,
    init: function(data) {
    //初始化数据，插入DOM片段
    this.bindEvent();
    //初始化DOM时为指示器添加状态
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
* 如何通过统一的管理方式达到切换图片的效果   
很显然，在这个方案中，对于切换轮播图有好几个触发方式，用户的手动点击，用户通过鼠标悬停在指示器等，如果针对不同的方案分别来写切换逻辑的话，代码量会增大很多，而且在两个地方分别管理切换图片的index，很容易引起混乱和错误。
所以这里，通过在不同的方式里管理index，而切换图片的逻辑只读取index，并根据index执行切换图片的操作。就让整个的逻辑非常清晰，也非常易于维护。
* 参数传递的问题   
在图片的切换逻辑里需要用到关于图片位置的几个index，但是这几个index在不同的切换逻辑里都需要被管理，这个时候很容易想到全局变量，但是污染全局变量是一个非常不好的做法，这里通过this来实现访问和操作父作用域中的共享变量，但是对于触发事件来说，触发切换图片事件时this指向发生当前事件的DOM对象，无法通过this访问到共享变量，这时候需要使用bind的方法来手动指定触发事件时的this指向。
* 如何设计函数的功能达到低耦合度同时函数功能明确   
在前面已经说过了，对于整个流程来说，有几个小的环节或者说处理逻辑是需要多次使用的，比如切换图片的逻辑，在不同的触发条件下都需要被使用，这个时候就需要独立出来作为一个功能模块，只需要在不同场合去调用此功能即可。

# 5：思路拓展
* 轮播方式   
  目前的方案只支持当前演示的这一种轮播方式，可以尝试拓展支持多种轮播方式，比如slide轮播，淡入淡出轮播等
* 适配移动端   
  暂时的轮播方式在移动端的体验很不好，可以尝试在移动端自动切换成slide轮播
* 提供不同风格的轮播UI   
  轮播的切换控件、轮播图指示器这些UI应该提供几种不同的风格可以供选择，也可以关闭不显示
# 6：总结
* 组件设计的几个特点    
 * 高度可复用   
 既然是组件，当然是希望能够在不同的场景多次复用，所以在设计代码结构和编写代码的时候，就要以高度可复用为指导思想，简单来说要做到既不会过度依赖别的插件或代码片段，同时也不会污染全局变量环境。
 * 良好的兼容和自适应性   
 对于组件因为可能会被用到各种浏览器中，所以在开发的时候就要测试好各种浏览器，写清楚支持的浏览器版本，当然是要可能的情况下尽可能的支持更多的浏览器。
 * 对开发者友好   
 通常组件只会把自己提供给用户设置的接口暴露给用户，而大部分用户对于组件内部是怎么运行都不会清楚，这个时候就需要很友好的错误提示和基本的思路介绍，让开发者在遇到问题能够根据提示信息和代码的设计思想快速、准确的定位到错误。组件的初衷就是为了提高开发效率，如果因为不够友好的开发者配置而让开发者在这方面花费更多的时间就得不偿失了。
 * 高度可定制   
 组件的通用性另一个方面就是体现在在大多数的场景下都能通用的去解决某一类问题，但是对于具体场景的不同，就需要支持用户的自定制。比如，某个地方的轮播图需要支持手动切换，同时关闭自动切换，组件没有提供这样的接口，就要开发者在组件的基础上进行二次开发，这是非常不友好的。这是一个很简单的需求，在我们的代码里，只需要简单的几句话就能给用户提供一个这样的接口。所以我们在开发的时候就要考虑到不同场景的用户需求，尽可能多的为用户提供可定制化的功能。

