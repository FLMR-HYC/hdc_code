# 动态边框系统使用指南

## 概述
该系统为所有组件提供了自定义的图片边框支持，可以根据组件尺寸动态调整边框效果。

## 功能特性

### 1. 自动尺寸调整
- 边框会根据组件的实际大小自动调整厚度和九宫格切片
- 支持响应式设计，窗口大小改变时自动重新调整

### 2. 多种组件类型支持
- `card`: 普通卡片组件 (圆角8px)
- `chart`: 图表组件 (圆角12px, 固定高度350px)
- `status`: 状态组件 (圆角6px)

### 3. 边框图片配置
```javascript
borderConfig: {
    borderWidth: 15,           // 边框宽度
    sliceWidth: 30,           // 九宫格切片宽度  
    borderImages: {
        default: '../assets/myfonts/框.png',
        card: '../assets/myfonts/框.png',
        chart: '../assets/myfonts/框.png', 
        status: '../assets/myfonts/框.png'
    }
}
```

## 使用方法

### 基础使用
```vue
<UIComponents 
    type="plate" 
    variant="stats"
    :custom-style="getComponentBorderStyle('card')"
>
    <!-- 组件内容 -->
</UIComponents>
```

### 不同类型的组件
```vue
<!-- 卡片类型 -->
:custom-style="getComponentBorderStyle('card')"

<!-- 图表类型 -->
:custom-style="getComponentBorderStyle('chart')"

<!-- 状态类型 -->
:custom-style="getComponentBorderStyle('status')"
```

### 自定义配置
```vue
<!-- 使用自定义边框配置 -->
:custom-style="getComponentBorderStyle('card', { borderWidth: 20, sliceWidth: 40 })"
```

## 边框图片要求

### 图片格式
- 建议使用PNG格式，支持透明度
- 图片应设计为九宫格结构，四个角为固定部分，边缘为可拉伸部分

### 推荐尺寸
- 最小尺寸：60x60px (九宫格每个区域20x20px)
- 推荐尺寸：90x90px (九宫格每个区域30x30px)
- 高质量：120x120px (九宫格每个区域40x40px)

### 九宫格设计原则
```
┌─────────┬─────────┬─────────┐
│ 角落1   │ 顶边    │ 角落2   │
├─────────┼─────────┼─────────┤
│ 左边    │ 中心    │ 右边    │
├─────────┼─────────┼─────────┤
│ 角落3   │ 底边    │ 角落4   │
└─────────┴─────────┴─────────┘
```
- 四个角落：固定不变
- 四个边：水平或垂直拉伸
- 中心：双向拉伸或保持原样

## 自定义边框图片

### 1. 准备边框图片
将您的边框图片放置在 `src/assets/myfonts/` 目录下

### 2. 更新配置
在 `borderConfig.borderImages` 中添加新的边框图片路径：
```javascript
borderImages: {
    default: '../assets/myfonts/框.png',
    card: '../assets/myfonts/卡片边框.png',
    chart: '../assets/myfonts/图表边框.png',
    status: '../assets/myfonts/状态边框.png',
    // 添加新的边框类型
    special: '../assets/myfonts/特殊边框.png'
}
```

### 3. 调整切片参数
根据您的图片设计调整 `sliceWidth` 参数：
- 如果图片的九宫格区域是30x30px，设置 `sliceWidth: 30`
- 如果图片的九宫格区域是40x40px，设置 `sliceWidth: 40`

## 性能优化

### 图片优化
- 使用压缩工具减小图片文件大小
- 考虑使用WebP格式以获得更好的压缩率
- 避免使用过大的图片尺寸

### 渲染优化
- 边框调整使用了防抖机制，避免频繁重绘
- 响应式调整仅在窗口大小变化时触发
- 使用了CSS的 `border-image` 属性，硬件加速渲染

## 故障排除

### 边框不显示
1. 检查图片路径是否正确
2. 确认图片文件存在
3. 检查浏览器控制台是否有加载错误

### 边框变形
1. 调整 `sliceWidth` 参数匹配图片设计
2. 检查图片的九宫格结构是否正确
3. 尝试调整 `borderWidth` 参数

### 性能问题
1. 减小边框图片文件大小
2. 检查是否有过多的DOM元素使用边框
3. 考虑在低性能设备上禁用动态调整

## 当前应用的组件

✅ 已应用动态边框的组件：
- 左侧：入场统计、质量通过率、物质齐套率组合卡片
- 右侧上：产线运行状态卡片
- 右侧下：设备告警与出入库合并卡片
- 底部左：产品产量统计图表
- 底部右：年度产量总览图表

所有组件都会根据屏幕尺寸自动调整边框效果，确保在不同分辨率下都有良好的视觉表现。
