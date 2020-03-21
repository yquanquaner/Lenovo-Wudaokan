var LSloadimg = function(ob) {
    typeof ob === 'object' ? console.log("参数正确") : console.log("参数错误");
    this.imgArr = ob.imgArr;
    this.concurrent = ob.concurrent ? ob.concurrent : 1;
    this.onComplete = ob.onComplete;
    this.onProgress = ob.onProgress;
    this.aSync = ob.aSync;
    this.imgtype = ['png', 'jpg', 'gif', 'jpeg'];
    // this.play();
}
LSloadimg.prototype.play = function() {
    var _this = this;
    _this.aSync ? _this._aSync() : _this._Sync();
    console.time('图片资源加载完成,总耗时');
}

LSloadimg.prototype._Sync = function() {
    console.log("线性加载");
    var _this = this;
    var proindex = 0;
    var filetype;
    var allImageindex = _this.imgArr.length;
    var tempImgSrc;

    fn();

    function fn() {
        // var _img = document.createElement('img');
        // _img.setAttribute("src", _this.imgArr[proindex].src);

        var _proimg = new Image();
        //onload优先挂载
        _proimg.onload = function() {
            // console.log(_proimg.complete)
            proindex++;
            _this.onProgress((proindex / allImageindex).toFixed(2));
            if (proindex < _this.imgArr.length) {
                fn()
            } else {
                _this.onComplete();
            }
        }
        _proimg.onerror = function() {
            console.log("异常");
        }

        tempImgSrc = _this.imgArr[proindex]
        if (typeof tempImgSrc === 'object') {
            tempImgSrc = tempImgSrc.src;
        } else {
            tempImgSrc = tempImgSrc;
        }
        filetype = tempImgSrc.substr(tempImgSrc.lastIndexOf(".") + 1)
        if (_this.imgtype.indexOf(filetype) > -1) {
            _proimg.src = tempImgSrc;
        } else {
            console.error("文件错误：" + tempImgSrc)
            proindex++;
            if (proindex < _this.imgArr.length) {
                fn()
            } else {
                _this.onComplete();
            }
        }
    }
}
LSloadimg.prototype._aSync = function() {
    console.log("并发加载");
    var _this = this;
    var i = 0;
    var allImageindex = _this.imgArr.length;
    var promiseAll = _this.imgArr.map(function(item, index) {
        console.log(index)
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                img.onload = null;
                resolve(img);
                i++;
                _this.onProgress((i / allImageindex).toFixed(2));
                // $(".loadpreFont").html(i);
            };
            img.error = function() {
                reject('图片加载失败');
            };
            img.src = item;
        });
    });
    Promise.all(promiseAll).then(
        function() {
            _this.onComplete()
        },
        function(err) {
            console.log(err);
        }
    );

}