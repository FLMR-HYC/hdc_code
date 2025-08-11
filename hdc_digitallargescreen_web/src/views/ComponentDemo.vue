<template>
  <div class="demo-container">
    <ScaleScreen :width="1920" :height="1137" :selfAdaption="true" :alignTop="false">
      <div class="demo-root">
        <!-- 标题展示 -->
        <UIComponents 
          type="title" 
          :custom-style="{ width: '100%', height: '80px', marginBottom: '20px' }"
        >
          <div class="demo-title">
            <h1>UI组件展示页面 - 替换图片资源方案</h1>
          </div>
        </UIComponents>

        <div class="demo-grid">
          <!-- 卡片组件展示 -->
          <div class="demo-section">
            <h2>卡片组件 (替换 plate_*.png)</h2>
            <div class="plate-demo">
              <UIComponents 
                type="plate" 
                variant="default"
                :custom-style="{ width: '300px', height: '200px', margin: '10px', padding: '20px' }"
              >
                <h3 style="color: white; margin: 0 0 10px 0;">数据统计</h3>
                <p style="color: rgba(255,255,255,0.8); margin: 0;">这里是卡片内容</p>
              </UIComponents>

              <UIComponents 
                type="plate" 
                variant="success"
                :custom-style="{ 
                  width: '300px', 
                  height: '200px', 
                  margin: '10px', 
                  padding: '20px',
                  background: 'linear-gradient(135deg, rgba(102, 187, 106, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
                  border: '1px solid rgba(102, 187, 106, 0.3)'
                }"
              >
                <h3 style="color: #66BB6A; margin: 0 0 10px 0;">设备状态</h3>
                <p style="color: rgba(255,255,255,0.8); margin: 0;">正常运行</p>
              </UIComponents>
            </div>
          </div>

          <!-- 图标组件展示 -->
          <div class="demo-section">
            <h2>图标组件 (替换 guest.png, production.png 等)</h2>
            <div class="icon-demo">
              <div class="icon-item">
                <UIComponents type="icon" icon-name="guest" :icon-size="60" />
                <span>访客</span>
              </div>
              <div class="icon-item">
                <UIComponents type="icon" icon-name="production" :icon-size="60" />
                <span>生产</span>
              </div>
              <div class="icon-item">
                <UIComponents type="icon" icon-name="address" :icon-size="60" />
                <span>地址</span>
              </div>
              <div class="icon-item">
                <UIComponents type="icon" icon-name="alarm" :icon-size="60" />
                <span>告警</span>
              </div>
            </div>
          </div>

          <!-- 图表组件展示 -->
          <div class="demo-section">
            <h2>图表组件 (替换 histogram_*.png, line_*.png)</h2>
            <div class="chart-demo">
              <div class="chart-item">
                <h4>水平柱状图</h4>
                <ChartComponents 
                  type="horizontal-bar" 
                  :data="horizontalData"
                  :width="300"
                  :height="150"
                />
              </div>
              
              <div class="chart-item">
                <h4>垂直柱状图 - 蓝色</h4>
                <ChartComponents 
                  type="vertical-blue" 
                  :data="verticalData"
                  :width="300"
                  :height="150"
                />
              </div>
              
              <div class="chart-item">
                <h4>垂直柱状图 - 绿色</h4>
                <ChartComponents 
                  type="vertical-green" 
                  :data="verticalData"
                  :width="300"
                  :height="150"
                />
              </div>
              
              <div class="chart-item">
                <h4>效率线图</h4>
                <ChartComponents 
                  type="line-efficiency" 
                  :data="lineData"
                  :width="300"
                  :height="150"
                />
              </div>
              
              <div class="chart-item">
                <h4>质量线图</h4>
                <ChartComponents 
                  type="line-quality" 
                  :data="lineData"
                  :width="300"
                  :height="150"
                />
              </div>
              
              <div class="chart-item">
                <h4>圆形图表背景</h4>
                <ChartComponents 
                  type="circle-bg" 
                  :size="120"
                />
              </div>
            </div>
          </div>

          <!-- 其他组件展示 -->
          <div class="demo-section">
            <h2>其他组件 (替换 selector.png, mini_tab.png 等)</h2>
            <div class="other-demo">
              <div class="component-item">
                <h4>选择器</h4>
                <UIComponents 
                  type="selector" 
                  :custom-style="{ width: '150px', textAlign: 'center' }"
                >
                  <span style="color: #73B1F9;">机械臂</span>
                </UIComponents>
              </div>
              
              <div class="component-item">
                <h4>标签页</h4>
                <UIComponents 
                  type="tab" 
                  variant="active"
                  :custom-style="{ marginRight: '10px' }"
                >
                  <span style="color: white;">今日</span>
                </UIComponents>
                <UIComponents 
                  type="tab" 
                  variant="default"
                >
                  <span style="color: rgba(255,255,255,0.5);">本月</span>
                </UIComponents>
              </div>
              
              <div class="component-item">
                <h4>分隔线</h4>
                <UIComponents 
                  type="divider" 
                  :custom-style="{ width: '200px' }"
                />
              </div>
              
              <div class="component-item">
                <h4>动画效果</h4>
                <UIComponents 
                  type="animation" 
                  :particle-count="15"
                  :custom-style="{ 
                    width: '200px', 
                    height: '100px',
                    background: 'rgba(30, 144, 255, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(30, 144, 255, 0.3)'
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaleScreen>
  </div>
</template>

<script>
import ScaleScreen from '@/views/scale-screen.vue'
import UIComponents from '@/components/UIComponents.vue'
import ChartComponents from '@/components/ChartComponents.vue'

export default {
  name: 'ComponentDemo',
  components: {
    ScaleScreen,
    UIComponents,
    ChartComponents
  },
  data() {
    return {
      horizontalData: [
        { label: '设备A', value: 85 },
        { label: '设备B', value: 92 },
        { label: '设备C', value: 78 },
        { label: '设备D', value: 95 }
      ],
      verticalData: [
        { label: '1月', value: 120 },
        { label: '2月', value: 140 },
        { label: '3月', value: 100 },
        { label: '4月', value: 160 },
        { label: '5月', value: 180 }
      ],
      lineData: [
        { label: '00:00', value: 65 },
        { label: '04:00', value: 78 },
        { label: '08:00', value: 85 },
        { label: '12:00', value: 92 },
        { label: '16:00', value: 88 },
        { label: '20:00', value: 76 },
        { label: '24:00', value: 69 }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.demo-container {
  background-color: #05181d;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.demo-root {
  padding: 20px;
  min-height: 100%;
}

.demo-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  h1 {
    color: white;
    font-size: 28px;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
}

.demo-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.demo-section {
  h2 {
    color: white;
    font-size: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(30, 144, 255, 0.5);
    padding-bottom: 10px;
  }
}

.plate-demo {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.icon-demo {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    
    span {
      color: white;
      font-size: 14px;
    }
  }
}

.chart-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  
  .chart-item {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(30, 144, 255, 0.2);
    border-radius: 8px;
    padding: 20px;
    
    h4 {
      color: white;
      margin: 0 0 15px 0;
      font-size: 16px;
    }
  }
}

.other-demo {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  
  .component-item {
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    h4 {
      color: white;
      margin: 0;
      font-size: 16px;
    }
  }
}
</style>
