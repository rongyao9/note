 # 在线url转化为base64或者file对象
 实现思路：先转化为base64，再转换为file对象，用到canvas的toDataURL

  <pre>
    urlToBase64 (src) {
      // 获取图片的type
      let _this = this 
      let type = src.slice(src.lastIndexOf('.') + 1, src.length)
      var canvas = document.createElement('canvas');
      var img = document.createElement('img');
      // 设置可以跨域
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          var context = canvas.getContext('2d');
          context.drawImage(img, 0, 0, img.width, img.height);
          let base64 = canvas.toDataURL('image/' + type)
          let file =  _this.dataURLtoFile(base64,'一个图片')
          this.baseData = base64
        
          //输出base64
          // return base64
          //输出file对象
         return file
      }
      img.src = src
      },
</pre>
base64 => file

    dataURLtoFile (dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      let file = new File([u8arr], filename, {type:mime});
      return file 
    }