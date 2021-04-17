//悬浮看框
$(function(){

     // 获取window的引用:
     var $window = $(window);
     // 获取包含data-src属性的img，并以jQuery对象存入数组:
     var lazyImgs = _.map($('img[data-src]').get(), function (i) {
         return $(i);
     });
     // 定义事件函数:
     var onScroll = function() {
         // 获取页面滚动的高度:
         var wtop = $window.scrollTop();
         // 判断是否还有未加载的img:
         if (lazyImgs.length > 0) {
             // 获取可视区域高度:
             var wheight = $window.height();
             // 存放待删除的索引:
             var loadedIndex = [];
             // 循环处理数组的每个img元素:
             _.each(lazyImgs, function ($i, index) {
                 // 判断是否在可视范围内:
                 if ($i.offset().top - wtop < wheight) {
                     // 设置src属性:
                     $i.attr('src', $i.attr('data-src'));
                     // 添加到待删除数组:
                     loadedIndex.unshift(index);
                 }
             });
             // 删除已处理的对象:
             _.each(loadedIndex, function (index) {
                 lazyImgs.splice(index, 1);
             });
         }
     };
     // 绑定事件:
     $window.scroll(onScroll);










    $('.slide .icon li').not('.up,.down').mouseenter(function(){
        $('.slide .info').addClass('hover');
        $('.slide .info li').hide();
        $('.slide .info li.'+$(this).attr('class')).show();//.slide .info li.qq
    });
    $('.slide').mouseleave(function(){
        $('.slide .info').removeClass('hover');
    });

    $('#btn').click(function(){
        $('.slide').toggle();
        if($(this).hasClass('index_cy')){
            $(this).removeClass('index_cy');
            $(this).addClass('index_cy2');
        }else{
            $(this).removeClass('index_cy2');
            $(this).addClass('index_cy');
        }

    });

    // $(".backTop").click(function(){if(scroll=="off") return;$("html,body").animate({scrollTop: 0}, 600);});

    $('.backTop').hide()
    $(window).scroll(function(){
        if($(this).scrollTop() > 350){
            $(".backTop").fadeIn();
        }
        else{
            $(".backTop").fadeOut();
        }
    })
//置顶事件
    $(".backTop").click(function(){
        $('body,html').animate({scrollTop:0},300);
    })

});
