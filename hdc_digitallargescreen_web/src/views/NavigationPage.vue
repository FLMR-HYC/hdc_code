<template>
  <div class="navigation-page">
    <div class="nav-container">
      <h1 class="main-title">鸿志智慧工厂数字化大屏系统</h1>
      <p class="subtitle">请选择要访问的版本</p>
      
      <div class="nav-grid">
        <div class="nav-card" @click="navigate('/dataOverviewNew')">
          <div class="card-icon">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="#4FC3F7">
              <rect x="10" y="20" width="80" height="60" rx="8" fill="none" stroke="#4FC3F7" stroke-width="3"/>
              <circle cx="25" cy="35" r="3" fill="#4FC3F7"/>
              <circle cx="35" cy="35" r="3" fill="#4FC3F7"/>
              <circle cx="45" cy="35" r="3" fill="#4FC3F7"/>
              <rect x="20" y="45" width="60" height="25" rx="4" fill="rgba(79, 195, 247, 0.2)"/>
              <path d="M25 55 L35 50 L45 60 L55 45 L65 55" stroke="#4FC3F7" stroke-width="2" fill="none"/>
            </svg>
          </div>
          <h3>新版数字大屏</h3>
          <p>使用组件化设计，无图片资源</p>
          <ul class="features">
            <li>✓ 现代化UI设计</li>
            <li>✓ 流畅动画效果</li>
            <li>✓ 组件化架构</li>
            <li>✓ 高性能渲染</li>
          </ul>
          <div class="card-badge new">推荐</div>
        </div>

        <div class="nav-card" @click="navigate('/dataOverview')">
          <div class="card-icon">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="#66BB6A">
              <rect x="15" y="25" width="70" height="50" rx="5" fill="none" stroke="#66BB6A" stroke-width="3"/>
              <rect x="25" y="35" width="50" height="30" fill="rgba(102, 187, 106, 0.2)"/>
              <circle cx="30" cy="45" r="2" fill="#66BB6A"/>
              <circle cx="40" cy="45" r="2" fill="#66BB6A"/>
              <circle cx="50" cy="45" r="2" fill="#66BB6A"/>
              <circle cx="60" cy="45" r="2" fill="#66BB6A"/>
            </svg>
          </div>
          <h3>原版数字大屏</h3>
          <p>基于图片资源的传统设计</p>
          <ul class="features">
            <li>○ 传统图片资源</li>
            <li>○ 固定布局设计</li>
            <li>○ 较大资源占用</li>
            <li>○ 原有功能完整</li>
          </ul>
          <div class="card-badge old">原版</div>
        </div>

        <div class="nav-card" @click="navigate('/componentDemo')">
          <div class="card-icon">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="#FF9800">
              <rect x="10" y="10" width="35" height="35" rx="4" fill="rgba(255, 152, 0, 0.3)" stroke="#FF9800" stroke-width="2"/>
              <rect x="55" y="10" width="35" height="35" rx="4" fill="rgba(255, 152, 0, 0.3)" stroke="#FF9800" stroke-width="2"/>
              <rect x="10" y="55" width="35" height="35" rx="4" fill="rgba(255, 152, 0, 0.3)" stroke="#FF9800" stroke-width="2"/>
              <rect x="55" y="55" width="35" height="35" rx="4" fill="rgba(255, 152, 0, 0.3)" stroke="#FF9800" stroke-width="2"/>
              <circle cx="27" cy="27" r="5" fill="#FF9800"/>
              <circle cx="72" cy="27" r="5" fill="#FF9800"/>
              <circle cx="27" cy="72" r="5" fill="#FF9800"/>
              <circle cx="72" cy="72" r="5" fill="#FF9800"/>
            </svg>
          </div>
          <h3>组件展示</h3>
          <p>查看所有新组件的效果</p>
          <ul class="features">
            <li>○ UI组件库</li>
            <li>○ 图表组件</li>
            <li>○ 交互演示</li>
            <li>○ 开发参考</li>
          </ul>
          <div class="card-badge demo">演示</div>
        </div>

        <div class="nav-card" @click="navigate('/settingNew')">
          <div class="card-icon">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="#9C27B0">
              <circle cx="50" cy="50" r="35" fill="none" stroke="#9C27B0" stroke-width="3"/>
              <circle cx="50" cy="50" r="12" fill="rgba(156, 39, 176, 0.3)"/>
              <circle cx="50" cy="20" r="4" fill="#9C27B0"/>
              <circle cx="50" cy="80" r="4" fill="#9C27B0"/>
              <circle cx="20" cy="50" r="4" fill="#9C27B0"/>
              <circle cx="80" cy="50" r="4" fill="#9C27B0"/>
              <circle cx="35" cy="35" r="3" fill="#9C27B0"/>
              <circle cx="65" cy="35" r="3" fill="#9C27B0"/>
              <circle cx="35" cy="65" r="3" fill="#9C27B0"/>
              <circle cx="65" cy="65" r="3" fill="#9C27B0"/>
            </svg>
          </div>
          <h3>系统配置</h3>
          <p>设备区域配置管理</p>
          <ul class="features">
            <li>○ 地区选择</li>
            <li>○ 展区配置</li>
            <li>○ 设备管理</li>
            <li>○ 参数设置</li>
          </ul>
          <div class="card-badge config">配置</div>
        </div>
      </div>

      <div class="info-section">
        <h3>设计方案对比</h3>
        <div class="comparison-table">
          <div class="table-header">
            <div class="col">功能特性</div>
            <div class="col">原版设计</div>
            <div class="col">新版设计</div>
          </div>
          <div class="table-row">
            <div class="col">资源加载</div>
            <div class="col old">需要加载多个图片文件</div>
            <div class="col new">纯代码实现，无需图片</div>
          </div>
          <div class="table-row">
            <div class="col">页面性能</div>
            <div class="col old">较多HTTP请求</div>
            <div class="col new">减少90%资源请求</div>
          </div>
          <div class="table-row">
            <div class="col">视觉效果</div>
            <div class="col old">静态图片展示</div>
            <div class="col new">动态动画效果</div>
          </div>
          <div class="table-row">
            <div class="col">可维护性</div>
            <div class="col old">需要设计工具修改</div>
            <div class="col new">代码直接修改</div>
          </div>
          <div class="table-row">
            <div class="col">响应式</div>
            <div class="col old">固定尺寸</div>
            <div class="col new">自适应布局</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationPage',
  methods: {
    navigate(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.navigation-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #05181d 0%, #0a2633 50%, #0f3a4f 100%);
  padding: 40px 20px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
}

.main-title {
  text-align: center;
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  margin-bottom: 40px;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.nav-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  .card-icon {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  
  h3 {
    color: white;
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .features {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    
    li {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      margin-bottom: 8px;
      padding-left: 20px;
    }
  }
  
  .card-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    
    &.new {
      background: linear-gradient(135deg, #4FC3F7, #1e90ff);
      color: white;
    }
    
    &.old {
      background: rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.8);
    }
    
    &.demo {
      background: linear-gradient(135deg, #FF9800, #F57C00);
      color: white;
    }
    
    &.config {
      background: linear-gradient(135deg, #9C27B0, #7B1FA2);
      color: white;
    }
  }
}

.info-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(10px);
  
  h3 {
    color: white;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
}

.comparison-table {
  .table-header, .table-row {
    display: grid;
    grid-template-columns: 2fr 3fr 3fr;
    gap: 20px;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .col {
      padding: 10px;
      border-radius: 8px;
      
      &:first-child {
        color: white;
        font-weight: bold;
      }
      
      &.old {
        background: rgba(255, 193, 7, 0.1);
        border: 1px solid rgba(255, 193, 7, 0.3);
        color: #FFC107;
      }
      
      &.new {
        background: rgba(76, 175, 80, 0.1);
        border: 1px solid rgba(76, 175, 80, 0.3);
        color: #4CAF50;
      }
    }
  }
  
  .table-header .col {
    background: rgba(30, 144, 255, 0.1);
    border: 1px solid rgba(30, 144, 255, 0.3);
    color: #1e90ff;
    font-weight: bold;
  }
}
</style>
