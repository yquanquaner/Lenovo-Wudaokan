"use strict";

var liukuku = function (window, $) {
    if (window.innerHeight < 1400) {
        TweenMax.set($(".p1Page,.gamePage,.finalPage"), { scale: 0.95 });
        TweenMax.set($(".bigNum,.timeover,.iceBox,.gwqbox2"), { scale: 1.05 });
        TweenMax.set($(".huoBox"), { scaleX: 1.05 });
    }

    // var ccc = new VConsole();
    var p1Ani = new TimelineMax({ paused: true }); //首屏动画
    var rulesAni = new TimelineMax({ paused: true }); // 活动规则动画
    var timeAni = new TimelineMax({ paused: true }); //倒计时动画
    var stoAni = new TimelineMax({ paused: true }); //321动画
    p1Ani.from($(".p1Page"), 1.2, { autoAlpha: 0, y: -1560, ease: Elastic.easeInOut.config(1, 1) }).from($(".p1Page .frame .title1"), .5, { autoAlpha: 0, x: -350, ease: Power4.easeInOut }, .8).from($(".p1Page .frame .title2"), .5, { autoAlpha: 0, x: 350, ease: Power4.easeInOut }, .8).from($(".p1Page .frame .wdk1"), .8, { autoAlpha: 0, scale: 3, ease: Back.easeIn.config(5) }, 1).from($(".p1Page .frame .wdk2"), .8, { autoAlpha: 0, scale: 3, ease: Back.easeIn.config(5) }, 1.25).from($(".p1Page .frame .wdk3"), .8, { autoAlpha: 0, scale: 3, ease: Back.easeIn.config(5) }, 1.5).fromTo($(".p1Page .frame .yun1"), 5, { scale: .85 }, { scale: .95, repeat: -1, yoyo: true, ease: Power0.easeNone }, 1.9).fromTo($(".p1Page .frame .yun2"), 5, { scale: .95 }, { scale: 1.1, repeat: -1, yoyo: true, ease: Power0.easeNone }, 2.7).to($(".p1Page .frame .fc"), 1, { rotationZ: 360, repeat: -1, ease: Power0.easeNone }, 0).to($(".p1Page .frame .l1"), 1.5, { y: 15, repeat: -1, yoyo: true, ease: Power0.easeNone, delay: .1 }, 0).to($(".p1Page .frame .l2"), 1.4, { y: 15, repeat: -1, yoyo: true, ease: Power0.easeNone, delay: 0 }, 0).to($(".p1Page .frame .l3"), 1.3, { y: 15, repeat: -1, yoyo: true, ease: Power0.easeNone, delay: .2 }, 0).to($(".p1Page .frame .l4"), 1.6, { y: 15, repeat: -1, yoyo: true, ease: Power0.easeNone, delay: .3 }, 0).to($(".p1Page .frame .lc"), 6, {
        // y: -104,
        // x: 239,
        repeat: -1,
        yoyo: true,
        ease: Power0.easeNone,
        bezier: [{ x: 0, y: 0 }, { x: 60, y: -10 }, { x: 239, y: -104 }]
    }, 0);
    rulesAni.from($(".rulesPage .f1"), .5, { autoAlpha: 0, y: -200 }).from($(".rulesPage .f2"), .5, { autoAlpha: 0, y: -200 }, .2).from($(".rulesPage .f3"), .5, { autoAlpha: 0, y: -200 }, .4);
    timeAni.to($(".time_z1"), 6, { rotationZ: -360, repeat: -1, ease: Power0.easeNone, transformOrigin: "center bottom" }, 0).to($(".time_z2"), 1, { rotationZ: -360, repeat: -1, ease: Power0.easeNone, transformOrigin: "left center" }, 0).to($(".time_pre"), 10, { "width": "0px" }, 0);
    // timeAni.play()

    stoAni.from($(".bigNum .bn3"), 1, {
        autoAlpha: 0,
        scale: 3,
        // ease: Back.easeIn.config(5),
        onComplete: function onComplete() {
            $(".bigNum .bn3").css("display", "none");
        }
    }).from($(".bigNum .bn2"), 1, {
        autoAlpha: 0,
        scale: 3,
        // ease: Back.easeIn.config(5),
        onComplete: function onComplete() {
            $(".bigNum .bn2").css("display", "none");
        }
    }).from($(".bigNum .bn1"), 1, {
        autoAlpha: 0,
        scale: 3,
        // ease: Back.easeIn.config(5),
        onComplete: function onComplete() {
            $(".bigNum .bn1").css("display", "none");
            $(".bigNum").fadeOut(500);
        }
    });
    // stoAni.play();


    var audio;
    var musicok = document.getElementById("musicok");
    var musicfa = document.getElementById("musicfa");

    function audioAutoPlay(id) {
        audio = document.getElementById(id);
        console.log(audio);

        if (window.WeixinJSBridge) {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                audio.play();
                musicok.play();
                musicok.pause();
                musicfa.play();
                musicfa.pause();
            }, false);
        } else {
            document.addEventListener("WeixinJSBridgeReady", function () {
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    audio.play();
                    musicok.play();
                    musicok.pause();
                    musicfa.play();
                    musicfa.pause();
                });
            }, false);
        }
        audio.play();
        musicok.play();
        musicok.pause();
        musicfa.play();
        musicfa.pause();
        return false;
    }
    audioAutoPlay("music");
    $(".micIcon").on("touchstart", function () {
        if (audio.paused) {
            audio.play(); // 播放 
            $(this).css("background-position-y", "-0px");
        } else {
            audio.pause(); // 暂停
            $(this).css("background-position-y", "-84px");
        }
    });

    //页面资源加载**************************************************************************
    function loadImg() {
        // loadAni.play();
        var preload = new createjs.LoadQueue(false);
        preload.on("progress", handleProgress);
        preload.on("complete", handleComplete);
        preload.installPlugin(createjs.Sound);
        preload.setMaxConnections(10);
        preload.loadManifest(manifest);

        function handleProgress(e) {
            $(".load_pros").css("width", parseInt(e.progress * 100) + "%");
            $(".load_font2").html(parseInt(e.progress * 100) + "%");
        };

        function handleComplete() {
            $(".loadPage").fadeOut(500, function () {
                $(this).remove();
            });
            p1Ani.play();
            myAni.play();
        };
    };
    loadImg();
    var isloadxl1 = false;
    var isloadxl2 = false;
    var isloadxl3 = false;
    var isloadxl4 = false;
    var isloadxl5 = false;

    function loadxulioter(mini) {
        var preload = new createjs.LoadQueue(false);
        preload.on("progress", handleProgress);
        preload.on("complete", handleComplete);
        preload.installPlugin(createjs.Sound);
        preload.setMaxConnections(10);
        preload.loadManifest(mini);

        function handleProgress(e) {};

        function handleComplete() {};
    }

    var myAni = new myAniFN();
    //首页gopro动画 *********************************************************
    function myAniFN() {
        this.goproAni;
        this.peopleAni;
    }
    myAniFN.prototype.play = function () {
        var _this = this;
        _this.goproAni = setInterval(function () {
            $(".p1Page .frame .go").animate({ top: "15px", left: "280px" });
            setTimeout(function () {
                var myTween = new TweenMax.fromTo($(".p1Page .frame .gos"), .2, { autoAlpha: 1 }, { autoAlpha: 0, repeat: 1 }, 1.5);
            }, 500);
            setTimeout(function () {
                $(".p1Page .frame .go").animate({ top: "40px", left: "270px" });
            }, 1000);
        }, 3000);
        _this.peopleAni = setInterval(function () {
            $(".p1Page .frame .p1").addClass("p2");
            setTimeout(function () {
                $(".p1Page .frame .p1").removeClass("p2");
            }, 200);
        }, 500);
    };
    myAniFN.prototype.stop = function () {
        var _this = this;
        clearInterval(_this.goproAni);
        clearInterval(_this.peopleAni);
    };

    // discolourAni()
    var game1color = new discolourAni($(".game1"));
    var game2color = new discolourAni($(".game2"));
    var game3color = new discolourAni($(".game3"));
    var game4color = new discolourAni($(".game4"));
    var game5color = new discolourAni($(".game5"));
    //产品晃动变色**************************************************************************
    function discolourAni(dom) {
        this.s1num = true;
        this.ss1 = null;
        this.ss2 = null;
        this.ss3 = null;
        this.ss4 = null;
        this.st1 = null;
        this.st2 = null;
        this.st3 = null;
        this.st4 = null;
        this.dom = dom;
    }

    discolourAni.prototype.play = function () {
        var _this = this;
        $(_this.dom).find(".g1cpBox").fadeIn(500);
        TweenMax.set($(_this.dom).find(".tipHand"), {
            x: 800,
            onComplete: function onComplete() {
                $(_this.dom).find(".tipHand").css("display", "block");
            }
        });
        _this.st1 = setTimeout(function () {
            TweenMax.to($(_this.dom).find(".tipHand"), .5, {
                x: 0,
                y: 0,
                onComplete: function onComplete() {
                    _this.ss1 = setInterval(function () {
                        if (_this.s1num) {
                            $(_this.dom).find(".cp1 .cn2").css("display", "none");
                            $(_this.dom).find(".cp1 .cpfbg2").css("display", "none");
                            _this.s1num = false;
                        } else {
                            $(_this.dom).find(".cp1 .cn2").css("display", "block");
                            $(_this.dom).find(".cp1 .cpfbg2").css("display", "block");
                            _this.s1num = true;
                        }
                    }, 200);
                    TweenMax.to($(_this.dom).find(".cp1 .cpIcon"), .01, { x: 5, repeat: 100, yoyo: true });
                }
            });
        }, 100);

        _this.st2 = setTimeout(function () {
            clearInterval(_this.ss1);
            _this.ss1 = null;
            $(_this.dom).find(".cp1 .cn2").css("display", "block");
            $(_this.dom).find(".cp1 .cpfbg2").css("display", "block");
            TweenMax.to($(_this.dom).find(".tipHand"), 1, {
                x: 100,
                y: 120,
                onComplete: function onComplete() {
                    _this.ss2 = setInterval(function () {
                        if (_this.s1num) {
                            $(_this.dom).find(".cp2 .cn2").css("display", "none");
                            $(_this.dom).find(".cp2 .cpfbg2").css("display", "none");
                            _this.s1num = false;
                        } else {
                            $(_this.dom).find(".cp2 .cn2").css("display", "block");
                            $(_this.dom).find(".cp2 .cpfbg2").css("display", "block");
                            _this.s1num = true;
                        }
                    }, 200);
                    TweenMax.to($(_this.dom).find(".cp2 .cpIcon"), .01, { x: 5, repeat: 100, yoyo: true });
                }
            });
        }, 1500);
        _this.st3 = setTimeout(function () {
            clearInterval(_this.ss2);
            _this.ss2 = null;
            $(_this.dom).find(".cp2 .cn2").css("display", "block");
            $(_this.dom).find(".cp2 .cpfbg2").css("display", "block");
            TweenMax.to($(_this.dom).find(".tipHand"), 1, {
                x: 0,
                y: 260,
                onComplete: function onComplete() {
                    _this.ss3 = setInterval(function () {
                        if (_this.s1num) {
                            $(_this.dom).find(".cp3 .cn2").css("display", "none");
                            $(_this.dom).find(".cp3 .cpfbg2").css("display", "none");
                            _this.s1num = false;
                        } else {
                            $(_this.dom).find(".cp3 .cn2").css("display", "block");
                            $(_this.dom).find(".cp3 .cpfbg2").css("display", "block");
                            _this.s1num = true;
                        }
                    }, 200);
                    TweenMax.to($(_this.dom).find(".cp3 .cpIcon"), .01, { x: 5, repeat: 100, yoyo: true });
                }
            });
        }, 3000);
        _this.st4 = setTimeout(function () {
            clearInterval(_this.ss3);
            _this.ss3 = null;
            $(_this.dom).find(".cp3 .cn2").css("display", "block");
            $(_this.dom).find(".cp3 .cpfbg2").css("display", "block");
            $(_this.dom).find(".tipHand").fadeOut(500);
        }, 4500);
    };
    discolourAni.prototype.stop = function () {
        var _this = this;
        clearInterval(_this.ss1);
        clearInterval(_this.ss2);
        clearInterval(_this.ss3);
        clearInterval(_this.ss4);
        clearTimeout(_this.st1);
        clearTimeout(_this.st2);
        clearTimeout(_this.st3);
        clearTimeout(_this.st4);
        _this.ss1 = null;
        _this.ss2 = null;
        _this.ss3 = null;
        _this.ss4 = null;
        _this.st1 = null;
        _this.st2 = null;
        _this.st3 = null;
        _this.st4 = null;
        $(_this.dom).find(".cn2,.cpfbg2").css("display", "block");
        $(_this.dom).find(".g1cpBox").fadeOut(500);
    };

    //序列帧动画*******************************************************************************
    function kanAni(dom, loop, speed, count, callback) {
        this.num = 0;
        this.countNum = 0;
        this.dom = dom;
        this.stv = null;
        this.loop = loop;
        this.speed = speed;
        this.count = count;
        this.callback = callback;
    }
    kanAni.prototype.play = function () {
        var _this = this;
        // fn();
        _this.stv = setInterval(function () {
            fn();
        }, _this.speed);

        function fn() {
            $(_this.dom).eq(_this.num).css("opacity", "1").siblings().css("opacity", "0");
            _this.num++;
            if (_this.num > $(_this.dom).length) {
                if (_this.loop) {
                    _this.num = 0;
                    if (!isEmpty(_this.count)) {
                        _this.countNum++;
                        if (_this.countNum >= _this.count) {
                            _this.clean();
                        }
                    }
                } else {
                    _this.clean();
                }
            }
        }
    };

    kanAni.prototype.clean = function () {
        var _this = this;
        clearInterval(_this.stv);
        _this.stv = null;
        _this.num = 0;
        _this.countNum = 0;
        typeof _this.callback === "function" ? _this.callback() : null;
    };
    var iceAni = new kanAni(".iceGif", true, 1000 / 30);
    // iceAni.play();
    var douAni = new kanAni(".douGif", true, 1000 / 20, 2, function () {
        // $(".g1cpBox").fadeIn(500, function() {
        $(".douBox").fadeOut(500);
        // })
    });
    // douAni.play();
    var huoAni = new kanAni(".huoGif", true, 1000 / 20);
    var dlAni = new kanAni(".dlGif", true, 1000 / 30);

    var renAni = new kanAni(".renGif", true, 1000 / 5);
    var yifuAni = new kanAni(".yifuGif", true, 1000 / 30);
    var ishuiAni = new kanAni(".ishuiGif", true, 1000 / 30);

    var g3ch1 = new kanAni(".ch1Gif", false, 1000 / 30);
    var g3ch2 = new kanAni(".ch2Gif", false, 1000 / 30);
    var g3ch3 = new kanAni(".ch3Gif", false, 1000 / 30);

    // huoAni.play();
    // console.log(num)
    var g4ch1 = new kanAni(".g4ch1Gif", true, 1000 / 30);
    var g4ch2 = new kanAni(".g4ch2Gif", true, 1000 / 30);
    var g4ch3 = new kanAni(".g4ch3Gif", false, 1000 / 30);
    var hsrenAni = new kanAni(".hsrenGif", true, 1000 / 15);
    var inityanAni = new kanAni(".inityanGif", true, 1000 / 30);

    var g5initren = new kanAni(".g5initren", true, 1000 / 15);
    var g5ch2 = new kanAni(".g5ch2Gif", true, 1000 / 15);
    var g5ch3 = new kanAni(".g5ch3Gif", true, 1000 / 5);
    var g5ok = new kanAni(".g5okGif", true, 1000 / 30);

    //倒计时 
    var countDomn = new CoolDown();

    //事件绑定区***************************************************************************
    $(".rulesBtn").on("click", function () {
        $(".rulesPage").fadeIn(500);
        rulesAni.play();
    });
    $(".close").on("click", function () {
        $(".rulesPage").fadeOut(500, function () {
            rulesAni.pause(0);
        });
    });
    $(".beginBtn").on("click", function () {
        game1.initAni();
    });

    ////
    var game1 = new gameFn1(30);
    var game2 = new gameFn2(30);
    var game3 = new gameFn3(30);
    var game4 = new gameFn4(30);
    var game5 = new gameFn5(30);

    function gameFn1(maxnum) {
        this.finalnum = 0;
        this.cpnum;
        this.maxnum = maxnum;
    }
    gameFn1.prototype.initAni = function () {
        if (!isloadxl1) {
            loadxulioter(g1mina);
            isloadxl1 = true;
        }
        var _this = this;
        _this.reset();

        $(".game1").fadeIn(500);
        TweenMax.to($(".p1Page"), .5, {
            y: -1600,
            ease: Back.easeIn.config(1.05),
            onComplete: function onComplete() {
                $(".rulesPage").fadeOut(0);
                TweenMax.set($(".gamePage"), { y: 0 });
                TweenMax.set($(".game1"), { y: 0 });
                TweenMax.from($(".gamePage"), 1, {
                    y: -1600,
                    autoAlpha: 0,
                    ease: Elastic.easeInOut.config(1, 1),
                    onComplete: function onComplete() {
                        _this.freed();
                        $(".p1Page").css("display", "none");
                        $(".timeover .fail").css("background", "url('images/fail/f1.png')no-repeat");
                        $(".timeover .success").css("background", "url('images/success/s1.png')no-repeat");
                    }
                });
                $(".gamePage,.game1").css("display", "block");
            }
        });
    };
    gameFn1.prototype.freed = function () {
        var _this = this;
        // 首页到游戏1的过渡

        $(".iceBox").fadeIn(1500);
        $(".douBox").fadeIn(1500);
        iceAni.play();
        douAni.play();
        game1color.play();

        //产品列举点击操作
        $(".game1 .gcp").unbind().on("click", function () {
            _this.cpnum = $(this).index();
            $(".game1 .hotSpace .uc").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game1 .hotSpace .un").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game1 .hotSpace").fadeIn(500);
            game1color.stop();

            $(".game1 .g1cpBox").fadeOut(500, function () {});
            $(".game1 .backChoose").fadeIn(500);
            $(".game1 .tipHand").fadeOut();
        });
        //产品点击热区第一次点击 开始倒计时
        $(".game1 .hotSpace").on("click", function () {
            $(".bigNum").fadeIn(300, function () {
                stoAni.play();
                setTimeout(function () {
                    $(".bigNum").fadeOut(500, function () {
                        stoAni.pause(0);
                        $(".bigNum div").css("display", "block");
                    });
                    $(".game1 .clickTip").fadeOut(500);
                    $(".game1 .backChoose").fadeOut(500);
                    $(".game1 .ksClick").addClass("ksClickAni").fadeIn(500);
                    $(".game1 .hotSpace").unbind();
                    gameClick();
                }, 3000);
            });
        });
        $(".game1 .backChoose").on("click", function () {
            $(".game1 .hotSpace").fadeOut(500);
            $(".game1 .g1cpBox").fadeIn(500);
            $(".game1 .backChoose").fadeOut(500);
        });

        function gameClick() {
            timeAni.play();
            $(".game1 .hotSpace").on("touchstart", function () {
                _this.finalnum++;
                if (_this.finalnum <= _this.maxnum) {
                    $(".wdj_linef").width(503 / _this.maxnum * _this.finalnum + "px");
                } else {
                    countDomn.reset();
                    timever();
                }
                if (_this.cpnum == 0) {
                    $(".game1 .ch0").fadeOut(500);

                    $(".game1 .ch1").fadeIn(0);
                    $(".game1 .ch1s2").css("display", "none");
                } else if (_this.cpnum == 1) {
                    $(".game1 .ch0").fadeOut(500);
                    $(".game1 .ch2").fadeIn(0);
                    $(".game1 .ch2s2").css("display", "none");
                } else {
                    // $(".game1 .ch0").fadeOut(500);

                    $(".game1 .ch3").fadeIn(0);
                    if (_this.finalnum > 0 && _this.finalnum < 7) {
                        $(".game1 .ch3s1").css("display", "block");
                    } else if (_this.finalnum >= 7 && _this.finalnum < 14) {
                        $(".game1 .ch3s2").css("display", "block");
                    } else if (_this.finalnum >= 14 && _this.finalnum < 21) {
                        $(".game1 .ch3s3").css("display", "block");
                    } else {
                        $(".game1 .ch3s4").css("display", "block");
                    }
                }
            });
            $(".game1 .hotSpace").on("touchend", function () {
                if (_this.cpnum == 0) {
                    $(".game1 .ch1s2").css("display", "block");
                } else if (_this.cpnum == 1) {
                    $(".game1 .ch2s2").css("display", "block");
                } else {
                    if (_this.finalnum > 0 && _this.finalnum < 7) {
                        $(".game1 .ch3s1").css("display", "none");
                    } else if (_this.finalnum >= 7 && _this.finalnum < 14) {
                        $(".game1 .ch3s1").css("display", "block");
                        $(".game1 .ch3s2").css("display", "none");
                    } else if (_this.finalnum >= 14 && _this.finalnum < 21) {
                        $(".game1 .ch3s2").css("display", "block");
                        $(".game1 .ch3s3").css("display", "none");
                    } else if (_this.finalnum >= 21 && _this.finalnum < 29) {
                        $(".game1 .ch3s3").css("display", "block");
                        $(".game1 .ch3s4").css("display", "none");
                    } else {
                        $(".game1 .ch3s4").css("display", "block");
                    }
                }
            });
            countDomn.play(5, function () {
                timever();
            });
        }

        function timever() {
            $(".game1 .hotSpace").unbind();

            timeAni.pause(0);
            $(".time_font").html("5s");
            $(".game1 .ksClick").removeClass("ksClickAni");
            console.log("总共点击了：" + _this.finalnum + "次");
            if (_this.finalnum >= 30) {
                console.log("挑战成功进入下一关");
                musicok.play();
                iceAni.clean();
                $(".iceBox").fadeOut();
                iceAni.clean();

                $(".game1 .successPage").fadeIn(1000);
                $(".huoBox").fadeIn(1500);
                huoAni.play();
                setTimeout(function () {
                    $(".timeover,.timeover .success").fadeIn(500);
                }, 2000);
                $(".timeover .toBtn").unbind().on("click", function () {
                    game2.initAni();
                    $(".timeover").fadeOut(500);
                });
            } else {
                console.log("挑战失败，自由选择干嘛");
                musicfa.play();

                iceAni.clean();
                $(".iceBox").fadeOut();
                $(".timeover,.timeover .fail").fadeIn(500, function () {
                    $(".timeover .lbtn").unbind().on("click", function () {
                        _this.reset();
                        _this.freed();
                    });
                    $(".timeover .rbtn").unbind().on("click", function () {
                        window.location.replace("https://pro.m.jd.com/mall/active/35BDrAN8cNQnDq9pt5KwkfeyMDEv/index.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ad_od=share&from=groupmessage&isappinstalled=0&scene=1&clicktime=1577356099&enterid=1577356099");
                    });
                });
            }
        }
    };
    gameFn1.prototype.reset = function () {
        var _this = this;
        $(".timeover,.timeover .fail,.timeover .success").fadeOut(500);
        $(".huoBox").fadeOut();
        huoAni.clean();
        $(".game1 .ksClick").fadeOut(500);
        $(".game1 .hotSpace").fadeOut(500);
        $(".game1 .backChoose").fadeOut(500);
        $(".game1 .successPage").fadeOut(0);
        $(".game1 .clickTip").fadeIn(500);
        game1color.stop();
        $(".game1 .wdj_linef").width("0px");
        $(".game1 .ch0").fadeIn(500);
        $(".game1 .ch1,.game1 .ch2,.game1 .ch3,.game1 .ch3 div").css("display", "none");
        $(".game1 .ch1 div,.game1 .ch2 div").css("display", "block");
        _this.finalnum = 0;
    };

    function gameFn2(maxnum) {
        this.finalnum = 0;
        this.cpnum;
        this.maxnum = maxnum;
    }
    gameFn2.prototype.initAni = function () {
        if (!isloadxl2) {
            loadxulioter(g2mina);
            isloadxl2 = true;
        }
        var _this = this;
        _this.reset();

        // TweenMax.to($(".game1"), .5, {
        TweenMax.to($(".game1"), .5, {
            y: -1600,
            ease: Back.easeIn.config(1.05),
            onComplete: function onComplete() {
                game1.reset();
                TweenMax.set($(".game2"), { y: 0 });

                TweenMax.from($(".game2"), 1, {
                    y: -1600,
                    autoAlpha: 0,
                    ease: Elastic.easeInOut.config(1, 1),
                    onComplete: function onComplete() {
                        _this.freed();
                        $(".timeover .fail").css("background", "url('images/fail/f2.png')no-repeat");
                        $(".timeover .success").css("background", "url('images/success/s2.png')no-repeat");
                    }
                });
                $(".game2").css("display", "block");
            }
        });
    };
    gameFn2.prototype.freed = function () {
        var _this = this;
        // 首页到游戏1的过渡
        dlAni.play();
        game2color.play();
        //产品列举点击操作
        $(".game2 .gcp").unbind().on("click", function () {
            _this.cpnum = $(this).index();
            $(".game2 .hotSpace .uc").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game2 .hotSpace .un").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game2 .hotSpace").fadeIn(500);
            $(".game2 .g1cpBox").fadeOut(500);
            $(".game2 .backChoose").fadeIn(500);
            $(".game2 .tipHand").fadeOut();
            game2color.stop();
        });
        //产品点击热区第一次点击 开始倒计时
        $(".game2 .hotSpace").on("click", function () {
            $(".bigNum").fadeIn(300, function () {
                stoAni.play();
                setTimeout(function () {
                    $(".bigNum").fadeOut(500, function () {
                        stoAni.pause(0);
                        $(".bigNum div").css("display", "block");
                    });
                    $(".game2 .clickTip").fadeOut(500);
                    $(".game2 .backChoose").fadeOut(500);
                    $(".game2 .ksClick").addClass("ksClickAni").fadeIn(500);
                    $(".game2 .hotSpace").unbind();
                    gameClick();
                }, 3000);
            });
        });
        $(".game2 .backChoose").on("click", function () {
            $(".game2 .hotSpace").fadeOut(500);
            $(".game2 .g1cpBox").fadeIn(500);
            $(".game2 .backChoose").fadeOut(500);
        });

        function gameClick() {
            timeAni.play();
            $(".game2 .ch0").fadeOut(500);
            var dom1, dom2;
            if (_this.cpnum == 0) {

                $(".game2 .ch1").fadeIn(0);
                $(".game2 .ch1 .chs1").css("display", "block");
                $(".game2 .ch1 .chs2").css("display", "none");
                dom1 = $(".game2 .ch1 .chs1");
                dom2 = $(".game2 .ch1 .chs2");
            } else if (_this.cpnum == 1) {
                $(".game2 .ch2").fadeIn(0);
                $(".game2 .ch2 .chs1").css("display", "block");
                $(".game2 .ch2 .chs2").css("display", "none");
                dom1 = $(".game2 .ch2 .chs1");
                dom2 = $(".game2  .ch2 .chs2");
            } else {
                $(".game2 .ch3").fadeIn(0);
                $(".game2 .ch3 .chs1").css("display", "block");
                $(".game2 .ch3 .chs2").css("display", "none");
                dom1 = $(".game2  .ch3 .chs1");
                dom2 = $(".game2  .ch3 .chs2");
            }

            $(".game2 .hotSpace").on("touchstart", function () {
                _this.finalnum++;
                if (_this.finalnum <= _this.maxnum) {
                    $(".wdj_linef").width(503 / _this.maxnum * _this.finalnum + "px");
                } else {
                    countDomn.reset();
                    timever();
                }
                dom1.css("display", "block");
                dom2.css("display", "none");
            });
            $(".game2 .hotSpace").on("touchend", function () {
                dom1.css("display", "none");
                dom2.css("display", "block");
            });
            countDomn.play(5, function () {
                timever();
            });
        }

        function timever() {
            $(".game2 .hotSpace").unbind();

            timeAni.pause(0);
            $(".time_font").html("5s");
            $(".game2 .ksClick").removeClass("ksClickAni");
            console.log("总共点击了：" + _this.finalnum + "次");
            if (_this.finalnum >= 30) {
                console.log("挑战成功进入下一关");
                musicok.play();

                $(".game2 .ch1,.game2 .ch2,.game2 .ch3").fadeOut(0);
                $(".game2 .successPage").fadeIn(0);
                setTimeout(function () {
                    $(".timeover,.timeover .success").fadeIn(500);
                }, 2000);
                $(".timeover .toBtn").unbind().on("click", function () {
                    game3.initAni();
                    $(".timeover").fadeOut(500);
                });
            } else {
                console.log("挑战失败，自由选择干嘛");
                musicfa.play();

                $(".timeover,.timeover .fail").fadeIn(500, function () {
                    $(".timeover .lbtn").unbind().on("click", function () {
                        _this.reset();
                        _this.freed();
                    });
                    $(".timeover .rbtn").unbind().on("click", function () {
                        window.location.replace("https://pro.m.jd.com/mall/active/35BDrAN8cNQnDq9pt5KwkfeyMDEv/index.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ad_od=share&from=groupmessage&isappinstalled=0&scene=1&clicktime=1577356099&enterid=1577356099");
                    });
                });
            }
        }
    };
    gameFn2.prototype.reset = function () {
        var _this = this;
        $(".timeover,.timeover .fail,.timeover .success").fadeOut(500);
        $(".game2 .ksClick,.game2 .hotSpace,.game2 .backChoose").fadeOut(500);
        $(".game2 .successPage").fadeOut(0);
        $(".game2 .clickTip").fadeIn(500);
        game2color.stop();
        $(".game2 .wdj_linef").width("0px");
        $(".game2 .ch0").fadeIn(500);
        $(".game2 .ch1,.game2 .ch2,.game2 .ch3,.game2 .ch1 div,.game2 .ch2 div,.game2 .ch3 div").css("display", "none");
        _this.finalnum = 0;
    };

    function gameFn3(maxnum) {
        this.finalnum = 0;
        this.cpnum;
        this.maxnum = maxnum;
    }
    gameFn3.prototype.initAni = function () {
        if (!isloadxl3) {
            loadxulioter(g3mina);
            isloadxl3 = true;
        }
        var _this = this;
        _this.reset();

        // TweenMax.to($(".game1"), .5, {
        TweenMax.to($(".game2"), .5, {
            y: -1600,
            ease: Back.easeIn.config(1.05),
            onComplete: function onComplete() {
                game2.reset();
                TweenMax.set($(".game3"), { y: 0 });

                TweenMax.from($(".game3"), 1, {
                    y: -1600,
                    autoAlpha: 0,
                    ease: Elastic.easeInOut.config(1, 1),
                    onComplete: function onComplete() {
                        _this.freed();
                        $(".game2").css("display", "none");
                        $(".timeover .fail").css("background", "url('images/fail/f3.png')no-repeat");
                        $(".timeover .success").css("background", "url('images/success/s3.png')no-repeat");
                    }
                });
                $(".game3").css("display", "block");
            }
        });
    };
    gameFn3.prototype.freed = function () {
        var _this = this;
        // 首页到游戏1的过渡
        $(".renBox").fadeIn(500);
        $(".yifuBox").fadeIn(500);
        $(".ishuiBox").fadeIn(500);
        renAni.play();
        yifuAni.play();
        ishuiAni.play();

        game3color.play();
        //产品列举点击操作
        $(".game3 .gcp").unbind().on("click", function () {
            _this.cpnum = $(this).index();
            $(".game3 .hotSpace .uc").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game3 .hotSpace .un").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game3 .hotSpace").fadeIn(500);
            $(".game3 .g1cpBox").fadeOut(500);
            $(".game3 .backChoose").fadeIn(500);
            $(".game3 .tipHand").fadeOut();
            game3color.stop();
        });
        //产品点击热区第一次点击 开始倒计时
        $(".game3 .hotSpace").on("click", function () {
            $(".bigNum").fadeIn(300, function () {
                stoAni.play();
                setTimeout(function () {
                    $(".bigNum").fadeOut(500, function () {
                        stoAni.pause(0);
                        $(".bigNum div").css("display", "block");
                    });
                    $(".game3 .clickTip").fadeOut(500);
                    $(".game3 .backChoose").fadeOut(500);
                    $(".game3 .ksClick").addClass("ksClickAni").fadeIn(500);
                    $(".game3 .hotSpace").unbind();
                    gameClick();
                }, 3000);
            });
        });
        $(".game3 .backChoose").on("click", function () {
            $(".game3 .hotSpace").fadeOut(500);
            $(".game3 .g1cpBox").fadeIn(500);
            $(".game3 .backChoose").fadeOut(500);
        });

        function gameClick() {
            timeAni.play();
            renAni.clean();
            yifuAni.clean();
            $(".renBox").fadeOut(0);
            $(".yifuBox").fadeOut(0);
            $(".ishuiBox").fadeOut(0);

            var dom0, dom1, dom2, dom3, dom4;
            if (_this.cpnum == 0) {
                $(".game3 .ch1").fadeIn(0);
                $(".game3 .ch1 .chs0").css("display", "block").siblings().css("display", "none");
                dom1 = $(".game3 .ch1 .chs1");
                dom2 = $(".game3 .ch1 .chs2");
                dom3 = $(".game3 .ch1 .chs3");
                dom4 = $(".game3 .ch1 .chs4");
                dom0 = $(".game3 .ch1 .chs0");
            } else if (_this.cpnum == 1) {
                ishuiAni.clean();
                $(".game3 .yj2").fadeOut(0);
                $(".game3 .ch2").fadeIn(0);
                $(".game3 .ch2 .chs0").css("display", "block").siblings().css("display", "none");
                dom1 = $(".game3 .ch2 .chs1");
                dom2 = $(".game3  .ch2 .chs2");
                dom3 = $(".game3  .ch2 .chs3");
                dom4 = $(".game3  .ch2 .chs4");
                dom0 = $(".game3 .ch2 .chs0");
            } else {
                ishuiAni.clean();

                $(".game3 .ch3").fadeIn(0);
                $(".game3 .ch3 .chs1").css("display", "block");
                $(".game3 .ch3 .chs2").css("display", "none");
                dom0 = $(".game3 .ch3 .chs0");
                dom1 = $(".game3 .ch3 .chs1");
                dom2 = $(".game3 .ch3 .chs2");
                dom3 = $(".game3 .ch3 .chs3");
                dom4 = $(".game3 .ch3 .chs4");
            }

            $(".game3 .hotSpace").on("touchstart", function () {
                _this.finalnum++;
                if (_this.finalnum <= _this.maxnum) {
                    $(".wdj_linef").width(503 / _this.maxnum * _this.finalnum + "px");
                } else {
                    countDomn.reset();
                    timever();
                }

                if (_this.finalnum > 0 && _this.finalnum < 7) {
                    dom1.css("display", "block").siblings().css("display", "none");
                } else if (_this.finalnum >= 7 && _this.finalnum < 14) {
                    dom2.css("display", "block").siblings().css("display", "none");
                } else if (_this.finalnum >= 14 && _this.finalnum < 21) {
                    dom3.css("display", "block").siblings().css("display", "none");
                } else if (_this.finalnum >= 21 && _this.finalnum < 29) {
                    dom4.css("display", "block").siblings().css("display", "none");
                } else {}
            });
            $(".game3 .hotSpace").on("touchend", function () {
                if (_this.finalnum > 0 && _this.finalnum < 7) {
                    dom0.css("display", "block").siblings().css("display", "none");
                } else if (_this.finalnum >= 7 && _this.finalnum < 14) {
                    dom1.css("display", "block").siblings().css("display", "none");
                } else if (_this.finalnum >= 14 && _this.finalnum < 21) {
                    dom2.css("display", "block").siblings().css("display", "none");
                } else if (_this.finalnum >= 21 && _this.finalnum < 29) {
                    dom3.css("display", "block").siblings().css("display", "none");
                } else {}
            });
            countDomn.play(5, function () {
                timever();
            });
        }

        function timever() {
            $(".game3 .hotSpace").unbind();

            timeAni.pause(0);
            $(".time_font").html("5s");
            $(".game3 .ksClick").removeClass("ksClickAni");
            console.log("总共点击了：" + _this.finalnum + "次");
            if (_this.finalnum >= 30) {
                console.log("挑战成功进入下一关");
                musicok.play();

                $(".game3 .ch1,.game3 .ch2,.game3 .ch3").fadeOut(0);

                if (_this.cpnum == 0) {
                    $(".game3 .ch1Box").fadeIn(0);
                    g3ch1.play();
                } else if (_this.cpnum == 1) {
                    $(".game3 .ch2Box").fadeIn(0);
                    g3ch2.play();
                } else if (_this.cpnum == 2) {
                    $(".game3 .ch3Box").fadeIn(0);
                    g3ch3.play();
                }

                setTimeout(function () {
                    $(".timeover,.timeover .success").fadeIn(500);
                }, 2000);
                $(".timeover .toBtn").unbind().on("click", function () {
                    game4.initAni();
                    $(".timeover").fadeOut(500);
                });
            } else {
                console.log("挑战失败，自由选择干嘛");
                musicfa.play();

                $(".timeover,.timeover .fail").fadeIn(500, function () {
                    $(".timeover .lbtn").unbind().on("click", function () {
                        _this.reset();
                        _this.freed();
                    });
                    $(".timeover .rbtn").unbind().on("click", function () {
                        window.location.replace("https://pro.m.jd.com/mall/active/35BDrAN8cNQnDq9pt5KwkfeyMDEv/index.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ad_od=share&from=groupmessage&isappinstalled=0&scene=1&clicktime=1577356099&enterid=1577356099");
                    });
                });
            }
        }
    };
    gameFn3.prototype.reset = function () {
        var _this = this;
        $(".timeover,.timeover .fail,.timeover .success").fadeOut(500);
        $(".game3 .ksClick,.game3 .hotSpace,.game3 .backChoose").fadeOut(500);
        $(".game3 .successPage").fadeOut(0);
        $(".game3 .clickTip").fadeIn(500);
        game3color.stop();
        $(".game3 .wdj_linef").width("0px");
        $(".game3 .ch0").fadeIn(500);
        $(".game3 .ch1,.game3 .ch2,.game3 .ch3,.game3 .ch1 div,.game3 .ch2 div,.game3 .ch3 div").css("display", "none");
        $(".game3 .yj2").fadeIn(500);
        $(".game3 .ch1Box").fadeOut(0);
        g3ch1.clean();
        $(".game3 .ch2Box").fadeOut(0);
        g3ch2.clean();
        $(".game3 .ch3Box").fadeOut(0);
        g3ch3.clean();
        _this.finalnum = 0;
    };

    function gameFn4(maxnum) {
        this.finalnum = 0;
        this.cpnum;
        this.maxnum = maxnum;
    }
    gameFn4.prototype.initAni = function () {
        if (!isloadxl4) {
            loadxulioter(g4mina);
            isloadxl4 = true;
        }
        var _this = this;

        _this.reset();

        // TweenMax.to($(".game1"), .5, {

        TweenMax.to($(".game3"), .5, {
            y: -1600,
            ease: Back.easeIn.config(1.05),
            onComplete: function onComplete() {
                game3.reset();
                TweenMax.set($(".game4"), { y: 0 });

                TweenMax.from($(".game4"), 1, {
                    y: -1600,
                    autoAlpha: 0,
                    ease: Elastic.easeInOut.config(1, 1),
                    onComplete: function onComplete() {
                        _this.freed();
                        $(".game3").css("display", "none");
                        $(".timeover .fail").css("background", "url('images/fail/f4.png')no-repeat");
                        $(".timeover .success").css("background", "url('images/success/s4.png')no-repeat");
                    }
                });
                $(".game4").css("display", "block");
            }
        });
    };
    gameFn4.prototype.freed = function () {
        var _this = this;
        // 首页到游戏1的过渡
        hsrenAni.play();
        inityanAni.play();
        $(".game4 .inityanBox").fadeIn(500);
        $(".game4 .hsrenBox").fadeIn(500);
        game4color.play();
        //产品列举点击操作
        $(".game4 .gcp").unbind().on("click", function () {
            _this.cpnum = $(this).index();
            $(".game4 .hotSpace .uc").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game4 .hotSpace .un").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game4 .hotSpace").fadeIn(500);
            $(".game4 .g1cpBox").fadeOut(500);
            $(".game4 .backChoose").fadeIn(500);
            $(".game4 .tipHand").fadeOut();
            game4color.stop();
        });
        //产品点击热区第一次点击 开始倒计时
        $(".game4 .hotSpace").on("click", function () {
            $(".bigNum").fadeIn(300, function () {
                stoAni.play();
                setTimeout(function () {
                    $(".bigNum").fadeOut(500, function () {
                        stoAni.pause(0);
                        $(".bigNum div").css("display", "block");
                    });
                    $(".game4 .clickTip").fadeOut(500);
                    $(".game4 .backChoose").fadeOut(500);
                    $(".game4 .ksClick").addClass("ksClickAni").fadeIn(500);
                    $(".game4 .hotSpace").unbind();
                    gameClick();
                }, 3000);
            });
        });
        $(".game4 .backChoose").on("click", function () {
            $(".game4 .hotSpace").fadeOut(500);
            $(".game4 .g1cpBox").fadeIn(500);
            $(".game4 .backChoose").fadeOut(500);
        });

        function gameClick() {
            timeAni.play();
            hsrenAni.clean();
            inityanAni.clean();
            $(".game4 .inityanBox").fadeOut(500);
            $(".game4 .hsrenBox").fadeOut(500);
            var dom1, dom2;
            if (_this.cpnum == 0) {
                g4ch1.play();
                $(".game4 .g4ch1Box").fadeIn(500);
                $(".game4 .ch1").fadeIn(0);
                $(".game4 .ch1 .chs1").css("display", "block");
                $(".game4 .ch1 .chs2").css("display", "none");
                dom1 = $(".game4 .ch1 .chs1");
                dom2 = $(".game4 .ch1 .chs2");
            } else if (_this.cpnum == 1) {
                g4ch2.play();
                $(".game4 .g4ch2Box").fadeIn(500);

                $(".game4 .ch2").fadeIn(0);
                $(".game4 .ch2 .chs1").css("display", "block");
                $(".game4 .ch2 .chs2").css("display", "none");
                dom1 = $(".game4 .ch2 .chs1");
                dom2 = $(".game4 .ch2 .chs2");
            } else {
                g4ch3.play();
                $(".game4 .g4ch3Box").fadeIn(500);
                $(".game4 .ch3").fadeIn(0);
                $(".game4 .ch3 .chs1").css("display", "block");
                $(".game4 .ch3 .chs2").css("display", "none");
                dom1 = $(".game4 .ch3 .chs1");
                dom2 = $(".game4 .ch3 .chs2");
            }

            $(".game4 .hotSpace").on("touchstart", function () {
                _this.finalnum++;
                if (_this.finalnum <= _this.maxnum) {
                    $(".wdj_linef").width(503 / _this.maxnum * _this.finalnum + "px");
                } else {
                    countDomn.reset();
                    timever();
                }
                dom1.css("display", "block");
                dom2.css("display", "none");
            });
            $(".game4 .hotSpace").on("touchend", function () {
                dom1.css("display", "none");
                dom2.css("display", "block");
            });
            countDomn.play(5, function () {
                timever();
            });
        }

        function timever() {
            $(".game4 .hotSpace").unbind();

            timeAni.pause(0);
            $(".time_font").html("5s");
            $(".game4 .ksClick").removeClass("ksClickAni");
            console.log("总共点击了：" + _this.finalnum + "次");
            if (_this.finalnum >= 30) {
                console.log("挑战成功进入下一关");
                musicok.play();

                $(".game4 .successPage").fadeIn(500);
                $(".game4 .guo1").css("display", "block");
                $(".game4 .guo2").css("display", "none");
                $(".game4 .guo1 .gss").addClass("gssani");
                $(".game4 .ch1,.game4 .ch2,.game4 .ch3,.game4 .ch1 div,.game4 .ch2 div,.game4 .ch3 div").css("display", "none");
                $(".game4 .g4ch1Box,.game4 .g4ch2Box,.game4 .g4ch3Box").fadeOut(500);
                g4ch1.clean();
                g4ch2.clean();
                g4ch3.clean();
                setTimeout(function () {
                    $(".timeover,.timeover .success").fadeIn(500);
                }, 2000);

                $(".timeover .toBtn").unbind().on("click", function () {
                    game5.initAni();
                    $(".timeover").fadeOut(500);
                });
            } else {
                console.log("挑战失败，自由选择干嘛");
                musicfa.play();

                $(".timeover,.timeover .fail").fadeIn(500, function () {
                    $(".timeover .lbtn").unbind().on("click", function () {
                        _this.reset();
                        _this.freed();
                    });
                    $(".timeover .rbtn").unbind().on("click", function () {
                        window.location.replace("https://pro.m.jd.com/mall/active/35BDrAN8cNQnDq9pt5KwkfeyMDEv/index.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ad_od=share&from=groupmessage&isappinstalled=0&scene=1&clicktime=1577356099&enterid=1577356099");
                    });
                });
            }
        }
    };
    gameFn4.prototype.reset = function () {
        var _this = this;
        $(".timeover,.timeover .fail,.timeover .success").fadeOut(500);
        $(".game4 .ksClick,.game4 .hotSpace,.game4 .backChoose").fadeOut(500);
        $(".game4 .successPage").fadeOut(0);
        $(".game4 .clickTip").fadeIn(500);
        game4color.stop();
        $(".game4 .wdj_linef").width("0px");
        $(".game4 .ch1,.game4 .ch2,.game4 .ch3,.game4 .ch1 div,.game4 .ch2 div,.game4 .ch3 div").css("display", "none");
        $(".game4 .g4ch1Box,.game4 .g4ch2Box,.game4 .g4ch3Box").fadeOut(0);
        g4ch1.clean();
        g4ch2.clean();
        g4ch3.clean();
        _this.finalnum = 0;
        $(".game4 .successPage").fadeOut(50);
        $(".game4 .guo1").css("display", "none");
        $(".game4 .guo2").css("display", "block");
        $(".game4 .guo1 .gss").removeClass("gssani");
    };

    function gameFn5(maxnum) {
        this.finalnum = 0;
        this.cpnum;
        this.maxnum = maxnum;
    }
    gameFn5.prototype.initAni = function () {
        if (!isloadxl5) {
            loadxulioter(g5mina);
            isloadxl5 = true;
        }
        var _this = this;
        _this.reset();

        // TweenMax.to($(".game1"), .5, {

        TweenMax.to($(".game4"), .5, {
            y: -1600,
            ease: Back.easeIn.config(1.05),
            onComplete: function onComplete() {
                game4.reset();
                TweenMax.set($(".game5"), { y: 0 });
                TweenMax.from($(".game5"), 1, {
                    y: -1600,
                    autoAlpha: 0,
                    ease: Elastic.easeInOut.config(1, 1),
                    onComplete: function onComplete() {
                        _this.freed();
                        $(".game4").css("display", "none");
                        $(".timeover .fail").css("background", "url('images/fail/f5.png')no-repeat");
                        $(".timeover .success").css("background", "url('images/success/s5.png')no-repeat");
                    }
                });
                $(".game5").css("display", "block");
            }
        });
    };
    gameFn5.prototype.freed = function () {
        var _this = this;
        // 首页到游戏1的过渡
        g5initren.play();
        $(".g5initrenBox").fadeIn(500);

        game5color.play();
        //产品列举点击操作
        $(".game5 .gcp").unbind().on("click", function () {
            _this.cpnum = $(this).index();
            $(".game5 .hotSpace .uc").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game5 .hotSpace .un").eq(_this.cpnum).css("display", "block").siblings().css("display", "none");
            $(".game5 .hotSpace").fadeIn(500);
            $(".game5 .g1cpBox").fadeOut(500);
            $(".game5 .backChoose").fadeIn(500);
            $(".game5 .tipHand").fadeOut();
            game5color.stop();
        });
        //产品点击热区第一次点击 开始倒计时
        $(".game5 .hotSpace").on("click", function () {
            $(".bigNum").fadeIn(300, function () {
                stoAni.play();
                setTimeout(function () {
                    $(".bigNum").fadeOut(500, function () {
                        stoAni.pause(0);
                        $(".bigNum div").css("display", "block");
                    });
                    $(".game5 .clickTip").fadeOut(500);
                    $(".game5 .backChoose").fadeOut(500);
                    $(".game5 .ksClick").addClass("ksClickAni").fadeIn(500);
                    $(".game5 .hotSpace").unbind();
                    gameClick();
                }, 3000);
            });
        });
        $(".game5 .backChoose").on("click", function () {
            $(".game5 .hotSpace").fadeOut(500);
            $(".game5 .g1cpBox").fadeIn(500);
            $(".game5 .backChoose").fadeOut(500);
        });

        function gameClick() {
            timeAni.play();
            g5initren.clean();
            $(".g5initrenBox").fadeOut(500);
            var dom1, dom2;
            if (_this.cpnum == 0) {
                // g4ch1.play();
                // $(".game5 .g4ch1Box").fadeIn(500);
                $(".game5 .ch1").fadeIn(0);
                $(".game5 .ch1 .chs1").css("display", "block");
                $(".game5 .ch1 .chs2").css("display", "none");
                dom1 = $(".game5 .ch1 .chs1");
                dom2 = $(".game5 .ch1 .chs2");
            } else if (_this.cpnum == 1) {
                g5ch2.play();
                $(".game5 .g5ch2Box").fadeIn(500);

                $(".game5 .ch2").fadeIn(0);
                $(".game5 .ch2 .chs1").css("display", "block");
                $(".game5 .ch2 .chs2").css("display", "none");
                dom1 = $(".game5 .ch2 .chs1");
                dom2 = $(".game5 .ch2 .chs2");
            } else {
                g5ch3.play();
                $(".game5 .g5ch3Box").fadeIn(500);
                $(".game5 .ch3").fadeIn(0);
                $(".game5 .ch3 .chs1").css("display", "block");
                $(".game5 .ch3 .chs2").css("display", "none");
                dom1 = $(".game5 .ch3 .chs1");
                dom2 = $(".game5 .ch3 .chs2");
            }

            $(".game5 .hotSpace").on("touchstart", function () {
                _this.finalnum++;
                if (_this.finalnum <= _this.maxnum) {
                    $(".wdj_linef").width(503 / _this.maxnum * _this.finalnum + "px");
                } else {
                    countDomn.reset();
                    timever();
                }
                dom1.css("display", "block");
                dom2.css("display", "none");
            });
            $(".game5 .hotSpace").on("touchend", function () {
                dom1.css("display", "none");
                dom2.css("display", "block");
            });
            countDomn.play(5, function () {
                timever();
            });
        }

        function timever() {
            $(".game5 .hotSpace").unbind();

            timeAni.pause(0);
            $(".time_font").html("5s");
            $(".game5 .ksClick").removeClass("ksClickAni");
            console.log("总共点击了：" + _this.finalnum + "次");
            if (_this.finalnum >= 30) {
                console.log("挑战成功进入下一关");
                musicok.play();

                g5ok.play();
                $(".g5ok").fadeIn(500);
                $(".game5 .ch1,.game5 .ch2,.game5 .ch3,.game5 .ch1 div,.game5 .ch2 div,.game5 .ch3 div").css("display", "none");
                $(".game5 .g5ch2Box,.game5 .g5ch3Box").fadeOut(500);
                g4ch2.clean();
                g4ch3.clean();
                setTimeout(function () {
                    $(".timeover,.timeover .success").fadeIn(500);
                }, 2000);
                $(".timeover .toBtn").unbind().on("click", function () {
                    $(".timeover").fadeOut(500);

                    TweenMax.to($(".gamePage"), .5, {
                        y: -1600,
                        ease: Back.easeIn.config(1.05),
                        onComplete: function onComplete() {
                            TweenMax.set($(".finalPage"), { y: 0 });
                            TweenMax.from($(".finalPage"), 1, {
                                y: -1600,
                                autoAlpha: 0,
                                ease: Elastic.easeInOut.config(1, 1),
                                onComplete: function onComplete() {
                                    $(".gamePage").css("display", "none");
                                    game5.reset();
                                    $(".game5").css("display", "none");
                                }
                            });
                            $(".finalPage").css("display", "block");
                            gwqswiperinit();
                        }
                    });
                });
            } else {
                console.log("挑战失败，自由选择干嘛");
                musicfa.play();

                $(".timeover,.timeover .fail").fadeIn(500, function () {
                    $(".timeover .lbtn").unbind().on("click", function () {
                        _this.reset();
                        _this.freed();
                    });
                    $(".timeover .rbtn").unbind().on("click", function () {
                        window.location.replace("https://pro.m.jd.com/mall/active/35BDrAN8cNQnDq9pt5KwkfeyMDEv/index.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ad_od=share&from=groupmessage&isappinstalled=0&scene=1&clicktime=1577356099&enterid=1577356099");
                    });
                });
            }
        }
    };
    gameFn5.prototype.reset = function () {
        var _this = this;
        $(".timeover,.timeover .fail,.timeover .success").fadeOut(500);
        $(".game5 .ksClick,.game5 .hotSpace,.game5 .backChoose").fadeOut(500);
        $(".game5 .successPage").fadeOut(0);
        $(".game5 .clickTip").fadeIn(500);
        game4color.stop();
        $(".game5 .wdj_linef").width("0px");
        $(".game5 .ch1,.game5 .ch2,.game5 .ch3,.game5 .ch1 div,.game5 .ch2 div,.game5 .ch3 div").css("display", "none");
        $(".game5 .g5ch2Box,.game5 .g5ch3Box").fadeOut(0);
        g5ch2.clean();
        g5ch3.clean();
        g5ok.clean();
        $(".g5ok").fadeOut(500);
        _this.finalnum = 0;
    };

    var gwqname = '测试';
    $.ajax({
        url: 'https://jdchongqing.ronghuiad.com/index.php/api/getUserInfo',
        dataType: 'json',
        type: 'get',
        success: function success(res) {
            if (res.state == 200) {
                console.log("获取到的名字为:" + res.data.nickname);
                gwqname = gwqzjcdqj(res.data.nickname, 23);
            } else {
                // window.location.replace("https://jdchongqing.ronghuiad.com");
            }
        },
        error: function error(err) {
            console.log("请求失败");
        }
    });
    //超出指定字节个数截取拼接...
    function gwqzjcdqj(str, len) {
        var str_length = 0;
        var str_len = 0;
        var str_cut = new String();
        var str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            var a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str;
        }
    };
    //判断字符串字节长度
    var gwqzjcd = function gwqzjcd(str) {
        var cnReg = new RegExp("[\\u4e00-\\u9fa5]");
        var count = 0;
        for (var i = 0; i < str.length; i++) {
            if (cnReg.test(str[i])) {
                count = count + 2;
            } else {
                count = count + 1;
            }
        }
        return count;
    };

    //字体加载
    var gwqzt = function gwqzt(name, url, fun) {
        var gwqmyFont = new FontFace(name, 'url(' + url + ')');
        gwqmyFont.load().then(function (font) {
            document.fonts.add(font);
        }).then(function () {
            if (fun) {
                fun();
            } else {
                console.log("gwqzt:请给我一个回调");
            }
        });
    };
    var gwqindex = 1;
    var gwqswiper;

    function gwqswiperinit() {
        $('.gwqbox').fadeIn(0);
        $('.gwqbox2').fadeOut(0);
        gwqswiper = new Swiper('.swiper-container', {
            direction: 'horizontal', //垂直切换选项
            loop: true, //循环模式选项
            observer: true,
            observerParents: true,
            //导航按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            on: {
                slideChange: function slideChange() {
                    if (this.activeIndex == 1) {
                        gwqindex = 1;
                    } else if (this.activeIndex == 2) {
                        gwqindex = 2;
                    } else if (this.activeIndex == 3) {
                        gwqindex = 3;
                    } else if (this.activeIndex == 4) {
                        gwqindex = 4;
                    } else if (this.activeIndex == 5) {
                        gwqindex = 5;
                    } else if (this.activeIndex == 6) {
                        gwqindex = 1;
                    } else if (this.activeIndex == 0) {
                        gwqindex = 5;
                    }
                }
            }
        });
    }
    cqbtnAniFn();
    var cqbtnAni;

    function cqbtnAniFn() {
        var iscqbtn = true;
        cqbtnAni = setInterval(function () {
            if (iscqbtn) {
                $(".gwqcqbtn1").css("display", "block");
                $(".gwqtopbtn2").css("display", "block");

                iscqbtn = false;
            } else {
                $(".gwqcqbtn1").css("display", "none");
                $(".gwqtopbtn2").css("display", "none");

                iscqbtn = true;
            }
        }, 500);
    }
    $('.gwqbtnsc').click(function () {
        var avatar = 'images/banner/banner' + gwqindex + '.jpg';
        //alert("图片已被保存");
        // 调用微信接口以及绘制图片
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        gwqzt('FZYTK', 'src/FZYTK.TTF', function () {
            console.log("字体加载完毕");
            //创建img元素
            var himg = new Image();
            //保证img元素绘制完成
            himg.src = avatar;
            himg.onload = function () {
                console.log('图片加载完');
                ctx.drawImage(himg, 0, 0, 750, 1560);
                // 设置字体
                ctx.font = "bold 36px FZYTK";
                // 设置颜色
                ctx.fillStyle = "#000";
                // 设置水平对齐方式
                ctx.textAlign = "center";
                // 设置垂直对齐方式
                ctx.textBaseline = "middle";
                // 绘制文字（参数：要写的字，x坐标，y坐标）
                ctx.fillText(gwqname, 366, 940);
                ctx.fillStyle = "#ffffcc";
                ctx.fillText(gwqname, 370, 938);
                var simg = new Image();
                var _imgSrc = canvas.toDataURL("image/png", 1);
                simg.src = _imgSrc;
                simg.onload = function () {
                    console.log('图片显示');
                    $('#gwqct').attr('src', _imgSrc);
                    cqbtnAniFn();
                    $('.gwqbox').fadeOut(500);
                    $('.gwqbox2').fadeIn(500);
                };
            };
        });
        $('.gwqtext').css('background', 'url(images/share_it/text' + gwqindex + '.png)center center no-repeat');
        if (gwqindex == 3 || gwqindex == 4) {
            $('.gwqfxbanner').css('background', 'url(images/end/end' + gwqindex + 'f.jpg)center center no-repeat');
        } else {
            $('.gwqfxbanner').css('background', 'url(images/end/end' + gwqindex + '.jpg)center center no-repeat');
        }
    });
    $('.gwqmb').click(function () {
        $('.gwqmb').fadeOut(300);
    });
    $('.gwqfxbtn').click(function () {
        $('.gwqmb').fadeIn(300);
    });

    $('.gwqzwbtn,.gwqbtncx').click(function () {
        console.log("在玩一次");
        gwqswiper.detachEvents();

        TweenMax.to($(".finalPage"), .5, {
            y: -1600,
            ease: Back.easeIn.config(1.05),
            onComplete: function onComplete() {
                TweenMax.to($(".p1Page"), 1, {
                    y: 0,
                    ease: Elastic.easeInOut.config(1, 1),
                    onComplete: function onComplete() {
                        $(".finalPage").css("display", "none");
                    }
                });
                $(".p1Page").css("display", "block");
            }
        });
    });
    $('.gwqcqbtn').click(function () {
        window.location.replace("https://pro.m.jd.com/mall/active/35BDrAN8cNQnDq9pt5KwkfeyMDEv/index.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ad_od=share&from=groupmessage&isappinstalled=0&scene=1&clicktime=1577356099&enterid=1577356099");
    });
}(window, $);