### 文档说明

#### API

|      参数       |             说明             |   类型   | 是否必填 |                            默认值                            |
| :-------------: | :--------------------------: | :------: | :------: | :----------------------------------------------------------: |
|    editorKey    |     编辑器唯一id<br />同一页面有多个编辑器时建议自定义该值      |  String  |    否    |                              -                               |
| value(v-model)  |             内容             |  String  |    否    |                              -                               |
|   placeholder   |           内容提示           |  String  |    否    |                              -                               |
|    disabled     |             禁用             | Boolean  |    否    |                                                              |
|     height      |          编辑器高度          |  Number  |    否    |                             400                              |
|     zIndex      |          编辑器层级          |  Number  |    否    |                            10000                             |
|      menus      |    菜单 - 顺序为显示顺序     |  Array   |    否    |                      详见下方menus说明                       |
|     colors      | 配置颜色（文字颜色、背景色） |  Array   |    否    |                                                              |
| uploadImgConfig |         图片上传配置         |  Object  |    否    |                 详见下方uploadImgConfig说明                  |
| customUploadImg |        自定义图片上传        | Function |    否    | Function(resultFiles, insertImgFn)<br />resultFiles 是 input 中选中的文件列表insertImgFn 是获取图片 url 后，插入到编辑器的方法 |

#### 事件

| 事件名称 |         说明         |        回调参数         |
| :------: | :------------------: | :---------------------: |
|  focus   |   获取焦点时的回调   | Function(value: string) |
|   blur   |   失去焦点时的回调   | Function(value: string) |
|  change  | 内容发生改变时的回调 | Function(value: string) |

#### customUploadImg

```javascript
customUploadImg = function (resultFiles, insertImgFn) {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法

    // 上传图片，返回结果，将图片插入到编辑器中
    insertImgFn(imgUrl)
}
```

#### uploadImgConfig

|          参数          |          说明           |  类型   | 是否必填 |                 默认值                 |
| :--------------------: | :---------------------: | :-----: | :------: | :------------------------------------: |
|         action         |      图片上传地址       | String  |    是    |                   -                    |
|    uploadImgAccept     |    上传文件类型限制     |  Array  |    否    |  ['jpg', 'jpeg', 'png', 'gif', 'bmp']  |
|    uploadImgMaxSize    |         Number          | Number  |    否    |            2 * 1024 * 1024             |
|   uploadImgMaxLength   |      最大上传数量       | Number  |    否    |                   5                    |
|    uploadImgParams     |     自定义上传参数      | Object  |    否    |         例：{ token: 'xxxx' }          |
| uploadImgParamsWithUrl | 是否将参数拼接到 url 中 | Boolean |    否    |                 false                  |
|     uploadFileName     |     自定义 filename     | String  |    否    |                   -                    |
|    uploadImgHeaders    |      自定义 header      | Object  |    否    | 例：{ Accept: 'text/x-json', a: 100, } |
|    withCredentials     |     跨域传递 cookie     | Boolean |    否    |                 false                  |
|    uploadImgTimeout    |      上传超时事件       | Number  |    否    |               10 * 1000                |
|     uploadImgHooks     |        回调函数         | Object  |    否    |             见下方想起说明             |

#### uploadImgHooks

```javascript
uploadImgHooks = {
    // 上传图片之前
    before: function(xhr) {
        console.log(xhr)

        // 可阻止图片上传
        return {
            prevent: true,
            msg: '需要提示给用户的错误信息'
        }
    },
    // 图片上传并返回了结果，图片插入已成功
    success: function(xhr) {
        console.log('success', xhr)
    },
    // 图片上传并返回了结果，但图片插入时出错了
    fail: function(xhr, editor, resData) {
        console.log('fail', resData)
    },
    // 上传图片出错，一般为 http 请求的错误
    error: function(xhr, editor, resData) {
        console.log('error', xhr, resData)
    },
    // 上传图片超时
    timeout: function(xhr) {
        console.log('timeout')
    },
    // 图片上传并返回了结果，想要自己把图片插入到编辑器中
    // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
    customInsert: function(insertImgFn, result) {
        // result 即服务端返回的接口
        console.log('customInsert', result)

        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        insertImgFn(result.data[0])
    }
}
```


更多配置参考:  https://www.wangeditor.com/doc/
