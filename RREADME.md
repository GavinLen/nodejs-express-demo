# 1. 常用中间件
- **body-parser**   
用于处理 JSON, Raw, Text 和 URL 编码的数据。
- **cookie-parser**   
解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
- **multer**
用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
- **debug**   
小的调试工具，打印的是开发者自己在 控制台 打印的信息。
- **jade**   
一个高性能的模板引擎，它深受 Haml 影响，它是用 JavaScript 实现的，并且可以供 Node 使用。
- **morgan**   
打印的nodejs 服务器接受到的请求的信息。
- **serve-favicon**   
favicon服务中间件和缓存。
- **generic-pool**   
线程池。
- **body-parser**   
Express 依赖 body-parser 对请求的包体进行解析。
> 默认支持的类型包括：application/json, application/x-www-form-urlencoded, multipart/form-data，对xml没有支持。
- **connect-multiparty**
处理含有文件上传时的 from 表单，返回的时文件的临时目录，只需要完成上传文件的移动即可。   
该中间件的上传错误处理不是很方便。
> 如果不含有上传操作的 from 表单，默认的 enctype="application/x-www-form-urlencoded".
> 如果含有上传操作的 from 表单，需要设置 enctype="multipart/form-data".
- **multiparty**
处理含有文件上传时的 from 表单。

# 2. Express 文件结构
```
- bin
    -www
- libs
- node_modules
- public
- routes
- views
- app.js
- package.json
- package-lock.json

```
**bin**：存放启动项目的脚本文件，默认 www。   
**node_modules**：存放所有的项目依赖库。   
**public**：静态资源文件夹，默认images、javascripts、stylesheets。   
**routes**：路由文件相当于MVC中的Controller，默认index.js、users.js。   
**views**：页面文件，相当于MVC中的view，Ejs模板或者jade模板，默认error.jade、index.jade、layout.jade。   
**package.json**：项目依赖配置及开发者信息。   
**app.js**：应用核心配置文件，项目入口，程序从这里开始。相当于php项目中的 index.php、index.html。   
# 3. Express简介
Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。   
使用 Express 可以快速地搭建一个完整功能的网站，它有一套健壮的特性，可用于开发单页、多页和混合Web应用。
# 4. JavaScript 模块化编程
JavaScript 为了实现代码的模块化管理，需要将功能类似的功能写在一个 JS 文件中。

# 5. Express 接收参数
## 5.1 接收 GET 方式提交的参数
> GET 传递的参数是拼接在 URL 中.

Express 接收代码：
```javascript
router.get('/getTest', function (req, res, next) {
    var data = req.query;
    res.send(data);
});
```
## 5.2 接收 POST 方式提交参数
> POST 方式提交的参数是包含在 body 中,而且 Content-Type 包含有 4 中，接收的方式各不相同.

- 接收一般 from 数据
> 一般 from 数据时，enctype="www-form-urlencoded".   
Express 默认将 POST 的请求是按照此格式解析。

Express 接收代码：
```javascript
router.post('/test', function (req, res, next) {
    var data = req.body;
    res.send(data);
});
```
- 接收上传 from 数据
> 具有上传功能的 from 数据时， enctype="multipart/form-data".

Express 接收代码：
```javascript
// 引入模块
var multiparty = require('connect-multiparty');
var multipartMiddleware = multiparty();

// 处理数据
router.post('/upload', multipartMiddleware, function (req, res, next) {
    var data = req.body;
    var tempFilePath = req.files;
    res.send({
        data: data,
        tempFilePath: tempFilePath
    });
});
```
- 接收 JSON 数据   
一般的 post 处理时可以解析 JSON 数据的，如果不能解析，需要添加 `body-parser` 组件。   
Express 接收代码：
```javascript
router.post('/test', function (req, res, next) {
    var data = req.body;
    res.send(data);
});
```
使用 `body-parser` 组件
Express 接收代码：
```javascript
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/test', function (req, res, next) {
    var data = req.body;
    res.send(data);
});
```
- 接收 text/xml 数据
> 微信公众平台采用的数据传输格式就时 text/xml.

Express 接收代码：
```javascript
var parseString = require('xml2js').parseString;
var rawBody = '';
    var dataJson = {};
    req.on('data', function (chunk) {
        rawBody += chunk;
    });
    req.on('end', function () {
        parseString(rawBody, function (error, data) {
            result = {
                dada: data
            };
            res.send(result)
        })
    });
```
# 6. 具体功能
- 文件上传
```url
http://www.cnblogs.com/kongxianghai/archive/2015/02/15/4293139.html
```