<template>
  <div class="chart-container">
    <!-- 水平柱状图 -->
    <div v-if="type === 'horizontal-bar'" class="horizontal-chart">
      <div 
        v-for="(item, index) in data" 
        :key="index" 
        class="bar-item"
        :style="{ marginBottom: '8px' }"
      >
        <div class="bar-label">{{ item.label }}</div>
        <div class="bar-container">
          <div 
            class="bar-fill" 
            :style="{ 
              width: `${(item.value / maxValue) * 100}%`,
              background: getBarColor(index, 'horizontal')
            }"
          >
            <span class="bar-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 垂直柱状图 - 蓝色 -->
    <div v-if="type === 'vertical-blue'" class="vertical-chart">
      <div class="chart-bars">
        <div 
          v-for="(item, index) in data" 
          :key="index" 
          class="bar-column"
        >
          <div 
            class="bar-fill-vertical blue-bar" 
            :style="{ 
              height: `${(item.value / maxValue) * 100}%`,
              animationDelay: `${index * 0.1}s`
            }"
          >
          </div>
          <div class="bar-value-vertical">{{ item.value }}</div>
          <div class="bar-label-vertical">{{ item.label }}</div>
        </div>
      </div>
    </div>

    <!-- 垂直柱状图 - 绿色 -->
    <div v-if="type === 'vertical-green'" class="vertical-chart">
      <div class="chart-bars">
        <div 
          v-for="(item, index) in data" 
          :key="index" 
          class="bar-column"
        >
          <div 
            class="bar-fill-vertical green-bar" 
            :style="{ 
              height: `${(item.value / maxValue) * 100}%`,
              animationDelay: `${index * 0.1}s`
            }"
          >
          </div>
          <div class="bar-value-vertical">{{ item.value }}</div>
          <div class="bar-label-vertical">{{ item.label }}</div>
        </div>
      </div>
    </div>

    <!-- 效率线图 -->
    <div v-if="type === 'line-efficiency'" class="line-chart">
      <svg :width="width" :height="height" class="line-svg">
        <defs>
          <linearGradient id="efficiencyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#4FC3F7;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#4FC3F7;stop-opacity:0.1" />
          </linearGradient>
        </defs>
        
        <!-- 网格线 -->
        <g class="grid">
          <line v-for="i in 5" :key="`h-${i}`" 
                :x1="0" :y1="i * (height / 5)" 
                :x2="width" :y2="i * (height / 5)" 
                stroke="rgba(255,255,255,0.1)" />
          <line v-for="i in data.length" :key="`v-${i}`" 
                :x1="i * (width / data.length)" :y1="0" 
                :x2="i * (width / data.length)" :y2="height" 
                stroke="rgba(255,255,255,0.1)" />
        </g>
        
        <!-- 面积 -->
        <path :d="areaPath" fill="url(#efficiencyGradient)" />
        
        <!-- 线条 -->
        <path :d="linePath" fill="none" stroke="#4FC3F7" stroke-width="3" />
        
        <!-- 数据点 -->
        <circle v-for="(point, index) in linePoints" :key="index"
                :cx="point.x" :cy="point.y" r="4" 
                fill="#4FC3F7" stroke="#fff" stroke-width="2" />
      </svg>
    </div>

    <!-- 质量线图 -->
    <div v-if="type === 'line-quality'" class="line-chart">
      <svg :width="width" :height="height" class="line-svg">
        <defs>
          <linearGradient id="qualityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#66BB6A;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#66BB6A;stop-opacity:0.1" />
          </linearGradient>
        </defs>
        
        <!-- 网格线 -->
        <g class="grid">
          <line v-for="i in 5" :key="`h-${i}`" 
                :x1="0" :y1="i * (height / 5)" 
                :x2="width" :y2="i * (height / 5)" 
                stroke="rgba(255,255,255,0.1)" />
          <line v-for="i in data.length" :key="`v-${i}`" 
                :x1="i * (width / data.length)" :y1="0" 
                :x2="i * (width / data.length)" :y2="height" 
                stroke="rgba(255,255,255,0.1)" />
        </g>
        
        <!-- 面积 -->
        <path :d="areaPath" fill="url(#qualityGradient)" />
        
        <!-- 线条 -->
        <path :d="linePath" fill="none" stroke="#66BB6A" stroke-width="3" />
        
        <!-- 数据点 -->
        <circle v-for="(point, index) in linePoints" :key="index"
                :cx="point.x" :cy="point.y" r="4" 
                fill="#66BB6A" stroke="#fff" stroke-width="2" />
      </svg>
    </div>

    <!-- 圆形图表背景 -->
    <div v-if="type === 'circle-bg'" class="circle-chart">
      <svg :width="size" :height="size">
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e90ff;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#0064c8;stop-opacity:0.4" />
          </linearGradient>
        </defs>
        <circle 
          :cx="size/2" 
          :cy="size/2" 
          :r="size/2 - 5" 
          fill="url(#circleGradient)" 
          stroke="rgba(30, 144, 255, 0.5)" 
          stroke-width="2"
        />
        <circle 
          :cx="size/2" 
          :cy="size/2" 
          :r="size/3" 
          fill="rgba(255,255,255,0.1)" 
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartComponents',
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    },
    size: {
      type: Number,
      default: 100
    }
  },
  computed: {
    maxValue() {
      return Math.max(...this.data.map(item => item.value))
    },
    linePoints() {
      const stepX = this.width / (this.data.length - 1)
      return this.data.map((item, index) => ({
        x: index * stepX,
        y: this.height - (item.value / this.maxValue) * this.height
      }))
    },
    linePath() {
      if (this.linePoints.length === 0) return ''
      const path = this.linePoints.map((point, index) => 
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ')
      return path
    },
    areaPath() {
      if (this.linePoints.length === 0) return ''
      const linePath = this.linePath
      const lastPoint = this.linePoints[this.linePoints.length - 1]
      const firstPoint = this.linePoints[0]
      return `${linePath} L ${lastPoint.x} ${this.height} L ${firstPoint.x} ${this.height} Z`
    }
  },
  methods: {
    getBarColor(index, type) {
      const colors = {
        horizontal: ['#4FC3F7', '#66BB6A', '#FFB74D', '#F06292'],
        vertical: ['#1e90ff', '#0064c8', '#4FC3F7', '#73B1F9']
      }
      return colors[type][index % colors[type].length]
    }
  }
}
</script>

