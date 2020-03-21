;
(function(window) {
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame

    function loadImages(manifest, onProgress, onComplete) {
        var total = manifest.length
        var loaded = 0
        var loadedImages = []

        function onload(img, index) {
            loaded++
            loadedImages[index] = img
            onProgress && onProgress(loaded / total)
            if (loaded >= total) {
                onComplete && onComplete(loadedImages)
                loadedImages = null
            }
        }
        manifest.forEach(function(item, index) {
            var img = new Image()
            img.onload = function() {
                onload(this, index)
            }
            img.src = item
            if (img.complete) {
                img.onload = null
                onload(img, index)
            }
        })
    }

    function log() {
        console.log.apply(console, arguments)
    }

    var ImageMask = function ImageMask(config) {
        this._config // 配置 Object
        this._canvas // 目标canvas
        this._ctx // context
        this._canvas2
        this._ctx2
        this._imageSrc // 图片地址 String
        this._maskSrc // 蒙版地址 String
        this._duration // 动画时长 Number

        this._image // 图片 Image
        this._mask // 蒙版 Image
        this._cw
        this._ch
        this._idImage // 图片 ImageData
        this._idMask // 蒙版 ImageData
        this._idResult // 结果 ImageData
        this._loaded = false // 是否加载完
        this._playing = false // 是否正在播放
        this._startTime

        this.load = this.load.bind(this)
        this.play = this.play.bind(this)
        this.loop = this.loop.bind(this)
        this.stop = this.stop.bind(this)
        this.destroy = this.destroy.bind(this)

        this.init(config)
    }
    var p = ImageMask.prototype = {
        constructor: ImageMask,
        init: function(config) {
            log('ImageData init')
            this._config = config
            this._canvas = document.querySelector(config.canvas)
            this._ctx = this._canvas.getContext('2d')
            this._canvas2 = document.createElement('canvas')
            this._ctx2 = this._canvas2.getContext('2d')
            this._duration = config.duration || 5000
            var imageSrc = this._imageSrc = config.image
            var maskSrc = this._maskSrc = config.mask
            loadImages([imageSrc, maskSrc], null, this.load)
        },
        load: function(images) {
            log('ImageData load')
            if (this._loaded) {
                return
            }
            this._loaded = true

            var image = this._image = images[0]
            var mask = this._mask = images[1]
            var cw = this._cw = image.width
            var ch = this._ch = image.height
            var canvas = this._canvas
            var canvas2 = this._canvas2
            var ctx2 = this._ctx2
            var id
            canvas.width = canvas2.width = cw
            canvas.height = canvas2.height = ch

            ctx2.clearRect(0, 0, cw, ch)
            ctx2.drawImage(image, 0, 0)
            this._idImage = ctx2.getImageData(0, 0, cw, ch)
            ctx2.clearRect(0, 0, cw, ch)
            ctx2.drawImage(mask, 0, 0)
            this._idMask = ctx2.getImageData(0, 0, cw, ch)
            ctx2.clearRect(0, 0, cw, ch)
        },
        play: function() {
            console.log("play")
            if (!this._loaded || this._playing) {
                return
            }
            this._startTime = Date.now()
            this._playing = true
            this._idResult = new ImageData(this._cw, this._ch)
            this.loop()
        },
        loop: function() {
            if (!this._playing) {
                return
            }

            var progress = Math.min(1, (Date.now() - this._startTime) / this._duration)
            var threshold = 0xFFFFFF * progress

            var idResult = this._idResult
            var dResult = idResult.data
            var idImage = this._idImage
            var idMask = this._idMask
            var dImage = idImage.data
            var dMask = idMask.data

            var i, len, v
            for (i = 0, len = dResult.length; i < len; i += 4) {
                if (dImage[i + 3] === 0 || dResult[i] === dImage[i]) {
                    continue
                }
                v = dMask[i] << 16 | dMask[i + 1] << 8 | dMask[i + 2]
                if (v <= threshold) {
                    dResult[i] = dImage[i]
                    dResult[i + 1] = dImage[i + 1]
                    dResult[i + 2] = dImage[i + 2]
                    dResult[i + 3] = dImage[i + 3]
                }
            }
            this._ctx.putImageData(idResult, 0, 0)

            if (progress >= 1) {
                log('ImageData play end')
                this._playing = false
            } else {
                requestAnimationFrame(this.loop)
            }
        },
        stop: function() {
            console.log("stop")
            this._playing = false
        },
        destroy: function() {

        },
        clean:function(){
            this._ctx.clearRect(0, 0, this._cw, this._ch)
        }

    }

    window.ImageMask = ImageMask
})(window)