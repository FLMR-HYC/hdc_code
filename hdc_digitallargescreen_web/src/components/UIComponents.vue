<template>
  <div>
    <!-- 卡片容器组件 -->
    <div v-if="type === 'plate'" :class="plateClass" :style="plateStyle">
      <slot></slot>
    </div>

    <!-- 标题栏组件 -->
    <div v-if="type === 'title'" :class="titleClass" :style="titleStyle">
      <slot></slot>
    </div>

    <!-- 图标组件 -->
    <div v-if="type === 'icon'" :class="iconClass" :style="iconStyle">
      <svg v-if="iconName === 'guest'" :width="iconSize" :height="iconSize" viewBox="0 0 100 100">
        <circle cx="50" cy="35" r="15" fill="#4FC3F7"/>
        <path d="M25 65 Q25 50 50 50 Q75 50 75 65 L75 85 Q75 90 70 90 L30 90 Q25 90 25 85 Z" fill="#4FC3F7"/>
      </svg>
      
      <svg v-if="iconName === 'production'" :width="iconSize" :height="iconSize" viewBox="0 0 100 100">
        <rect x="20" y="30" width="60" height="40" fill="#66BB6A" rx="5"/>
        <circle cx="30" cy="40" r="3" fill="#fff"/>
        <circle cx="50" cy="40" r="3" fill="#fff"/>
        <circle cx="70" cy="40" r="3" fill="#fff"/>
        <rect x="35" y="50" width="30" height="15" fill="#fff" rx="2"/>
      </svg>

      <svg v-if="iconName === 'address'" :width="iconSize" :height="iconSize" viewBox="0 0 100 100">
        <path d="M50 10 Q65 10 65 25 Q65 40 50 60 Q35 40 35 25 Q35 10 50 10 Z" fill="#FF7043"/>
        <circle cx="50" cy="25" r="8" fill="#fff"/>
      </svg>

      <svg v-if="iconName === 'alarm'" :width="iconSize" :height="iconSize" viewBox="0 0 100 100">
        <polygon points="50,15 85,75 15,75" fill="#F44336"/>
        <text x="50" y="55" text-anchor="middle" fill="white" font-size="20" font-weight="bold">!</text>
      </svg>
    </div>

    <!-- 选择器组件 -->
    <div v-if="type === 'selector'" :class="selectorClass" :style="selectorStyle">
      <slot></slot>
    </div>

    <!-- 分隔线组件 -->
    <div v-if="type === 'divider'" :class="dividerClass" :style="dividerStyle">
    </div>

    <!-- 动画背景组件 -->
    <div v-if="type === 'animation'" :class="animationClass" :style="animationStyle">
      <div class="particle" v-for="i in particleCount" :key="i"></div>
    </div>

    <!-- 标签页组件 -->
    <div v-if="type === 'tab'" :class="tabClass" :style="tabStyle">
      <slot></slot>
    </div>

    <!-- 机床状态组件 -->
    <div v-else-if="type === 'machine-status'" class="machine-status-component" :style="customStyle">
      <div class="machine-container">
        <div :class="['machine-base', { 'machine-running': isRunning }]">
          <div class="machine-body">
            <div class="machine-header"></div>
            <div class="machine-screen" :class="{ 'screen-active': isRunning }"></div>
            <div class="machine-controls">
              <div class="control-btn" :class="{ 'btn-active': isRunning }"></div>
              <div class="control-btn" :class="{ 'btn-active': isRunning }"></div>
            </div>
          </div>
        </div>
        <div v-if="isRunning" class="machine-animation">
          <div class="spark spark-1"></div>
          <div class="spark spark-2"></div>
          <div class="spark spark-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UIComponents',
  props: {
    type: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'medium'
    },
    iconName: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 40
    },
    particleCount: {
      type: Number,
      default: 20
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    isRunning: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    plateClass() {
      return [
        'ui-plate',
        `ui-plate--${this.variant}`,
        `ui-plate--${this.size}`
      ]
    },
    plateStyle() {
      const baseStyle = {
        background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.1) 0%, rgba(0, 100, 200, 0.05) 100%)',
        border: '1px solid rgba(30, 144, 255, 0.3)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(30, 144, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }
      return { ...baseStyle, ...this.customStyle }
    },
    titleClass() {
      return [
        'ui-title',
        `ui-title--${this.variant}`
      ]
    },
    titleStyle() {
      const baseStyle = {
        background: 'linear-gradient(90deg, rgba(30, 144, 255, 0.8) 0%, rgba(0, 100, 200, 0.4) 100%)',
        height: '74px',
        position: 'relative',
        borderBottom: '2px solid rgba(30, 144, 255, 0.5)',
        boxShadow: '0 4px 20px rgba(30, 144, 255, 0.2)'
      }
      return { ...baseStyle, ...this.customStyle }
    },
    iconClass() {
      return [
        'ui-icon',
        `ui-icon--${this.iconName}`
      ]
    },
    iconStyle() {
      return {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...this.customStyle
      }
    },
    selectorClass() {
      return [
        'ui-selector',
        `ui-selector--${this.variant}`
      ]
    },
    selectorStyle() {
      const baseStyle = {
        background: 'rgba(115, 177, 249, 0.2)',
        border: '1px solid rgba(115, 177, 249, 0.5)',
        borderRadius: '20px',
        padding: '8px 16px',
        backdropFilter: 'blur(5px)'
      }
      return { ...baseStyle, ...this.customStyle }
    },
    dividerClass() {
      return ['ui-divider']
    },
    dividerStyle() {
      const baseStyle = {
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(30, 144, 255, 0.5), transparent)',
        margin: '10px 0'
      }
      return { ...baseStyle, ...this.customStyle }
    },
    animationClass() {
      return [
        'ui-animation',
        `ui-animation--${this.variant}`
      ]
    },
    animationStyle() {
      const baseStyle = {
        position: 'relative',
        overflow: 'hidden'
      }
      return { ...baseStyle, ...this.customStyle }
    },
    tabClass() {
      return [
        'ui-tab',
        `ui-tab--${this.variant}`
      ]
    },
    tabStyle() {
      const baseStyle = {
        background: 'rgba(30, 144, 255, 0.1)',
        border: '1px solid rgba(30, 144, 255, 0.3)',
        borderRadius: '25px',
        padding: '8px 20px',
        display: 'inline-block',
        backdropFilter: 'blur(5px)'
      }
      return { ...baseStyle, ...this.customStyle }
    }
  }
}
</script>

