// 整个页面加载完了-》引入js
window.addEventListener('load', function () {
    //1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    //获得ol
    var ol = focus.children[1];
    //获得focus的宽度
    var w = focus.offsetWidth;
    //2.利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function () {
        index++;
        // 每次向左移动一个屏幕的位置
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 怎么才能过渡完再判断-》添加检测过渡完成事件transitionend
    ul.addEventListener('transitionend', function () {
        // 无缝滚动
        // 如果索引号走到了3说明走到最后一张图片，此时索引号复原为0
        if (index >= 3) {
            index = 0;//此时需要去掉 过渡效果
            ul.style.transition = 'none';
            //继续滚动
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            //继续滚动
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        //3.小圆点跟随变化效果
        //使用classList去掉类名current
        ol.querySelector('.current').classList.remove('current');
        ///使用classList给当前小li添加类名current
        ol.children[index].classList.add('current');
    });
    //4.手指滑动轮播图
    //触摸元素 touchstart:获取手指初始坐标
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        //手滑动的时候停止定时器
        clearInterval(timer);
    });
    //移动手指 touchmove:计算手指滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    });
    // 手指离开，根据滑动距离判断是上一张还是下一张
    ul.addEventListener('touchend', function (e) {
        //移动距离>50px,播放上一张或者下一张
        if (Math.abs(moveX) > 50) {
            // moveX是正值，播放上一张
            if (moveX > 0) {
                index--;
                // moveX是负值，播放下一张
            } else {
                index++;
            }
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else {//回弹
            //回到原来位置
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        //手指离开之前重新开启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            // 每次向左移动一个屏幕的位置
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    });

    //返回顶部模块制作
    var goback = document.querySelector('.goback');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    });
    goback.addEventListener('touchstart', function () {
        window.scroll(0,0);//返回顶部
    });
});
