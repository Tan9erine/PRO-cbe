$(function () {
    // Fixed header
    //-----------------------------------------------
    var headerHeight = $("header").outerHeight();

    $(window).scroll(function() {
        if (($("header").length > 0)) {
            if(($(this).scrollTop() > headerHeight) && ($(window).width() > 991)) {
                $("header").addClass('animated fadeInDown fixed');
                $(".main").css("marginTop", (headerHeight)+"px");
            } else {
                $(".main").css("marginTop", (0)+"px");
                $("header").removeClass('animated fadeInDown fixed');
            }
        };
    });
    //banner-----------------------------------------------
    new Swiper('#customer', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop:true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });
    //移动端导航-----------------------------------------------
    $(".menu-button").click(function(){
        $(".wap-nav").toggleClass("active");
        $("body").toggleClass("active");
    });
    $(".wap-model").click(function(){
        $(".wap-nav").toggleClass("active");
        $("body").toggleClass("active");
    });

    //搜索-----------------------------------------------
    $(".search").mouseenter(function(){
        $(".search input").show();
    });
    $(".header").mouseleave(function(){
        $(".search input").hide();
    });


    //返回顶部-----------------------------------------------
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $(".scrollToTop").fadeIn();
        } else {
            $(".scrollToTop").fadeOut();
        }
    });
    $(".scrollToTop").click(function() {
        $("body,html").animate({scrollTop:0},300);
    });
    //移动端左侧导航-----------------------------------------------
    $(".hd_nav_more").click(function(){
        $(".common-column").toggleClass("active");
    });

    //change li点击展开
    $(".tabs a").mouseover(function(){
        //当前按钮添加active
        $(this).addClass('active').siblings().removeClass('active');

        //对应change_box显示
        var index = $(".tabs a").index($(this));
        $(".change_box").eq(index).show().siblings().hide();

    });

    $('.fwzh').each(function (){
        var fwzh = $(this).text();
        console.log(fwzh);
        if(fwzh == 'null'){
            $('#fwzh').empty();
        }
    });

});
//判断IE8------------------------------------------------
(function(window) {
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        if (ieVersion < 9) {
            var str = "你的浏览器版本太低了 :(";
            var str2 = "推荐使用:<a href='https://browser.360.cn/ee/' target='_blank' style='color:#ff0000'>360极速</a>、"
                + "<a href='http://www.firefox.com.cn/' target='_blank' style='color:#ff0000'>火狐</a>、"
                + "<a href='https://www.liebao.cn/' target='_blank' style='color:#ff0000'>猎豹</a>等双核浏览器急速模式";
            document.writeln("<pre style='text-align:center;color:#336699;" +
                " height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-xwzx.skin:1234'>" +
                "<h2 style='padding-top:200px;margin:0;font-size: 32px;font-weight:bold;'><strong>" + str + "<br/></strong></h2><p" +
                " style='line-height:" +
                " 40px;font-size: 24px;font-weight:bold;margin: 16px 0;'>" +
                str2 + "</p><h2 style='margin:0'><strong>如果你的使用的是双核浏览器,请切换到极速模式访问<br/></strong></h2></pre>");
            document.execCommand("Stop");
        };
    }
})(window);

//字体大中小-----------------------------------------------
$(function () {
    $(".switchsize span").click(function () {
        //获取para的字体大小
        var thisEle = $(".m-txt-article p,.m-txt-article,.m-txt-article font,.m-txt-article span,.m-txt-article div").css("font-size");
        //parseFloat的第二个参数表示转化的进制，10就表示转为10进制
        var textFontSize = parseFloat(thisEle, 10);
        //javascript自带方法
        var unit = thisEle.slice(-2); //获取单位
        var cName = $(this).attr("class");
        if (cName == "bigger") {
            if (textFontSize <= 22) {
                textFontSize += 2;
            }
        } else if (cName == "smaller") {
            textFontSize -= 2;
        }
        $(".m-txt-article p,.m-txt-article,.m-txt-article font,.m-txt-article span,.m-txt-article div").css("font-size", textFontSize + unit);
    });
    $(".switchsize .medium").click(function () {
        $(".m-txt-article p,.m-txt-article,.m-txt-article font,.m-txt-article span,.m-txt-article div").css("font-size", "18px");
    })

    var printAreaCount = 0;
    $.fn.printArea = function () {
        var ele = $(this);
        var idPrefix = "printArea_";
        removePrintArea(idPrefix + printAreaCount);
        printAreaCount++;

        var iframeId = idPrefix + printAreaCount;

        var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
        iframe = document.createElement('IFRAME');
        $(iframe).attr({
            style: iframeStyle,
            id: iframeId
        });
        document.body.appendChild(iframe);
        var doc = iframe.contentWindow.document;

        $(document).find("link").filter(function () {
            return $(this).attr("rel").toLowerCase() == "stylesheet";
        }).each(
            function () {
                doc.write('<link type="text/css" rel="stylesheet" href="'
                    + $(this).attr("href") + '">');
            });
        doc.open();
        doc.write($(ele).prop('outerHTML'));
        doc.close();
        var frameWindow = iframe.contentWindow;
        frameWindow.close();
        frameWindow.focus();
        frameWindow.print();
    }
    var removePrintArea = function (id) {
        $("iframe#" + id).remove();
    };
    //打印调用
    $("#btnPrint").click(function () {
        print();
        $("#article").css("font-size", "18px");
        $("#article").css("line-height", "32px");
    });

    //设置左侧最小高度
    var leftHeight = $('.leftPart').height();
    var rightHeight = $('.rightPart').height();
    if (leftHeight < rightHeight) {
        $('.leftPart').height(rightHeight);
    }

});


//分享-----------------------------------------------
window._bd_share_config = {
    "common": {
        "bdSnsKey": {},
        "bdText": "",
        "bdMini": "2",
        "bdMiniList": ["tsina", "weixin", "sqq", "copy"],
        "bdPic": "",
        "bdStyle": "0",
        "bdSize": "24"
    }, "share": {}
};
with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