<style lang="less" scoped>
.ui-plate {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 49%, rgba(30, 144, 255, 0.1) 50%, transparent 51%);
    opacity: 0.3;
    animation: shimmer 3s ease-in-out infinite;
  }
}

.ui-title {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #1e90ff, #0064c8, #1e90ff);
    animation: glow 2s ease-in-out infinite alternate;
  }
}

.ui-animation {
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(30, 144, 255, 0.6);
    border-radius: 50%;
    animation: float 3s ease-in-out infinite;
    
    &:nth-child(odd) {
      animation-delay: -1s;
    }
    
    &:nth-child(3n) {
      animation-delay: -2s;
    }
  }
}

.ui-selector {
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(115, 177, 249, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(115, 177, 249, 0.3);
  }
}

.ui-tab {
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(30, 144, 255, 0.2);
    transform: scale(1.05);
  }
  
  &--active {
    background: rgba(30, 144, 255, 0.3);
    box-shadow: 0 0 20px rgba(30, 144, 255, 0.4);
  }
}

@keyframes shimmer {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }
  100% {
    box-shadow: 0 0 20px rgba(30, 144, 255, 0.8);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

/* 机床状态组件样式 */
.machine-status-component {
  display: flex;
  justify-content: center;
  align-items: center;
}

.machine-container {
  position: relative;
  width: 60px;
  height: 60px;
}

.machine-base {
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.3s ease;
}

.machine-body {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 50%, #1a202c 100%);
  border-radius: 8px;
  position: relative;
  border: 2px solid #718096;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.machine-running .machine-body {
  border-color: #48bb78;
  box-shadow: 0 4px 16px rgba(72, 187, 120, 0.4);
}

.machine-header {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  height: 8px;
  background: linear-gradient(90deg, #a0aec0 0%, #718096 100%);
  border-radius: 2px;
}

.machine-screen {
  position: absolute;
  top: 16px;
  left: 8px;
  right: 8px;
  height: 20px;
  background: #1a202c;
  border-radius: 4px;
  border: 1px solid #4a5568;
}

.screen-active {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  border-color: #48bb78;
  box-shadow: 0 0 8px rgba(72, 187, 120, 0.6);
}

.machine-controls {
  position: absolute;
  bottom: 6px;
  left: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
}

.control-btn {
  flex: 1;
  height: 6px;
  background: #4a5568;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.btn-active {
  background: linear-gradient(90deg, #f56565 0%, #e53e3e 100%);
  box-shadow: 0 0 4px rgba(245, 101, 101, 0.6);
}

.machine-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.spark {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffd700;
  border-radius: 50%;
  animation: sparkle 1.5s infinite;
}

.spark-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.spark-2 {
  top: 60%;
  right: 15%;
  animation-delay: 0.5s;
}

.spark-3 {
  bottom: 25%;
  left: 60%;
  animation-delay: 1s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>
