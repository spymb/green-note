# Green 笔记
一款基于 **Vue 2** 的单页面笔记应用。主要适配 PC 及平板。

主要页面有，登陆注册页面、笔记本列表页面、笔记页面和回收站页面。

## 主要功能
用户在注册、登录后，可创建自己的笔记本，添加笔记，并将不需要的笔记放入回收站。

支持笔记的分类管理，支持笔记 Markdown 格式的书写和预览。

支持笔记本和笔记的编辑功能，支持回收站的撤销功能。

## 主要技术栈
使用 **Vue CLI** 进行项目搭建，Vue Router 进行前端路由，**Vuex** 进行数据管理。

引入了 Input、Message、Dropdown 等 <strong>Element UI</strong> 组件对用户体验进行优化。

引入了 **Axios** 进行 **AJAX** 请求，并使用 **Promise** 进行二次封装，提高编写效率。

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```
        
