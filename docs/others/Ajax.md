# Ajax了解

## 介绍

用于与服务器交换数据，而不刷新整个页面

在`ajax`出现以前，页面发送请求，服务端查数据后绑定到页面，页面由服务端渲染后返回前台，前台刷新页面，获取返回结果。

现在则是服务端返回数据，由前端负责数据绑定，页面仅有局部改变，所以页面无需刷新。

## 使用

```javascript
// 创建ajax实例对象
let xhr = new XMLHttpRequest();

// 通过XMLHttpRequest原型上的open方法打开一个路径
// 参数1：http方法；参数2：url；参数3：异步，true表示异步，false表示同步
xhr.open('get', 'aside.json', true);

// 监听ajax实例的onreadystatechange事件，当ajax发送请求时，会触发这个事件行为
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
    	console.log(xhr.responseText);
    }
};

// 发送请求
xhr.send(JSON.stringify({username: 'mabin', pwd: '1233456'}));
```

## 响应

每当 `readyState` 改变时，就会触发 `onreadystatechange` 事件。

```
readyState 存有 `XMLHttpRequest` 的状态。从 0 到 4 发生变化。

- 0: 请求未初始化
- 1: 服务器连接已建立
- 2: 请求已接收
- 3: 请求处理中
- 4: 请求已完成，且响应已就绪

onreadystatechange 事件被触发 4 次（0 - 4）, 分别是： 0-1、1-2、2-3、3-4，对应着 readyState 的每个变化。
```

```
status

200: "OK"
404: 未找到页面
```

## 其他

设置请求头

```javascript
setRequestHeader(header,value)
```

比如

```javascript
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
```

```javascript
xhr.responseText // 获取响应文本，字符串格式
xhr.responseXML // 获取响应文本，估计用不到
```

