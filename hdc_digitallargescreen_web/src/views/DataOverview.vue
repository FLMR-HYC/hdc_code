<template>
    <div class="divroot">
        <!-- 背景视频 -->
        <video autoplay muted loop class="background-video">
            <source src="../assets/dataOverview/background.mp4" type="video/mp4">
            <!-- 您需要替换为实际的视频路径 -->
        </video>
		<!-- 渐变蒙版遮罩 -->
        <div class="gradient-overlay"></div>
        
        <ScaleScreen :width="1920" :height="1137" :selfAdaption="true" :alignTop="false">
            <div class="root">
                <!-- 自定义标题栏 -->
                <div class="custom-header">
                    <!-- 背景图片 -->
                    <div class="header-background">
                        <img src="../assets/myfonts/头部.png" alt="Header Background" class="header-image" />
                    </div>
                    
                    <!-- 展区设置部分 -->
                    <div class="location-section">
                        <div class="location-display">
                            <UIComponents 
                                type="icon" 
                                icon-name="address" 
                                :icon-size="20"
                                :custom-style="{ 
                                    marginRight: '8px',
                                    filter: 'drop-shadow(0 0 8px rgba(255, 67, 67, 0.6))'
                                }"
                            />
                            <div class="location-text">
                                <span class="location-label">展区位置</span>
                                <span class="location-value">{{cityValue}}</span>
                            </div>
                            <button class="setting-btn" @click="SetClick">展区设置</button>
                        </div>
                    </div>
                    
                    <!-- 时钟部分 -->

                    <CrayonClock />

                </div>

                <!-- 主布局容器 -->
                <div class="main-layout">
                    <!-- 左侧组合卡片 - 30% -->
                    <div class="left-panel">
                        <UIComponents 
                            type="plate" 
                            variant="stats"
                            :custom-style="getComponentBorderStyle('card')"
                        >
                            <div class="combined-card-content">
                                <!-- 入场统计部分 -->
                                <div class="section visitor-section">
                                    <div class="section-header">
                                        <div class="section-title">入场统计</div>
                                        <UIComponents 
                                            type="animation" 
                                            :particle-count="6"
                                            :custom-style="{ 
                                                width: '60px', 
                                                height: '20px',
                                                marginLeft: '10px'
                                            }"
                                        />
                                        <div class="tabs">
                                            <UIComponents type="tab" variant="active">
                                                <span style="color: white; font-size: 12px; font-family: 'myfont', sans-serif;">今日</span>
                                            </UIComponents>
                                            <UIComponents type="tab" variant="default">
                                                <span style="color: rgba(255,255,255,0.5); font-size: 12px; font-family: 'myfont', sans-serif;">本月</span>
                                            </UIComponents>
                                        </div>
                                    </div>
                                    
                                    <div class="visitor-stats">
                                        <div class="stat-item">
                                            <UIComponents type="icon" icon-name="guest" :icon-size="40" />
                                            <div class="stat-info">
                                                <div class="stat-label">访客</div>
                                                <div class="stat-value">
                                                    {{dataVisitor.data.today.visitor}}
                                                    <span class="stat-unit">次</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="stat-item">
                                            <UIComponents type="icon" icon-name="production" :icon-size="40" />
                                            <div class="stat-info">
                                                <div class="stat-label">生产员</div>
                                                <div class="stat-value">
                                                    {{dataVisitor.data.today.employee}}
                                                    <span class="stat-unit">次</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="recent-info">
                                        <UIComponents type="icon" icon-name="guest" :icon-size="30" :custom-style="{ marginRight: '6px' }" />
                                        <span class="recent-label">最近3小时入场：</span>
                                        <span class="recent-count">{{dataVisitor.data.last3Hours}}</span>
                                        <span class="recent-unit">人</span>
                                    </div>
                                </div>

                                <!-- 质检通过率部分 -->
                                <div class="section quality-section">
                                    <div class="section-header">
                                        <div class="section-title">质检通过率</div>
                                        <UIComponents 
                                            type="animation" 
                                            :particle-count="6"
                                            :custom-style="{ 
                                                width: '60px', 
                                                height: '20px',
                                                marginLeft: '10px'
                                            }"
                                        />
                                    </div>
                                    
                                    <div class="quality-display">
                                        <div class="quality-chart">
                                            <div id="deviceChart" style="width: 120px; height: 120px;"></div>
                                            <div class="quality-rate">
                                                <span class="rate-value">{{dataProduct.data.qualityPassRate.rate}}</span>
                                                <span class="rate-unit">%</span>
                                            </div>
                                        </div>
                                        
                                        <div class="quality-stats">
                                            <div class="stat-row">
                                                <span class="stat-label">受检量：</span>
                                                <span class="stat-value">{{dataProduct.data.qualityPassRate.countTotal}}</span>
                                                <span class="stat-unit">件</span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="stat-label">通过量：</span>
                                                <span class="stat-value quality-pass">{{dataProduct.data.qualityPassRate.countPass}}</span>
                                                <span class="stat-unit">件</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 物料齐套率部分 -->
                                <div class="section material-section">
                                    <div class="section-header">
                                        <div class="section-title">物料齐套率</div>
                                        <UIComponents 
                                            type="animation" 
                                            :particle-count="6"
                                            :custom-style="{ 
                                                width: '60px', 
                                                height: '20px',
                                                marginLeft: '10px'
                                            }"
                                        />
                                    </div>
                                    
                                    <div class="material-display">
                                        <div class="material-rate">
                                            <span class="rate-value">{{dataProduct.data.materialCompletionRate.rate}}</span>
                                            <span class="rate-unit">%</span>
                                        </div>
                                        
                                        <div class="material-parts">
                                            <div class="part-item">
                                                <UIComponents type="icon" icon-name="part1" :icon-size="14" />
                                                <span class="part-label">配件1</span>
                                                <span class="part-value">{{dataProduct.data.materialCompletionRate.m1}}</span>
                                            </div>
                                            <div class="part-item">
                                                <UIComponents type="icon" icon-name="part2" :icon-size="14" />
                                                <span class="part-label">配件2</span>
                                                <span class="part-value">{{dataProduct.data.materialCompletionRate.m2}}</span>
                                            </div>
                                            <!-- <div class="part-item">
                                                <UIComponents type="icon" icon-name="part1" :icon-size="14" />
                                                <span class="part-label">配件3</span>
                                                <span class="part-value">{{dataProduct.data.materialCompletionRate.m3}}</span>
                                            </div>
                                            <div class="part-item">
                                                <UIComponents type="icon" icon-name="part2" :icon-size="14" />
                                                <span class="part-label">配件4</span>
                                                <span class="part-value">{{dataProduct.data.materialCompletionRate.m4}}</span>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </UIComponents>
                    </div>

                    <!-- 中间空白区域 - 40% -->
                    <div class="center-video-area">
                        <!-- 这里是视频展示区域，透明背景让视频可见 -->
                    </div>

                    <!-- 右侧组合卡片 - 30% -->
                    <div class="right-panel">
                        <!-- 产线运行状态 -->
                        <div class="right-top-card">
                            <UIComponents 
                                type="plate" 
                                variant="machine"
                                :custom-style="getComponentBorderStyle('status')"
                            >
                                <div class="card-content">
                                    <div class="card-header">
                                        <div class="card-title">产线运行状态</div>
                                        <UIComponents 
                                            type="animation" 
                                            :particle-count="6"
                                            :custom-style="{ 
                                                width: '60px', 
                                                height: '20px',
                                                marginLeft: '10px'
                                            }"
                                        />
                                        <UIComponents 
                                            type="selector" 
                                            :custom-style="{ 
                                                position: 'absolute', 
                                                right: '20px',
                                                top: '12px'
                                            }"
                                        >
                                            <span style="color: #73B1F9; font-size: 14px; font-family: 'myfont', sans-serif;">产线A</span>
                                        </UIComponents>
                                    </div>
                                    
                                    <div class="machine-status-compact">
                                        <!-- 机床状态网格显示 -->
                                        <div class="machines-grid">
                                            <div class="machine-item">
                                                <UIComponents 
                                                    type="machine-status" 
                                                    :is-running="dataEquipment.data.switches[0] === 1" 
                                                    :custom-style="{ marginBottom: '8px' }"
                                                />
                                                <div class="machine-label">1号机床</div>
                                                <div class="machine-status-text" :style="{color: getSwitchesColor(dataEquipment.data.switches[0])}">
                                                    {{dataEquipment.data.switches[0] == 0 ? '待机' : '运行中'}}
                                                </div>
                                            </div>
                                            
                                            <div class="machine-item">
                                                <UIComponents 
                                                    type="machine-status" 
                                                    :is-running="dataEquipment.data.switches[1] === 1" 
                                                    :custom-style="{ marginBottom: '8px' }"
                                                />
                                                <div class="machine-label">2号机床</div>
                                                <div class="machine-status-text" :style="{color: getSwitchesColor(dataEquipment.data.switches[1])}">
                                                    {{dataEquipment.data.switches[1] == 0 ? '待机' : '运行中'}}
                                                </div>
                                            </div>
                                            
                                            <div class="machine-item">
                                                <UIComponents 
                                                    type="machine-status" 
                                                    :is-running="dataEquipment.data.switches[2] === 1" 
                                                    :custom-style="{ marginBottom: '8px' }"
                                                />
                                                <div class="machine-label">3号机床</div>
                                                <div class="machine-status-text" :style="{color: getSwitchesColor(dataEquipment.data.switches[2])}">
                                                    {{dataEquipment.data.switches[2] == 0 ? '待机' : '运行中'}}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="efficiency-info">
                                            <div class="info-row">
                                                <span class="info-label">运行时长：</span>
                                                <span class="info-value">{{dataEquipment.data.machineInfo.runTime}}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">设备效率：</span>
                                                <span class="info-value">{{dataEquipment.data.machineInfo.efficiency}}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">负责人：</span>
                                                <span class="info-value">{{dataEquipment.data.machineInfo.operator}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </UIComponents>
                        </div>

                        <!-- 设备告警与出入库合并 -->
                        <div class="right-bottom-card">
                            <UIComponents 
                                type="plate" 
                                variant="combined"
                                :custom-style="getComponentBorderStyle('card')"
                            >
                                <div class="card-content">
                                    <div class="combined-tabs">
                                        <div class="tab-headers">
											<div class="tab-header" :class="{active: activeTab === 'storage'}" @click="switchTab('storage')">今日出入库</div>
                                            <div class="tab-header" :class="{active: activeTab === 'alert'}" @click="switchTab('alert')">设备告警</div>
                                            
                                        </div>
                                    </div>
                                    <!-- 今日出入库内容 -->
                                    <div v-show="activeTab === 'storage'" class="tab-content">
                                        <div class="storage-content-compact">
                                            <div class="storage-chart">
                                                <div id="deviceChart2" style="width: 150px; height: 150px;"></div>
                                                <div class="storage-total">
                                                    <span class="total-value">{{dataProduct.data.store4Today.in.total}}</span>
                                                    <span class="total-label">总入库量</span>
                                                </div>
                                            </div>
                                            
                                            <div class="storage-legend-compact">
                                                <div v-for="(key, index) in keys.slice(0, 4)" :key="index" class="legend-item">
                                                    <div class="legend-color" :style="{backgroundColor: ['#FFA200', '#3AA4D4', '#38EE44', '#8D38EE'][index]}"></div>
                                                    <span class="legend-label">{{key}}</span>
                                                    <span class="legend-value">{{dataProduct.data.store4Today.in.rate[key]}}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 设备告警内容 -->
                                    <div v-show="activeTab === 'alert'" class="tab-content">
                                        <div class="alert-table-compact">
                                            <div class="table-header">
                                                <div class="header-cell">故障原因</div>
                                                <div class="header-cell">级别</div>
                                                <div class="header-cell">时间</div>
                                            </div>
                                            
                                            <div class="table-content">
                                                <div 
                                                    v-for="(i, index) in dataEquipment.data.failureMap.MG400" 
                                                    :key="index"
                                                    v-show="index < 4"
                                                    class="table-row"
                                                >
                                                    <div class="table-cell">{{i.cause}}</div>
                                                    <div class="table-cell">
                                                        <UIComponents type="icon" icon-name="alarm" :icon-size="12" />
                                                        <span :class="getAlertLevelClass(i.level)">{{i.level}}</span>
                                                    </div>
                                                    <div class="table-cell">{{i.faultTime}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </UIComponents>
                        </div>
                    </div>
                </div>

                <!-- 底部统计区域 -->
                <div class="bottom-panel">
                    <!-- 产品产量统计 -->
                    <div class="bottom-left">
                        <UIComponents 
                            type="plate" 
                            variant="production"
                            :custom-style="getComponentBorderStyle('chart')"
                        >
                            <div class="card-content">
                                <div class="card-header">
                                    <div class="card-title">产品产量统计</div>
                                    <UIComponents 
                                        type="animation" 
                                        :particle-count="6"
                                        :custom-style="{ 
                                            width: '60px', 
                                            height: '20px',
                                            marginLeft: '10px'
                                        }"
                                    />
                                    <UIComponents 
                                        type="selector" 
                                        :custom-style="{ 
                                            position: 'absolute', 
                                            right: '20px',
                                            top: '12px'
                                        }"
                                    >
                                        <span style="color: #73B1F9; font-size: 16px; font-family: 'myfont', sans-serif;">电视</span>
                                    </UIComponents>
                                </div>
                                
                                <div class="production-content">
                                    <div id="deviceChart4" style="position:absolute; left: 30px; top: -10px; width:540px; height:312px;"></div>
                                    
                                    <div class="production-table">
                                        <div class="table-header">
                                            <div class="header-cell">计划产量</div>
                                            <div class="header-cell">完成产量</div>
                                            <div class="header-cell">完成率</div>
                                        </div>
                                        
                                        <div class="table-rows">
                                            <div v-for="(key, index) in keysForTypeModel.slice(0, 4)" :key="index" class="table-row">
                                                <div class="table-cell">{{dataProduct.data.productionByTypeAndModel.T9527[key] ? dataProduct.data.productionByTypeAndModel.T9527[key].planned : 0}}</div>
                                                <div class="table-cell">{{dataProduct.data.productionByTypeAndModel.T9527[key] ? dataProduct.data.productionByTypeAndModel.T9527[key].actual : 0}}</div>
                                                <div class="table-cell">{{dataProduct.data.productionByTypeAndModel.T9527[key] ? dataProduct.data.productionByTypeAndModel.T9527[key].rate : 0}}%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </UIComponents>
                    </div>

                    <!-- 年度产量总览 -->
                    <div class="bottom-right">
                        <UIComponents 
                            type="plate" 
                            variant="yearly"
                            :custom-style="getComponentBorderStyle('chart')"
                        >
                            <div class="card-content">
                                <div class="card-header">
                                    <div class="card-title">年度产量总览</div>
                                    <UIComponents 
                                        type="animation" 
                                        :particle-count="6"
                                        :custom-style="{ 
                                            width: '60px', 
                                            height: '20px',
                                            marginLeft: '10px'
                                        }"
                                    />
                                </div>
                                
                                <div class="yearly-content">
                                    <div id="deviceChart3" style="position:absolute; left: 30px; top: 0px; width:800px; height:260px;"></div>
                                    
                                    <div class="yearly-legend">
                                        <div class="legend-item">
                                            <div class="legend-color" style="background: #6CE0F8;"></div>
                                            <span class="legend-label">计划产量</span>
                                        </div>
                                        <div class="legend-item">
                                            <div class="legend-color" style="background: #2DDEB0;"></div>
                                            <span class="legend-label">实际产量</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </UIComponents>
                    </div>
                </div>
            </div>
        </ScaleScreen>
    </div>
