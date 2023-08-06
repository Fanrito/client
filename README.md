# 厦小鱼校园二手交易平台

## 前端

### 基本信息

框架：Vue3

组件库：NavieUI（强推！小众、美观而且好用）

### 环境

node.js v16.19.0

npm v8.19.3

包管理工具：npm



### 快速启动

```js
npm install

npm run dev
```



### 项目结构


```
client
├─ .git
├─ .gitignore
├─ index.html	
├─ package-lock.json
├─ package.json	// 包管理器
├─ README.md	// 文档
├─ src
│  ├─ App.vue
│  ├─ assets	// 全局基础设置
│  │  ├─ base.css
│  │  ├─ favicon.ico
│  │  └─ main.css
│  ├─ main.js
│  ├─ router
│  │  └─ index.js	// 路由
│  ├─ static	// 静态资源
│  ├─ stores	// 状态存储
│  └─ views	// 路由控制的页面
└─ vite.config.js	// 打包工具配置文件

```



### 注意事项

1. 组件库是全局引用的，不需要再次手动导入，直接使用即可
2. node.js必须是16及以上的版本，否则无法启动项目

---

## 用户页面

### 登录页

```js
// 登录
/login
// 注册
/login/register
```

### 主页

### 商品详情页

### 用户中心页

### 购物车页面

### 历史订单页

## 管理员页面

### 用户管理页面

### 商品管理页面