<style lang="less" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}

.horizontal-chart {
  .bar-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .bar-label {
    width: 80px;
    color: white;
    font-size: 12px;
    margin-right: 10px;
  }
  
  .bar-container {
    flex: 1;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  
  .bar-fill {
    height: 100%;
    border-radius: 10px;
    position: relative;
    animation: growWidth 1s ease-out;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
  }
  
  .bar-value {
    color: white;
    font-size: 11px;
    font-weight: bold;
  }
}

.vertical-chart {
  height: 100%;
  display: flex;
  align-items: flex-end;
  
  .chart-bars {
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 100%;
    gap: 10px;
  }
  
  .bar-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: relative;
  }
  
  .bar-fill-vertical {
    width: 100%;
    max-width: 40px;
    border-radius: 4px 4px 0 0;
    animation: growHeight 1s ease-out;
    position: relative;
    
    &.blue-bar {
      background: linear-gradient(180deg, #4FC3F7 0%, #1e90ff 100%);
      box-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
    }
    
    &.green-bar {
      background: linear-gradient(180deg, #66BB6A 0%, #4CAF50 100%);
      box-shadow: 0 0 10px rgba(102, 187, 106, 0.5);
    }
  }
  
  .bar-value-vertical {
    color: white;
    font-size: 12px;
    margin-top: 5px;
    font-weight: bold;
  }
  
  .bar-label-vertical {
    color: rgba(255, 255, 255, 0.7);
    font-size: 10px;
    margin-top: 3px;
  }
}

.line-chart {
  .line-svg {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
}

.circle-chart {
  svg {
    filter: drop-shadow(0 0 10px rgba(30, 144, 255, 0.3));
  }
}

@keyframes growWidth {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@keyframes growHeight {
  from {
    height: 0%;
  }
  to {
    height: 100%;
  }
}
</style>
