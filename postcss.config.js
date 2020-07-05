module.exports = {
  plugins:{
    autoprefixer:{},
    'postcss-px-to-viewport':{
      viewportWidth:375,
      viewportHeight:667,
      unitPrecision: 5, // 指的是转化后的保留的小数点位数
      viewportUnit: 'vw', //转化后的视窗单位
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],
      minPixelValue: 1,  //小于或等于1px的不转化为视窗单位
      mediaQuery:false,  // 是否允许在媒体查询中转换px
    },
  }
}
