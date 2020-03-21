(function wxshare() {
    // var link = window.location.href.split("?")[0];
    // if (link !== window.location.href) {
    //     link = "https://xdfzx.ronghuiad.com/"
    // }
    // link = window.location.href;
    // console.log(link);
    $.ajax({
        type: "POST",
        url: "https://jdchongqing.ronghuiad.com/index.php/api/wxShare",
        data: {
            url: window.location.href
        },
        success: function(el) {
            var data = JSON.parse(el).data;
            console.log(data);
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
            });
            wx.ready(function() {
                wx.updateAppMessageShareData({
                    title: "蜀道难，难不过“五道坎”",
                    desc: "没有重庆人过不去的坎儿！是时候发挥真正的手速了！",
                    link: "https://jdchongqing.ronghuiad.com",
                    imgUrl: "https://jdchongqing.ronghuiad.com/share.jpg",
                    success: function() {
                        _hmt.push(["_trackEvent", "wxShareButton", "click", "share"])
                    }
                });
                wx.updateTimelineShareData({
                    title: "蜀道难，难不过“五道坎”",
                    link: "https://jdchongqing.ronghuiad.com",
                    imgUrl: "https://jdchongqing.ronghuiad.com/share.jpg",
                    success: function() {
                        _hmt.push(["_trackEvent", "wxShareButton", "click", "share"])
                    }
                })
            })
        },
    })
})();