</template>

<script>
	// 引入组件
	import VueGridLayout from 'vue-grid-layout'
	import ScaleScreen from '@/views/scale-screen.vue'
	import UIComponents from '@/components/UIComponents.vue'
	import ChartComponents from '@/components/ChartComponents.vue'
	import Utils from '../utils/Utils.ts'
	import DataOverviewData from '../utils/DataOverviewData.ts'
	import {
		Service,
		ServiceGet,
		ServiceDownload,
		ServiceUpload
	} from '@/api/Service.js';
	import Local from '@/store/localSave.js'
	import CrayonClock from './clock.vue'
	export default {
		components: {
			UIComponents,
			ChartComponents,
			ScaleScreen,
			GridLayout: VueGridLayout.GridLayout,
			GridItem: VueGridLayout.GridItem,
			CrayonClock,
		},
		methods: {
			switchTab(tab) {
            	this.activeTab = tab;
				// 切换到存储选项卡时重新渲染图表
				if (tab === 'storage') {
					this.$nextTick(() => {
						this.initStore4Today();
					});
				}
        	},
			async initWebSocket() {
				// 获取id 保存成功，初始化websocket
				console.log('Local.getId() =' + Local.getId())
				console.log('Local.getCity() =' + Local.getCity())
				if (Local.getId() !== null) {
					this.$websocket.initWebSocket();
					// 监听数据
					window.addEventListener("onmessageWS", this.getSocketData);
					this.cityValue = Local.getCity() + "  " + Local.getRegion()
				} else {
					this.cityValue = '请设置展区'
				}

			},

			getSocketData(res) {
				console.info(res)
				let data0 = JSON.parse(res.detail.data)
				// console.log('getSocketData1:', res.detail.data)
				// TODO 更新界面
				if (data0.type == "visitor") {
					console.log("getSocketData=visitor", res.detail.data);
					this.dataVisitor = data0
				}
				if (data0.type == "equipment") {
					console.log("getSocketData=equipment", res.detail.data);
					this.dataEquipment = data0
				}
				if (data0.type == "product") {
					console.log("getSocketData=product", res.detail.data);
					this.dataProduct = data0
					this.initStore4Today();
					this.initProductionByMonth();
					this.initProductionByTypeAndModel();
				}
			},

			initProductionByTypeAndModel() {
				this.keysForTypeModel = Object.keys(this.dataProduct.data.productionByTypeAndModel.T9527);
				const pathSymbols4 = {
					green: 'image://data:image/png;base64,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',
				};

				const labelSetting4 = {
					show: false,
					position: 'right',
					offset: [10, 0],
					fontSize: 16
				};
				let option4 = {
					textStyle: {
						fontFamily: 'myfont'
					},
					title: {
						text: '',
						textStyle: {
							fontFamily: 'myfont'
						}
					},

					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						containLabel: true,
						left: 0
					},
					yAxis: {
						data: [
							// 'X50', 'X50-PRO', 'X60', 'X60-PRO'
						],
						inverse: true,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							margin: 30,
							fontSize: 14,
							fontFamily: 'myfont'
						},
						axisPointer: {
							label: {
								show: true,
								margin: 30
							}
						}
					},
					xAxis: {
						splitLine: {
							show: false
						},
						axisLabel: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						}
					},
					series: [{
							name: '',
							type: 'pictorialBar',
							label: labelSetting4,
							symbolRepeat: false,
							symbolSize: ['100%', '50%'],
							barCategoryGap: '40%',
							symbol: 'rgba(180, 180, 180, 1)',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(180, 180, 180, 0.5)'
							},
							data: []
						},
						{
							name: '',
							type: 'pictorialBar',
							label: labelSetting4,
							symbolRepeat: false,
							symbolSize: ['80%', '50%'],
							barCategoryGap: '40%',
							symbol: pathSymbols4.green,
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(180, 180, 180, 0.5)'
							},
							data: [
								// 12, 24, 48, 49
							]
						}
					]
				};
				for (let i = 0; i < 4; i++) {
					if (i < this.keysForTypeModel.length) {
						option4.yAxis.data.push(this.keysForTypeModel[i])
						option4.series[0].data.push({
							value: 100,
							itemStyle: {
								color: '#FFFFFF',
								opacity: '0.1'
							}
						})
						option4.series[1].data.push(this.dataProduct.data.productionByTypeAndModel.T9527[this
							.keysForTypeModel[i]].rate)
					} else {
						option4.yAxis.data.push('')
						option4.series[0].data.push({
							value: 100,
							itemStyle: {
								color: '#FFFFFF',
								opacity: '0.1'
							}
						})
						option4.series[1].data.push(0)
					}
				}

				this.$echarts.init(document.getElementById('deviceChart4'), null, {
					devicePixelRatio: 2
				}).setOption(option4);
			},

			initStore4Today() {
				console.log("initStore4Today");
				
				
				// this.dataProduct.data.store4Today.in.rate = {"X60-PRO": "100.00", "X60-PRO2": "10.00"}
				const chartElement = document.getElementById('deviceChart2');
				if (!chartElement) {
					console.error('deviceChart2 element not found');
					// 延迟重试
					setTimeout(() => {
						this.initStore4Today();
					}, 500);
					return;
				}

				this.keys = Object.keys(this.dataProduct.data.store4Today.in.rate);
				let option2 = {
					color: ['#FFA200', '#3AA4D4', '#38EE44', '#8D38EE'],
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						padAngle: 5,
						itemStyle: {
							borderRadius: 5,
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: false,
								fontSize: 40,
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: []
					}]
				};
				for (let i = 0; i < this.keys.length; i++) {
					option2.series[0].data.push({
						value: this.dataProduct.data.store4Today.in.rate[this.keys[i]],
						name: this.keys[i]
					})
				}
				console.log("option2==", option2)
				// 销毁可能存在的图表实例
				const existingChart = this.$echarts.getInstanceByDom(chartElement);
				if (existingChart) {
					existingChart.dispose();
				}
				// 创建新的图表实例
				const chart = this.$echarts.init(chartElement, null, {
					devicePixelRatio: 1
				});
				
				chart.setOption(option2);
				
				// 保存图表实例以便后续使用
				this.storageChart = chart;
			},


			initProductionByMonth() {

				const pathSymbols = {
					green: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAB9CAYAAACickOfAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAA8TSURBVGhDlVoJaCTZeX7vVVVXdbdmRjP27upaOyQbGxLihDiBgCFxIGAIhEDAEAgYDCEbTIyJwWAwxg6EBAJ2YHXu2sRJ1vEmhhAwxGQ9h66RNJqZ1YyOlrQz0pwr7Ryyjlarrzqev/9Vvarqa9SpYeft66r+63vf//3Hez2cdbi+sLs8tucVX5eMi07PpD//aN2pPlsr/JA3P/ylZ/f7ntT2fnTX3fnDbgzRM/17XD6cmpGV6sm/Nxj8652tz2z7O//yxDv4RDfGJJOs70E1eHzjuqzUyoxzkRj8myfbf3uruvXNYlA5342xjC9Y78ZesHX7RsBgmDFgk8Hb/AcHsneysvIPt6r3/gofGt0Y66nhsaVt78N7m1LCFidbZJOxt/mnlt/5Kf7/Y7T28LPw6jyXhrh295ePnn6I5zUyuA5WpeRv85dm3zhhPs+qV+hXvWCUQrL87Ead+TASgUheHhosMZdlGYkDbJw2Soux3MxGjdOzrSD+gwweMw8IU/AV0mhOJNFy4rkhWW4WBhVCWiatLOYJBq++UVQIu7wk/BEaTH8hXBpngUJ4RBzGSDpwqe8Th7nZzRr3YCTFNd0XgpHB4UPA7xphAIR54hBLbrkk+xEhPOCaQ+X6kJuYM3AZz3E/UF7erDEgDKWiJaPG2KDzAuE1CFOajGWnN6oiSBBGaiSvv0NL3gfBTtObmt+czJWXN6sKIXmZVhAhhfLe4S9fHf4585jTpZMZeTk7vV7lhFBDiyGy/+QvzwzvQfWO+izmUOtKcxp9N+GwyvwIoVYFrAvJYXB25Dngg0OKcB3EOgw17mQecgiE7bzMCeHs8DPoEByS13Q0CXDWYU7CntmsNuuQwlBy9l/gcOQp86Sd5Jd0zm0mCV8yGc9NKQ5bhAjH/pic8oT5zA6p0LrSSFvnAZcc2Ya8LFt1KGBwduRD6UtbqAQQXvTycB4iTOa4B+aJQ+gwRpjokJHB4V2koghhe78o05FffLwpP1MAQqTT1kj5CXG4wyMOlUi1WFNjOgyZybkzWagKENacR/Ded5G+Rj4QMYeEhLxLXtbJpHHuCymQHMrcB4dRPlRIw4j5GX95buQxc6UdfxgzlyT22GHEqcGFM1UoKw6bihBIuEgIHymE8XK1gNovPxAMCAtl4rC5BgHURf7K3MhDSQibCk6nOTgUWSBEpLTqkLGLtOQH3Et5uTG/pbJOyCkSrMhNwyB0SG2P5hxFnrgHwvnR+9INYoRaix3rssENIDxByovSTcM3FML7uJnRmTqd35rzHc0hbCM3s14iDkn8WvQ0gsNL/JWrI/ekxzI6Y6faCvXqeK4hG8xwZgolAxymva9uB/wyxfK28Hkm/abmN6fn0KGRnwZCLDl8GeVFcBmu/DK8PLyFQp9pztjNHMaZEQjBYUkE5K+Uo2EdGQgI50buQochh62x2VJbfHg5P1k4CWO5uRvBkuHlO6wuM6f1NPo+ehsjO7lW4j5vKSqcE8Krw+9zX2DJ6V4lfLVGrHsd8jJxmJspHEO7qv1KlRQ8JidpyZu42cJhpyqIqkccHoOmFIFR3mRskkJvA/AVh1ojDciakKK3MbLThLAdh2KS982PrCsdqlSN/9KbiHZzixv2ZOFY6bA1oQDh/HCBuSGHYeMdIW3mVPeLxCEQopYnGTtKLNCrWvIaJACDL9rfJFAVh5OrxwLVKikqOgkHUyTsVeXlDn1h8+cqlqfWi+gcJFIjWArwN0ZEDBY4jSWPrKCdi7ycNCntvSyRvpBtJgvFdvkQylQGl7mrZZPU4dBgVCti65RtAiM7s1EUbpgPKQ+mRhhcGLnN62SwXccQR3DoMBKCCEz0h0eiTcaG32BwbvQW4EOHXW1TGHxhYltxxICwJfYZnwkNBgw9VXdVBQat3FThiDJ2K+PBDO+bG11CbjOTtkhXO01Nak56E4GFJR+GvU1SUygvov2eRaSMvodIQT+Q7AAbU3XSbIYtm7ScqfVDAxmZ1KkuoBFUwBgZXBi9CdmYpCOBN546Ml8hjDuHdPvChUJ4Q2LJ6a2efnG7rR8jhJOFQ8rYDT22AiqvUoK9LoBQBTpwS5KX1l+beQCEztTGoUCktIn9q1jy2CJ6G3AYRXg0xOk9NSdEgSGt7JUC7b5aOge8AAgXRq8phF3WlICTl9cPlA71CvTI2Rzvuza2oBBqJKeMSLAWYvmAMnZzugSmOeJw/v/FISGcChEKIAtApR6hyznevzA2J13SYXwQ0SzDxrkpLfvK2kGYsZMrapvnweHYVQFhd8uhJKdgyW05ZHye918bmyWE7fNfm08NZtmXVw/iDjZFPvLhPIQ9NoMUYoIMcIFIwahPMuI5Po/vg0MIGzvYdjoUC0A4Po3OAfujtHtTe70m90uLm87llQNkKKTv1Aoo1zK2QMKe0jrsqi6bEgbXDijbtHRpgl8jhJOkwzhtnJK5oVjLuby6L1DoW3TI2TUq9JOoeuGZl94yaaNKSvrMIbyPzQk4XNtPOodkHwOqYXBh9BL6Q9JmcjWlYqJf30ftzGSurB4aaJbSGxWVUDgteX70XR4I2ml11R+iSGWgQ9QU9Nih8+m8RkUME8Yi718c/194OXXM13GHErICHWYmV0tIypR7YompmwG/zgcWx34iXTwWvUpiBAHpV2sIaqTuy7myViWnhE1oyjWckcGJ/wnqgXFa06XvQ4eGfXGlTr1NU5En49cp9P4b8NH5vHgXqu8jwZIOPcVhWJhCoEShAMLBxYkfB3WIodvLkmbm4mpgqLrceKyFlIslXxt7BwdBkcEwlimG9bvDuX4b7htoRa6syRChrpIRQslvgsPxH0ogTNdlJcNUgmyYm9zMXF7hBrychHLU0nF5E7IZ+zfhpvo83e91GrFk59KaqTI2caiLvOIQCAevjf5Aujgh0xJI1tfmTBYpJmOY9sXljJJNXJijTEAIBxZHv48eO8zm7WK3KZbRwVrOlVVbgEPqC8NOI0p9CuGN8Ymg1r75b+4c6J3YSVmZn604Sof6iptOucQHrk+MooMNO4a4IY06iDZz7OgtcJhT3VfzkQznS3zoxsQb0GGbLqCDMIHQenf1DLorwhB2XdEIK0t88PrEPyN9IYSTmqJrSbvRN1CXL66dUxk7dYxFFQFSg8HFie/gzIFOT9QWIS5Qaq6vSGf4RGaEZf/fyvmG/jB6DKkDHN4Y+yeGUE8ltqT6tck6UvgZ59L6Be75LR0seh0YvDn+j7zaUL9eGNXSlJnMpcKFcBeQNNJqCyKD2ySbv+cuqmyceTWXOg02zrFfztiXYZC8HHVdKc8s86GbY38XVNFL6XyQ5IEwUprmOIPKQIcXDDTbcWFWex8l8hWKlG9xz/RiDrVjNOSmubRlxrq0fl5xSBk8yvBq5MYqLfkb4NBnqCoBfoFQBZV+iegwZ1lOBnvTJ5xxwDC5hkh58+tIRZ4PJDjwgK0Xj57l25mpzXPUEiupRflSscPZOh96782vyUrgMaoqETI69FZzfek57kuH2eaV9XOq7iYyVfLFee86H1ya+Cqv0Kl0It44QtL74ei+l/Fte/buWebiZLxFp3yTD9166ytBBXspuoDAAHcx0JBKNdf38VOOzac3z5qSY7EpEAQxCN6HsMe+zKsC+SZ0SEDLi44L2s09w7fN+a0z6HpVsYlrEHFpiDswOPEl4WLH3OWFXw1sMX3nDFJyWqXq29ihbpFsXhe+Wfd9KIeWq5ZtYGw/d03umPN3e6ALdEQJQkKK721RpPylrIvuEdrcEfN38kaYmhovKbb5wHtjXxR1E78khh4JkcVQW+auGTjWje0csnwQcoyoxfNRUNzng8vf+4IseXUcx8CbFDDJqP0bej38nDuGwxbuZnGcnSCMwKC0PIBsxv9C1MyaRnba6Fq+Y1x/mCU5NIOAox7xV5ff+nN5wlD3IiEq5XW6EJiO6bDF7Ww7DpH2H/HBW29+XlQ5ECL6DBOcvXisG27WXN6xuUteprYSHEYjtvGP+dDtiT+TJzxCeLoY/azMiqVHmbZe9uQOH7g18aeiwoAwDDsdd53mvg2Dt3ctFngtHJpS7PKB5Yk/YWVRoY0KBfRpI8sFWbn0gWVSnmu6UKqf8L5bI39s1KwKWTNNk3ketqawiiGe67fQ/ZodZMWtB0DIAhNL8mgp0WUY4gl/9fb459gJr5zOXviElxdZefuBafpmjNADGhN/fC6e8oGVt/7IPBEVz8Ue17LYaWPV9HLGnV2BdBIkKwlXhBP353xo43ufZYdBCiF+hMdP4ow1jxHCrJmTaw9FOw5x0r7H+1cmft+sWGUGhGiDYoSd5lXLzRmFJ4L7bhCvCC/HtoBZprXHB9a+/xlWdMtoqmIaXbqJPwnOcE6Xe5bl3JXH3PLVvyNovAy2zwfXx34vU7TKbh1fysDIKWM56+bYxj7jNQ8cQhWRQ0J1GAf81fff+l3+nJW79XK9l+W8zV1peRYQNnLtVytHvH995Ledk+xJrVZjtm2zZGSYs9Q8vH+cqeT5vb0AQgsyWFEdK9Kj4HaRD74/8Zv85+ZJ1wjPenl3fSewFcLGCxuhIn9lZfg3nIpTqlarzHEchgEjazOG94sOpL295+MHiYDOqql2qBHpxbF5iffdnfg1BExJv4t+rIdN9aN9etT3Za/In6w89JycHagsClr0KF3/hH90c+yTzj4MQtq5bI6VK/AP/TOKDvP9XC3v3nkKMUI2QFzBkrLR6wNuV/irj/71V2q7bimfooMI7TQv9xv5YuFR/SP+WVmBOLIsh3eHo3SrVd734fgvnd05VyodH7OeM2fYaeOzC+W8eedpnRdd/JOMHGMnZZbHeILxzHmnwgd23/yYue0fd+vlUr/sqd85qp71M+i+iPoe9dWyZ3iHy0dF/pHH44Pnd84c7+/vswsXLrDTxt3egx7reanC92qyt/ccOzw8YnYu7z793NcoOCR/6dlon/XILDI2gPluCmj7eXEo6Ckt3q+8dPbjqj/MP3juPfjit0kQ6gKHb7zUU3qtuHV3i732q68xhpFh1PPm8Wn2Xs/xo3qZ1Yry02f6/fd+53XVucUGh46+e+GDpWLxs+wP2BSbZqeNvb/18Z7Diz8ts8//Og4Wvt3agQ2VvzsYZPM1Bi8zePm0UVRO7A9yX93p5MRfABDR2zGPnW68AAAAAElFTkSuQmCC',
					blue: 'image://data:image/png;base64,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'
				};
				const labelSetting = {
					show: false,
					position: 'right',
					offset: [10, 0],
					fontSize: 16
				};
				let option3 = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						containLabel: true,
						left: 0
					},
					xAxis: {
						data: [
							'1月',
							'2月',
							'3月',
							'4月',
							'5月',
							'6月',
							'7月',
							'8月',
							'9月',
							'10月',
							'11月',
							'12月'
						],
						inverse: false,
						axisLine: {
							show: false,
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							margin: 30,
							fontSize: 14
						},
						axisPointer: {
							label: {
								show: true,
								margin: 30
							}
						},
						axisLabel: {
							show: true
						},
						axisLine: {
							show: true
						}
					},
					yAxis: {
						name: '件       ',
						fontSize: 12,
						splitLine: {
							show: true,
							lineStyle: {
								// 修改为需要的颜色
								color: '#707070'
							}
						},
						axisLabel: {
							show: true
						}
					},
					series: [{
							name: '计划产量',
							type: 'pictorialBar',
							label: labelSetting,
							symbolRepeat: false,
							symbolSize: ['100%', '100%'],
							barCategoryGap: '50%',
							symbol: pathSymbols.blue,
							data: [
								this.dataProduct.data.productionByMonth['01'].planned,
								this.dataProduct.data.productionByMonth['02'].planned,
								this.dataProduct.data.productionByMonth['03'].planned,
								this.dataProduct.data.productionByMonth['04'].planned,
								this.dataProduct.data.productionByMonth['05'].planned,
								this.dataProduct.data.productionByMonth['06'].planned,
								this.dataProduct.data.productionByMonth['07'].planned,
								this.dataProduct.data.productionByMonth['08'].planned,
								this.dataProduct.data.productionByMonth['09'].planned,
								this.dataProduct.data.productionByMonth['10'].planned,
								this.dataProduct.data.productionByMonth['11'].planned,
								this.dataProduct.data.productionByMonth['12'].planned
							]
						},
						{
							name: '实际产量',
							type: 'pictorialBar',
							barGap: '0%',
							label: labelSetting,
							symbolRepeat: false,
							symbolSize: ['100%', '100%'],
							symbol: pathSymbols.green,
							data: [this.dataProduct.data.productionByMonth['01'].actual,
								this.dataProduct.data.productionByMonth['02'].actual,
								this.dataProduct.data.productionByMonth['03'].actual,
								this.dataProduct.data.productionByMonth['04'].actual,
								this.dataProduct.data.productionByMonth['05'].actual,
								this.dataProduct.data.productionByMonth['06'].actual,
								this.dataProduct.data.productionByMonth['07'].actual,
								this.dataProduct.data.productionByMonth['08'].actual,
								this.dataProduct.data.productionByMonth['09'].actual,
								this.dataProduct.data.productionByMonth['10'].actual,
								this.dataProduct.data.productionByMonth['11'].actual,
								this.dataProduct.data.productionByMonth['12'].actual
							]
						}
					]
				};
				this.$echarts.init(document.getElementById('deviceChart3'), null, {
					devicePixelRatio: 2
				}).setOption(option3);


			},
			checkPercentF(num) {
				if (num == 0) {
					num = '00'
				} else if (num < 10) {
					num = num + '0'
				}
				return num;
			},

			// 配置
			SetClick() {
				console.log('SetClick')
				this.$router.push({
					path: '/setting',
				});
			},

			getSwitchesColor(i) {
				if (i == 0) {
					return '#E67E15';
				}
				return '#38D9EE';
			},

			getColor(i) {
				if (i == '紧急') {
					return '#FF4E00'
				}
				return '#2777BB';
			},

			// 获取告警级别的CSS类
			getAlertLevelClass(level) {
				switch(level) {
					case '紧急':
						return 'alert-emergency';
					case '警告':
						return 'alert-warning';
					case '一般':
						return 'alert-normal';
					default:
						return 'alert-info';
				}
			},

			// 动态边框样式生成方法
			getDynamicBorderStyle(componentType = 'default', customConfig = {}) {
				const { borderWidth, sliceWidth, borderImages } = this.borderConfig;
				const config = { ...this.borderConfig, ...customConfig };
				
				// 选择对应类型的边框图片
				const borderImagePath = borderImages[componentType] || borderImages.default;
				
				return {
					position: 'relative',
					width: '100%',
					height: '100%',
					borderImageSource: `url(${require('@/assets/myfonts/框.png')})`,
					borderImageSlice: `${config.sliceWidth} fill`,
					borderImageWidth: `${config.borderWidth}px`,
					borderImageRepeat: 'stretch',
					borderStyle: 'solid',
					borderWidth: `${config.borderWidth}px`,
					background: 'linear-gradient(135deg, rgba(0, 20, 40, 0.4) 0%, rgba(0, 30, 60, 0.5) 50%, rgba(0, 20, 40, 0.4) 100%)', // 增加渐变和透明度
					backdropFilter: 'blur(15px) saturate(1.2)', // 增强背景模糊和饱和度
					border: '1px solid rgba(255, 255, 255, 0.08)', // 添加细微边框
					boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.3)', // 内外阴影增强立体感
					padding: `${config.borderWidth}px`,
					boxSizing: 'border-box',
					// 添加类名用于CSS样式
					className: 'dynamic-border'
				};
			},

			// 获取不同类型组件的边框样式
			getComponentBorderStyle(componentType = 'card', customOptions = {}) {
				const baseStyle = this.getDynamicBorderStyle(componentType, customOptions);
				
				switch(componentType) {
					case 'card':
						return {
							...baseStyle,
							height: '100%',
							borderRadius: '8px',
							background: 'transparent'
						};
					case 'chart':
						return {
							...baseStyle,
							height: '350px',
							borderRadius: '12px',
							background: 'transparent'
						};
					case 'status':
						return {
							...baseStyle,
							height: '100%',
							borderRadius: '6px',
							background: 'transparent'
						};
					default:
						return {
							...baseStyle,
							background: 'transparent'
						};
				}
			},

			// 响应式边框调整方法
			adjustBorderForSize(elementRef, componentType = 'card') {
				if (!elementRef) return;
				
				this.$nextTick(() => {
					const element = this.$refs[elementRef];
					if (element) {
						const rect = element.getBoundingClientRect();
						const scaleFactor = Math.min(rect.width / 300, rect.height / 200);
						const adjustedBorderWidth = Math.max(10, this.borderConfig.borderWidth * scaleFactor);
						const adjustedSliceWidth = Math.max(20, this.borderConfig.sliceWidth * scaleFactor);
						
						// 动态更新边框样式
						element.style.borderImageWidth = `${adjustedBorderWidth}px`;
						element.style.borderImageSlice = `${adjustedSliceWidth} fill`;
						element.style.padding = `${adjustedBorderWidth}px`;
					}
				});
			},

			// 调整所有组件的边框
			adjustAllBorders() {
				this.$nextTick(() => {
					// 获取所有使用动态边框的元素
					const borderElements = this.$el.querySelectorAll('.dynamic-border');
					borderElements.forEach(element => {
						const rect = element.getBoundingClientRect();
						if (rect.width > 0 && rect.height > 0) {
							// 根据元素尺寸调整边框
							const scaleFactor = Math.min(rect.width / 300, rect.height / 200);
							const adjustedBorderWidth = Math.max(8, this.borderConfig.borderWidth * scaleFactor);
							const adjustedSliceWidth = Math.max(15, this.borderConfig.sliceWidth * scaleFactor);
							
							element.style.borderImageWidth = `${adjustedBorderWidth}px`;
							element.style.borderImageSlice = `${adjustedSliceWidth} fill`;
							element.style.padding = `${adjustedBorderWidth}px`;
						}
					});
				});
			},

		},

		mounted() {
			// 设置ECharts全局默认字体
			if (this.$echarts) {
				this.$echarts.registerTheme('customTheme', {
					textStyle: {
						fontFamily: 'myfont'
					}
				});
			}
			
			this.initWebSocket();
			var that = this;
			window.onresize = () => {
				return (() => {
					window.fullHeight = document.documentElement.clientHeight;
					window.fullWidth = document.documentElement.clientWidth;
					that.windowHeight = window.fullHeight; //获取屏幕高度
					that.windowWidth = window.fullWidth; //获取屏幕宽度
					// that.$refs.grid.$forceUpdate();
					that.rowHeight = window.fullWidth
					// 窗口大小改变时重新调整图表
					if (that.storageChart) {
						that.storageChart.resize();
					}
					// 窗口大小改变时调整边框
					that.adjustAllBorders();
				})()
			};
			const gaugeData = [{
				value: 85,
				detail: {
					show: false,
					valueAnimation: true,
					offsetCenter: ['0%', '-20%']
				}
			}]
			let deviceOption = {
				series: [{
					type: 'gauge',
					startAngle: 90,
					endAngle: -270,
					pointer: {
						show: false
					},
					progress: {
						show: true,
						overlap: false,
						roundCap: true,
						clip: false,
						itemStyle: {
							color: '#38D9EE',
							borderWidth: 1,
							borderColor: '#38D9EE'
						}
					},
					axisLine: {
						show: false,
						lineStyle: {
							width: 10
						}
					},
					splitLine: {
						show: false,
						distance: 0,
						length: 10
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false,
						distance: 50
					},
					data: gaugeData
				}]
			}

			this.$echarts.init(document.getElementById('deviceChart'), null, {
				devicePixelRatio: 1
			}).setOption(deviceOption);

			// 添加测试调用 - 延迟1秒确保DOM已渲染
			setTimeout(() => {
				console.log("开始初始化所有图表");
				
				// 只有在存储选项卡激活时才初始化出入库图表
				if (this.activeTab === 'storage') {
					this.initStore4Today();
				}
				
				// 初始化年度产量总览图表
				this.initProductionByMonth();
				
				// 初始化产品产量统计图表
				this.initProductionByTypeAndModel();
				
				console.log("所有图表初始化完成");
				
				// 初始化所有边框
				this.adjustAllBorders();
			}, 1000);

		},

		watch: {
			windowHeight(val) {
				let that = this;
				console.log("实时屏幕高度：", val, that.windowHeight);
			},
			windowWidth(val) {
				let that = this;
				console.log("实时屏幕宽度：", val, that.windowHeight);
			}
		},
		destroyed() {
			// close
			this.$websocket.close();
		},
		data() {
			return {
				activeTab: 'storage', // 添加选项卡状态
				storageChart: null, // 保存图表实例
				// 边框配置
				borderConfig: {
					borderImage: '../assets/myfonts/框.png', // 边框图片路径
					borderWidth: 15, // 边框宽度
					cornerRadius: 10, // 圆角半径
					sliceWidth: 30, // 九宫格切片宽度
					// 不同类型组件可以使用不同的边框图片
					borderImages: {
						default: '../assets/myfonts/框.png',
						card: '../assets/myfonts/框.png',
						chart: '../assets/myfonts/框.png',
						status: '../assets/myfonts/框.png'
					}
				},
				tableData: [],
				cityValue: '',
				dataVisitor: {
					data: {
						today: {
							visitor: 167,
							employee: 89
						},
						last3Hours: 0,
						thisYear: {
							visitor: 0,
							employee: 0
						}
					},
					groupId: 1,
					type: "visitor"
				},
				dataEquipment: {
					"data": {
						"failureMap": {
							"MG400": [
								{
									"cause": "机械臂传感器异常",
									"level": "紧急",
									"faultTime": "08:30:15"
								},
								{
									"cause": "温度传感器超限",
									"level": "警告",
									"faultTime": "07:45:22"
								},
								{
									"cause": "液压系统压力不足",
									"level": "紧急",
									"faultTime": "06:20:08"
								},
								{
									"cause": "电机过载保护",
									"level": "一般",
									"faultTime": "05:15:33"
								},
								{
									"cause": "通信连接中断",
									"level": "警告",
									"faultTime": "04:50:17"
								}
							]
						},
						"switches": [1, 1, 1, 1],
						"machineInfo": {
							// "efficiency": "0.00%",
							// "runTime": "00:00:00",
							// "waitTime": "00:00:00",
							// "operator": "无",
							// "qualityRate": "0.00%"
							"efficiency": "87.5%",
							"runTime": "07:25:30",
							"waitTime": "01:15:20",
							"operator": "张工程师",
							"qualityRate": "93.4%"
						}
					},
					"groupId": 1,
					"type": "equipment"
				},
				keys: [],
				keysForTypeModel: [],
				dataProduct: {
					"data": {
						"store4Today": { //今日出入库
							"in": { //入库
								"total": 1250, //总数
								"rate": {
									"X60-PRO": "35.50", //各型号占比
									"X50-PRO": "28.20", //各型号占比
									"X50": "22.10", //各型号占比
									"X60": "14.20" //各型号占比
								}
							},
							"out": {
								"total": 0,
								"rate": {
									"X50": "100.00",
									"X60-PRO": "50.00"
								}
							}
						},
						"productionByTypeAndModel": { // 产品产量统计
							"T9527": { //产品类型
								"X50": { //产品型号
									"actual": 557, //实际产量
									"rate": 89, //完成率
									"planned": 625 //计划产量
								},
								"X60": {
									"actual": 623,
									"rate": 95,
									"planned": 656
								},
								"X50-PRO": {
									"actual": 445,
									"rate": 85,
									"planned": 523
								},
								"X60-PRO": {
									"actual": 789,
									"rate": 92,
									"planned": 858
								}
							}
						},
						"productionByMonth": { // 年度产量总览
							"01": {
								"actual": 189,
								"planned": 200
							},
							"02": {
								"actual": 199,
								"planned": 210
							},
							"03": {
								"actual": 169,
								"planned": 190
							},
							"04": {
								"actual": 298,
								"planned": 321
							},
							"05": {
								"actual": 142,
								"planned": 150
							},
							"06": {
								"actual": 195,
								"planned": 200
							},
							"07": {
								"actual": 235,
								"planned": 250
							},
							"08": {
								"actual": 465,
								"planned": 500
							},
							"09": {
								"actual": 178,
								"planned": 200
							},
							"10": {
								"actual": 189,
								"planned": 200
							},
							"11": {
								"actual": 186,
								"planned": 200
							},
							"12": {
								"actual": 176,
								"planned": 200
							}
						},
						"materialCompletionRate": { // 材料齐套率
							// "m1": "0", //配件1 数量
							// "m2": "0", //配件2 数量
							// "rate": "0", // 齐套率
							// "m3": "0",
							// "m4": "0",
							
							"m1": "1250", //配件1 数量
							"m2": "1180", //配件2 数量
							"rate": "85.6", // 齐套率
							"m3": "1095",
							"m4": "1156"
						},
						"qualityPassRate": { //质量通过率
							// "countPass": 0, // 通过数量
							// "rate": 0, //通过率
							// "countTotal": 0 //受检量
													
							"countPass": 1168, // 通过数量
							"rate": 93.4, //通过率
							"countTotal": 1250 //受检量
						}
					},
					"groupId": 1,
					"type": "product" // // 数据类型：产量数据
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.custom-header {
        position: relative;
        width: 100%;
        height: 120px; // 减少标题栏高度从120px到80px
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        
        .header-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            
            .header-image {
                width: 100%;
                height: 100%;
                object-fit: cover; // 或者使用 contain，根据您的图片需求
                object-position: center;
            }
        }
        
        .location-section {
            flex: 0 0 auto;
            
            .location-display {
                display: flex;
                align-items: center;
                background: linear-gradient(135deg, rgba(255, 67, 67, 0.15) 0%, rgba(255, 99, 71, 0.1) 100%);
                padding: 12px 20px;
                border-radius: 25px;
                border: 1px solid rgba(255, 67, 67, 0.3);
                backdrop-filter: blur(10px);
                box-shadow: 0 4px 15px rgba(255, 67, 67, 0.2);
                transition: all 0.3s ease;
                
                &:hover {
                    background: linear-gradient(135deg, rgba(255, 67, 67, 0.2) 0%, rgba(255, 99, 71, 0.15) 100%);
                    box-shadow: 0 6px 20px rgba(255, 67, 67, 0.3);
                    transform: scale(1.02);
                }
                
                .location-text {
                    display: flex;
                    flex-direction: column;
                    margin-left: 8px;
                    margin-right: 15px;
                    
                    .location-label {
                        font-size: 11px;
                        color: rgba(255, 255, 255, 0.7);
                        margin-bottom: 2px;
                        font-weight: 300;
                    }
                    
                    .location-value {
                        font-size: 14px;
                        color: white;
                        font-weight: 500;
                        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                    }
                }
                
                .setting-btn {
                    padding: 8px 16px;
                    border-radius: 20px;
                    background: linear-gradient(135deg, #2777BB 0%, #1e5f9f 100%);
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(39, 119, 187, 0.3);
                    
                    &:hover {
                        background: linear-gradient(135deg, #3188CC 0%, #2570B0 100%);
                        box-shadow: 0 4px 12px rgba(39, 119, 187, 0.4);
                        transform: translateY(-1px);
                    }
                    
                    &:active {
                        transform: translateY(0);
                    }
                }
            }
        }
        
        .clock-section {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
			min-width: 400px;
			// // 为时钟添加背景，使其更加突出
            // padding: 10px 20px;
            // background: rgba(0, 0, 0, 0.3);
            // border-radius: 15px;
            // backdrop-filter: blur(10px);
            // border: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
	.right-top-card {
        height: 44%; //
        min-height: 220px; // 从260px调整为240px
    }
    
    .right-bottom-card {
        height: 43%; // 从45%调整为43%，为间距让出空间
        min-height: 200px; // 从220px调整为200px
    }
	.root {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 10;
		font-family: 'myfont', sans-serif; // 全局字体设置
	}

	.divroot {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-family: 'myfont', sans-serif; // 全局字体设置
		
		// 确保所有文本元素都继承字体
		*, *::before, *::after {
			font-family: inherit;
		}
		
		// 强制常见文本元素使用统一字体
		span, div, p, h1, h2, h3, h4, h5, h6, label, input, button, text {
			font-family: 'myfont', sans-serif !important;
		}
		
		// 确保所有可能的文本类都使用统一字体
		.card-title, .section-title, .stat-label, .stat-value, .stat-unit,
		.machine-label, .machine-status-text, .info-label, .info-value,
		.legend-label, .legend-value, .tab-header, .table-cell, .header-cell,
		.rate-value, .rate-unit, .total-value, .total-label {
			font-family: 'myfont', sans-serif !important;
		}
	}
	
	// 动态边框样式
	.dynamic-border {
		position: relative;
		border-image-slice: 30 fill;
		border-image-repeat: stretch;
		border-style: solid;
		
		// 如果边框图片加载失败的后备方案
		&:after {
			content: '';
			position: absolute;
			top: -2px;
			left: -2px;
			right: -2px;
			bottom: -2px;
			border: 2px solid rgba(255, 255, 255, 0.1);
			border-radius: inherit;
			z-index: -1;
			opacity: 0;
			transition: opacity 0.3s ease;
		}
		
		// 当border-image不支持时显示后备边框
		&:not([style*="border-image-source"]):after {
			opacity: 1;
		}
	}
	
	// 边框容器样式
	.custom-border-container {
		position: relative;
		
		// 为不同类型的组件设置默认尺寸
		&.card-container {
			min-height: 200px;
		}
		
		&.chart-container {
			min-height: 350px;
		}
		
		&.status-container {
			min-height: 150px;
		}
	}
	
	// 背景视频样式
	.background-video {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
		opacity: 1.0; // 调整视频透明度
	}
	// 渐变蒙版遮罩
    .gradient-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        pointer-events: none; // 确保不会阻挡交互
        background: 
            // 左侧渐变 - 从左边缘到30%位置
            linear-gradient(
                to right, 
                rgba(0, 40, 85, 0.9) 0%,
                rgba(0, 60, 120, 0.7) 15%, 
                rgba(0, 80, 160, 0.4) 25%,
                transparent 30%
            ),
            // 右侧渐变 - 从70%位置到右边缘
            linear-gradient(
                to left, 
                rgba(0, 40, 85, 0.9) 0%,
                rgba(0, 60, 120, 0.7) 15%, 
                rgba(0, 80, 160, 0.4) 25%,
                transparent 30%
            ),
            // 底部渐变 - 从底部向上
            linear-gradient(
                to top, 
                rgba(0, 40, 85, 0.8) 0%,
                rgba(0, 60, 120, 0.6) 20%, 
                rgba(0, 80, 160, 0.3) 40%,
                transparent 60%
            ),
            // 顶部轻微渐变 - 为标题栏提供更好的背景
            linear-gradient(
                to bottom, 
                rgba(0, 30, 65, 0.85) 0%, // 加深颜色，提高透明度
                rgba(0, 45, 95, 0.65) 15%, // 加深颜色，提高透明度
                rgba(0, 60, 120, 0.4) 25%,
                transparent 35%
            );
    }
	// 主布局
	.main-layout {
		display: flex;
		width: 100%;
		height: calc(100vh - 110px); // 减少为标题栏和底部留出的空间
		margin-top: 10px; // 大幅减少顶部边距
		margin-bottom: 30px;
		gap: 0;
		position: relative;
		z-index: 10;
	}

	.left-panel {
		width: 30%;
		height: 100%;
		padding: 0 10px 0 0;
	}

	.center-video-area {
		width: 40%;
		height: 100%;
		// 完全透明，让背景视频显示
		padding: 0 10px; // 减少左右内边距
	}

	.right-panel {
		width: 30%;
		height: 100%;
		padding: 0 0 0 10px; // 减少左右内边距
		display: flex;
		flex-direction: column;
		gap: 100px; // 添加组件间距
	}

	// 底部面板
	.bottom-panel {
		display: flex;
		height: 300px;
		margin: 0 0; // 移除左右边距，让组件紧贴边缘
		gap: 0px;
		position: relative;
		z-index: 10;
	}

	.bottom-left {
		flex: 1;
	}

	.bottom-right {
		flex: 1;
	}

	// 左侧组合卡片样式
	.combined-card-content {
		padding: 20px;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.section {
		flex: 1;
		display: flex;
		flex-direction: column;
		
		&.visitor-section {
			flex: 1.2;
		}
		
		&.quality-section, &.material-section {
			flex: 0.9;
		}
	}

	.section-header {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		position: relative;
		
		.section-title {
			font-family: 'myfont', sans-serif;
			color: rgba(255, 255, 255, 0.95); // 稍微降低透明度，更融合
			font-size: 16px;
			font-weight: bold;
			text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); // 添加文字阴影
		}
		
		.tabs {
			position: absolute;
			right: 0;
			display: flex;
			gap: 5px;
		}
	}
	// 访客统计样式
	.visitor-stats {
		display: flex;
		gap: 20px;
		margin-bottom: 15px;
		
		.stat-item {
			display: flex;
			align-items: center;
			gap: 12px;
			flex: 1;
			
			.stat-info {
				.stat-label {
					font-size: 12px;
					color: rgba(255, 255, 255, 0.7);
					margin-bottom: 5px;
				}
				
				.stat-value {
					font-family: 'myfont', sans-serif;
					font-size: 24px;
					color: rgba(255, 255, 255, 0.95); // 增加透明度
					font-weight: bold;
					text-shadow: 0 2px 8px rgba(79, 195, 247, 0.3); // 添加蓝色光晕
					
					.stat-unit {
						font-size: 12px;
						color: rgba(255, 255, 255, 0.6); // 降低透明度
						margin-left: 4px;
					}
				}
			}
		}
	}

	.recent-info {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 15px;
		background: linear-gradient(135deg, rgba(79, 195, 247, 0.08) 0%, rgba(79, 195, 247, 0.15) 100%); // 增加渐变透明背景
		border-radius: 8px; // 稍微增加圆角
		border: 1px solid rgba(79, 195, 247, 0.25); // 增强边框透明度
		box-shadow: 0 2px 12px rgba(79, 195, 247, 0.15); // 添加发光效果
		backdrop-filter: blur(5px); // 添加背景模糊
		
		.recent-label, .recent-unit {
			font-size: 30px;
			color: rgba(255, 255, 255, 0.8); // 提高可见度
		}
		
		.recent-count {
			font-size: 30px;
			font-weight: bold;
			color: rgba(79, 195, 247, 0.9); // 稍微降低透明度增加融合
			text-shadow: 0 1px 4px rgba(79, 195, 247, 0.4); // 添加光晕
			margin: 0 4px;
		}
	}

	// 质检显示样式
	.quality-display {
		display: flex;
		align-items: center;
		gap: 20px;
		
		.quality-chart {
			position: relative;
			
			.quality-rate {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				
				.rate-value {
					font-size: 15px;
					font-weight: bold;
					color: rgba(79, 195, 247, 0.9); // 增加透明度和统一色调
					text-shadow: 0 2px 8px rgba(79, 195, 247, 0.4); // 添加光晕效果
					display: block;
				}
				
				.rate-unit {
					font-size: 12px;
					color: rgba(255, 255, 255, 0.7); // 稍微降低透明度
				}
			}
		}
		
		.quality-stats {
			flex: 1;
			
			.stat-row {
				display: flex;
				justify-content: space-between;
				margin-bottom: 8px;
				padding: 4px 0;
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
				
				.stat-label {
					color: rgba(255, 255, 255, 0.7);
					font-size: 18px; // 从11px调整到13px
				}
				
				.stat-value {
					color: rgba(102, 187, 106, 0.9); // 降低绿色透明度，增加融合效果
					font-weight: bold;
					font-size: 16px; // 从11px调整到16px
					text-shadow: 0 1px 4px rgba(102, 187, 106, 0.3); // 添加绿色光晕
					
					&.quality-pass {
						color: rgba(79, 195, 247, 0.9); // 统一蓝色系透明度
						text-shadow: 0 1px 4px rgba(79, 195, 247, 0.3); // 添加蓝色光晕
					}
				}
				
				.stat-unit {
					color: rgba(255, 255, 255, 0.5);
					font-size: 17px; // 从10px调整到12px
					margin-left: 2px;
				}
			}
		}
	}

	// 物料显示样式
	.material-display {
		display: flex;
		flex-direction: column;
		
		.material-rate {
			text-align: center;
			margin-bottom: 15px;
			
			.rate-value {
				font-size: 28px;
				font-weight: bold;
				color: rgba(255, 152, 0, 0.9); // 降低橙色透明度
				text-shadow: 0 2px 8px rgba(255, 152, 0, 0.4); // 添加橙色光晕
				display: block;
			}
			
			.rate-unit {
				font-size: 14px;
				color: rgba(255, 255, 255, 0.7);
			}
		}
		
		.material-parts {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 8px;
			
			.part-item {
				display: flex;
				align-items: center;
				gap: 6px;
				padding: 6px 8px;
				background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.08) 100%); // 增加渐变透明背景
				border-radius: 6px; // 增加圆角
				border: 1px solid rgba(255, 255, 255, 0.08); // 降低边框透明度
				backdrop-filter: blur(3px); // 添加背景模糊
				
				.part-label {
					color: rgba(255, 255, 255, 0.7); // 稍微降低透明度
					font-size: 10px;
					flex: 1;
				}
				
				.part-value {
					color: rgba(255, 152, 0, 0.9); // 与主色调统一透明度
					font-weight: bold;
					font-size: 10px;
					text-shadow: 0 1px 3px rgba(255, 152, 0, 0.3); // 添加光晕
				}
			}
		}
	}

	// 右侧机床状态紧凑样式
	.machine-status-compact {
		display: flex;
		flex-direction: column;
		gap: 15px;
		height: 100%;
		
		.machines-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr); // 三列网格布局
			gap: 10px;
			
			.machine-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 10px;
				background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.08) 100%); // 增加渐变背景
				border-radius: 8px; // 增加圆角
				border: 1px solid rgba(255, 255, 255, 0.08); // 降低边框透明度
				backdrop-filter: blur(5px); // 添加背景模糊
				transition: all 0.3s ease;
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 添加阴影
				
				&:hover {
					background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.12) 100%); // 悬停渐变
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); // 悬停阴影
				}
				
				.machine-label {
					color: rgba(255, 255, 255, 0.9); // 稍微降低透明度
					font-size: 11px;
					margin-bottom: 4px;
					font-weight: 500;
					text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); // 添加文字阴影
				}
				
				.machine-status-text {
					font-size: 10px;
					font-weight: bold;
					text-align: center;
					text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); // 添加文字阴影
				}
			}
		}
		
		.efficiency-info {
			flex: 1;
			
			.info-row {
				display: flex;
				justify-content: space-between;
				margin-bottom: 8px;
				padding: 6px 0;
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
				
				.info-label {
					color: rgba(255, 255, 255, 0.7);
					font-size: 12px;
				}
				
				.info-value {
					color: white;
					font-weight: bold;
					font-size: 12px;
				}
			}
		}
	}

	// 选项卡样式
	.combined-tabs {
		.tab-headers {
			display: flex;
			gap: 10px;
			margin-bottom: 15px;
			
			.tab-header {
				padding: 8px 16px;
				background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.12) 100%); // 渐变背景
				border-radius: 20px;
				color: rgba(255, 255, 255, 0.8); // 提高可见度
				font-size: 12px;
				cursor: pointer;
				transition: all 0.3s ease;
				backdrop-filter: blur(5px); // 添加背景模糊
				border: 1px solid rgba(255, 255, 255, 0.08); // 添加细微边框
				
				&.active {
					background: linear-gradient(135deg, rgba(30, 144, 255, 0.25) 0%, rgba(79, 195, 247, 0.35) 100%); // 活跃状态渐变
					color: rgba(255, 255, 255, 0.95);
					box-shadow: 0 2px 8px rgba(30, 144, 255, 0.3); // 添加发光效果
					border: 1px solid rgba(79, 195, 247, 0.3);
				}
				
				&:hover {
					background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.18) 100%); // 悬停渐变
					transform: translateY(-1px); // 轻微上浮效果
					box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
				}
			}
		}
	}

	.tab-content {
		flex: 1;
	}

	// 紧凑告警表格
	.alert-table-compact {
		.table-header {
			display: flex;
			padding: 8px 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
			
			.header-cell {
				flex: 1;
				font-size: 17px;
				color: white;
				font-weight: bold;
				text-align: center;
			}
		}
		
		.table-content {
			.table-row {
				display: flex;
				padding: 8px 0;
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
				
				.table-cell {
					flex: 1;
					font-size: 15px;
					color: rgba(255, 255, 255, 0.8);
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 5px; // 为图标和文字添加间距
				}
			}
		}
		
		// 告警级别样式
		.alert-emergency {
			color: #FF4444 !important;
			font-weight: bold;
			text-shadow: 0 0 8px rgba(255, 68, 68, 0.6);
		}
		
		.alert-warning {
			color: #FFA726 !important;
			font-weight: bold;
			text-shadow: 0 0 8px rgba(255, 167, 38, 0.6);
		}
		
		.alert-normal {
			color: #66BB6A !important;
			font-weight: normal;
		}
		
		.alert-info {
			color: #42A5F5 !important;
			font-weight: normal;
		}
	}

	// 紧凑出入库样式
	.storage-content-compact {
		display: flex;
		align-items: center;
		gap: 20px;
		height: 100%;
		
		.storage-chart {
			position: relative;
			
			.storage-total {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				
				.total-value {
					font-size: 15px; // 从20px调整到24px
					font-weight: bold;
					color: rgba(79, 195, 247, 0.9); // 增加透明度统一色调
					text-shadow: 0 2px 8px rgba(79, 195, 247, 0.4); // 添加光晕效果
					display: block;
				}
				
				.total-label {
					font-size: 12px; // 从10px调整到12px
					color: rgba(255, 255, 255, 0.7); // 稍微降低透明度
				}
			}
		}
		
		.storage-legend-compact {
			flex: 1;
			
			.legend-item {
				display: flex;
				align-items: center;
				gap: 8px; // 从6px调整到8px，增加元素间距
				margin-bottom: 8px; // 从6px调整到8px，增加行间距
				
				.legend-color {
					width: 12px; // 从10px调整到12px
					height: 12px; // 从10px调整到12px
					border-radius: 2px;
				}
				
				.legend-label {
					color: rgba(255, 255, 255, 0.8);
					font-size: 12px; // 从10px调整到12px
					flex: 1;
				}
				
				.legend-value {
					color: rgba(255, 255, 255, 0.95); // 稍微降低透明度
					font-weight: bold;
					font-size: 14px; // 从10px调整到14px
					text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3); // 添加文字阴影
				}
			}
		}
	}

	// 标题栏样式
	.title-content {
		display: flex;
		align-items: center;
		height: 100%;
		position: relative;
		padding: 0 25px;
		
		.location-display {
			position: absolute;
			top: 50%;
			left: 25px;
			transform: translateY(-50%);
			display: flex;
			align-items: center;
			background: linear-gradient(135deg, rgba(255, 67, 67, 0.1) 0%, rgba(255, 99, 71, 0.05) 100%);
			padding: 8px 15px;
			border-radius: 25px;
			border: 1px solid rgba(255, 67, 67, 0.3);
			backdrop-filter: blur(5px);
			box-shadow: 0 4px 15px rgba(255, 67, 67, 0.2);
			transition: all 0.3s ease;
			
			&:hover {
				background: linear-gradient(135deg, rgba(255, 67, 67, 0.15) 0%, rgba(255, 99, 71, 0.08) 100%);
				box-shadow: 0 6px 20px rgba(255, 67, 67, 0.3);
				transform: translateY(-50%) scale(1.02);
			}
		}
		
		.location-text {
			display: flex;
			flex-direction: column;
			margin-left: 5px;
			
			.location-label {
				font-size: 10px;
				color: rgba(255, 255, 255, 0.6);
				margin-bottom: 2px;
				font-weight: 300;
			}
			
			.location-value {
				font-size: 14px;
				color: white;
				font-weight: 500;
				text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
			}
		}
	}

	// 卡片内容通用样式
	.card-content {
		padding: 20px;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.card-header {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		position: relative;
		
		.card-title {
			font-family: 'myfont', sans-serif;
			color: rgba(255, 255, 255, 0.95); // 增加透明度
			font-size: 18px;
			font-weight: bold;
			text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); // 添加文字阴影
		}
	}

	// 入场统计样式
	.stats-content {
		display: flex;
		gap: 40px;
		margin: 30px 0;
		flex: 1;
		
		.stat-item {
			display: flex;
			align-items: center;
			gap: 20px;
			flex: 1;
			
			.stat-info {
				.stat-label {
					font-size: 20px;
					color: rgba(255, 255, 255, 0.7);
					margin-bottom: 10px;
				}
				
				.stat-value {
					font-family: 'myfont', sans-serif;
					font-size: 45px;
					color: white;
					font-weight: bold;
					
					.stat-unit {
						font-size: 20px;
						color: rgba(255, 255, 255, 0.7);
						margin-left: 8px;
					}
				}
			}
		}
	}

	.recent-info {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: auto;
		padding: 15px 20px;
		background: linear-gradient(135deg, rgba(79, 195, 247, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%);
		border-radius: 8px;
		border: 1px solid rgba(79, 195, 247, 0.2);
		backdrop-filter: blur(5px);
		
		.recent-label {
			font-size: 14px;
			color: rgba(255, 255, 255, 0.7);
			margin-right: 8px;
		}
		
		.recent-count {
			font-size: 18px;
			font-weight: bold;
			color: #4FC3F7;
			text-shadow: 0 0 8px rgba(79, 195, 247, 0.5);
			margin-right: 4px;
		}
		
		.recent-unit {
			font-size: 14px;
			color: rgba(255, 255, 255, 0.6);
		}
	}

	// 告警表格样式
	.alert-table {
		flex: 1;
		
		.table-header {
			display: flex;
			padding: 15px 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
			
			.header-cell {
				flex: 1;
				font-size: 16px;
				color: white;
				font-weight: bold;
				text-align: center;
			}
		}
		
		.table-content {
			flex: 1;
			overflow-y: auto;
			
			.table-row {
				display: flex;
				padding: 15px 0;
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
				transition: background 0.3s ease;
				
				&:nth-child(even) {
					background: rgba(255, 255, 255, 0.03);
				}
				
				&:hover {
					background: rgba(255, 255, 255, 0.08);
				}
				
				.table-cell {
					flex: 1;
					font-size: 14px;
					color: rgba(255, 255, 255, 0.8);
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 5px; // 为图标和文字添加间距
				}
			}
		}
		
		// 告警级别样式（与紧凑表格保持一致）
		.alert-emergency {
			color: #FF4444 !important;
			font-weight: bold;
			text-shadow: 0 0 8px rgba(255, 68, 68, 0.6);
		}
		
		.alert-warning {
			color: #FFA726 !important;
			font-weight: bold;
			text-shadow: 0 0 8px rgba(255, 167, 38, 0.6);
		}
		
		.alert-normal {
			color: #66BB6A !important;
			font-weight: normal;
		}
		
		.alert-info {
			color: #42A5F5 !important;
			font-weight: normal;
		}
	}

	// 质检通过率样式
	.quality-chart {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		
		.chart-container {
			position: relative;
			
			.quality-rate {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				z-index: 10;
				pointer-events: none;
				
				.rate-value {
					font-size: 24px;
					font-weight: bold;
					color: #4FC3F7;
					display: block;
					text-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
				}
				
				.rate-unit {
					font-size: 14px;
					color: rgba(255, 255, 255, 0.8);
				}
			}
		}
	}

	.quality-stats {
		margin-top: 10px;
		padding: 0 20px;
		
		.stat-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 8px;
			
			&:last-child {
				margin-bottom: 0;
			}
			padding: 6px 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
			
			.stat-label {
				color: rgba(255, 255, 255, 0.7);
				font-size: 12px;
			}
			
			.stat-value {
				color: #66BB6A;
				font-weight: bold;
				font-size: 12px;
				
				&.quality-pass {
					color: #4FC3F7;
				}
			}
			
			.stat-unit {
				color: rgba(255, 255, 255, 0.5);
				font-size: 10px;
				margin-left: 4px;
			}
		}
	}

	// 物料齐套率样式
	.material-display {
		flex: 1;
		display: flex;
		flex-direction: column;
		
		.material-rate {
			text-align: center;
			margin: 20px 0;
			
			.rate-value {
				font-size: 36px;
				font-weight: bold;
				color: #FF9800;
				display: block;
			}
			
			.rate-unit {
				font-size: 18px;
				color: rgba(255, 255, 255, 0.7);
			}
		}
		
		.material-parts {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 15px;
			
			.part-row {
				display: flex;
				gap: 15px;
				
				.part-item {
					flex: 1;
					display: flex;
					align-items: center;
					gap: 8px;
					padding: 10px;
					background: rgba(255, 255, 255, 0.05);
					border-radius: 6px;
					border: 1px solid rgba(255, 255, 255, 0.1);
					
					.part-label {
						color: rgba(255, 255, 255, 0.8);
						font-size: 12px;
						flex: 1;
					}
					
					.part-value {
						color: #FF9800;
						font-weight: bold;
						font-size: 14px;
					}
				}
			}
		}
	}

	// 出入库样式
	.storage-content {
		position: relative;
		flex: 1;
		display: flex;
		height: 280px; // 确保有足够高度
		align-items: center;
		justify-content: center;
		
		.storage-total {
			text-align: center;
			
			.total-value {
				font-size: 28px;
				font-weight: bold;
				color: #4FC3F7;
				display: block;
				text-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
			}
			
			.total-label {
				font-size: 12px;
				color: rgba(255, 255, 255, 0.8);
				margin-top: 5px;
				display: block;
			}
		}
		
		.storage-legend {
			position: absolute;
			left: 40px;
			top: 100px;
			
			.legend-item {
				display: flex;
				align-items: center;
				gap: 8px;
				margin-bottom: 8px;
				
				.legend-color {
					width: 12px;
					height: 12px;
					border-radius: 2px;
				}
				
				.legend-info {
					display: flex;
					gap: 10px;
					
					.legend-label {
						color: rgba(255, 255, 255, 0.8);
						font-size: 12px;
						min-width: 60px;
					}
					
					.legend-value {
						color: white;
						font-weight: bold;
						font-size: 12px;
					}
				}
			}
		}
	}

	// 生产统计样式
	.production-content {
		position: relative;
		flex: 1;
		
		.production-table {
			position: absolute;
			right: 40px;
			top: 40px;
			width: 280px;
			
			.table-header {
				display: flex;
				background: rgba(30, 144, 255, 0.1);
				border: 1px solid rgba(30, 144, 255, 0.3);
				border-radius: 4px;
				padding: 10px;
				margin-bottom: 10px;
				
				.header-cell {
					flex: 1;
					color: #1e90ff;
					font-weight: bold;
					font-size: 15px;
					text-align: center;
				}
			}
			
			.table-rows {
				.table-row {
					display: flex;
					padding: 8px 10px;
					margin-bottom: 5px;
					background: rgba(255, 255, 255, 0.05);
					border-radius: 4px;
					border: 1px solid rgba(255, 255, 255, 0.1);
					
					.table-cell {
						flex: 1;
						color: rgba(255, 255, 255, 0.8);
						font-size: 15px;
						text-align: center;
					}
				}
			}
		}
	}

	// 年度产量样式
	.yearly-content {
		position: relative;
		flex: 1;
		
		.yearly-legend {
			position: absolute;
			top: 0px;
			right: 40px;
			display: flex;
			gap: 20px;
			
			.legend-item {
				display: flex;
				align-items: center;
				gap: 8px;
				
				.legend-color {
					width: 12px;
					height: 12px;
					border-radius: 2px;
				}
				
				.legend-label {
					color: rgba(255, 255, 255, 0.8);
					font-size: 14px;
				}
			}
		}
	}

	// 机床状态样式
	.machine-status {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 20px;
		
		.machines-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 15px;
			
			&.single-machine {
				grid-template-columns: 1fr;
				max-width: 200px;
				margin: 0 auto;
			}
			
			.machine-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 15px;
				background: rgba(255, 255, 255, 0.05);
				border-radius: 8px;
				border: 1px solid rgba(255, 255, 255, 0.1);
				transition: all 0.3s ease;
				
				&:hover {
					background: rgba(255, 255, 255, 0.08);
				}
				
				.machine-image {
					width: 60px;
					height: 60px;
					margin-bottom: 10px;
				}
				
				.machine-label {
					color: white;
					font-size: 14px;
					margin-bottom: 5px;
				}
				
				.machine-status-text {
					font-size: 12px;
					font-weight: bold;
				}
			}
		}
		
		.machine-details {
			display: flex;
			flex-direction: column;
			gap: 15px;
			
			.detail-item {
				display: flex;
				align-items: center;
				gap: 15px;
				padding: 12px;
				background: rgba(255, 255, 255, 0.05);
				border-radius: 6px;
				border: 1px solid rgba(255, 255, 255, 0.1);
				
				.detail-info {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.detail-label {
						color: rgba(255, 255, 255, 0.7);
						font-size: 14px;
					}
					
					.detail-value {
						color: white;
						font-weight: bold;
						font-size: 14px;
					}
				}
			}
		}
		
		.efficiency-metrics {
			display: flex;
			flex-direction: column;
			gap: 15px;
			
			.metric-item {
				display: flex;
				align-items: center;
				gap: 15px;
				padding: 12px;
				background: rgba(255, 255, 255, 0.05);
				border-radius: 6px;
				border: 1px solid rgba(255, 255, 255, 0.1);
				
				.metric-info {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.metric-label {
						color: rgba(255, 255, 255, 0.7);
						font-size: 14px;
					}
					
					.metric-value {
						color: #4FC3F7;
						font-weight: bold;
						font-size: 14px;
					}
				}
			}
			
			.metric-tabs {
				display: flex;
				gap: 10px;
				justify-content: center;
				margin-top: 10px;
			}
		}
	}

	// 响应式设计
	@media (max-width: 1600px) {
		.main-layout {
			height: calc(100vh - 100px); // 在小屏幕上相应调整
		}
		
		.card-content {
			padding: 15px;
		}
		
		.stats-content {
			gap: 20px;
			
			.stat-item .stat-info .stat-value {
				font-size: 36px;
			}
		}
	}
</style>