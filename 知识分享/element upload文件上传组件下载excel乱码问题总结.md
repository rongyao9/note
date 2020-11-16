## element upload文件上传组件下载excel乱码问题总结

大部分excel下载乱码的原因是没有设置responseType。而element的默认上传行为是不能设置responseType的。所以这里展示如何自定义实现设置responseType以解决乱码问题。

#### 解决
<pre>
 1.http-request自定义一个uploading方法请求；

2.比如用axios处理请求，设置responseType:‘blob’，文件信息在uploading(data)中；

3.将返回的数据生成一个Blob对象（后端返回的data中可能没有code，只是文件流，如有全局response拦截器注意检查报错），创建a节点并revokeObjectURL释放，下载文件；

4.最后一步，回调组件的onSuccess/onError方法，标记文件成功/失败状态。（如果不回调文件永远是添加后的状态，再次添加文件会将旧的文件再传一次，调用方法为调用data的on-success）
</pre>

#### 上代码

>template部分

```
<el-upload
  class="upload-demo"
  drag
  :on-success='onSuccess'
  :on-error='onError'
  :http-request='uploading'
  action="url"
  :auto-upload='false'
  multiple>
</el-upload>
```

>js部分
```
methods:{
	onSuccess(){
},
	onError(){
},
uploading(data){
	let file = data.file
	let params = new FormData()
	params.append('file',file)
	this.$axios({
		methods:'put',
		url:'xxxxxxx',
		data:params,
		responseType:'blob'
	})
	.then(response=>{
		const blob = new Blob([response]);
  		const a = document.createElement("a");
 		 const url = window.URL.createObjectURL(blob);
 		 const filename = fileName;
  		a.href = url;
  		a.download = filename;
  		a.click();
 		 window.URL.revokeObjectURL(url);
})
	.catch(error=>{
	console.log(error)
})
}
}
```