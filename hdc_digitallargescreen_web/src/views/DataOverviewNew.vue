<template>
	<div class="divroot">
		<ScaleScreen :width="1920" :height="1137" :selfAdaption="true" :alignTop="false">
			<div class="root">
				<!-- 标题栏 -->
				<div style="display: flex; flex-direction: column; height:48px;">
					<div style='position: relative;'>
						<div style="position:absolute; margin-top: 24px; height:48px;">
							<UIComponents 
								type="title" 
								:custom-style="{ 
									position: 'absolute', 
									width: '1920px', 
									height: '74px' 
								}"
							>
								<div class="title-content">
									<UIComponents 
										type="icon" 
										icon-name="address" 
										:icon-size="16"
										:custom-style="{ 
											position: 'absolute', 
											marginTop: '20px', 
											marginLeft: '25px' 
										}"
									/>
									<div @click="SetClick()" class="location-text">
										{{cityValue}}
									</div>
								</div>
							</UIComponents>
							<CrayonClock style="position:absolute; margin-top: 55px; margin-left: 1615px;">
							</CrayonClock>
						</div>
					</div>
				</div>

				<!-- 第一行：入场统计 + 设备告警清单 -->
				<div class="row-container">
					<!-- 入场统计 -->
					<div class="card-container left">
						<UIComponents 
							type="plate" 
							variant="stats"
							:custom-style="{ 
								width: '610px', 
								minHeight: '340px',
								marginTop: '60px' 
							}"
						>
							<div class="card-content">
								<div class="card-header">
									<div class="card-title">入场统计</div>
									<UIComponents 
										type="animation" 
										:particle-count="6"
										:custom-style="{ 
											width: '60px', 
											height: '20px',
											marginLeft: '10px'
										}"
									/>
									<div class="tab-group">
										<UIComponents 
											type="tab" 
											variant="active"
											:custom-style="{ marginRight: '10px' }"
										>
											<span style="color: white; font-size: 14px;">今日</span>
										</UIComponents>
										<UIComponents 
											type="tab" 
											variant="default"
										>
											<span style="color: rgba(255,255,255,0.5); font-size: 14px;">本月</span>
										</UIComponents>
									</div>
								</div>
								
								<div class="stats-content">
									<div class="stat-item">
										<UIComponents 
											type="icon" 
											icon-name="guest" 
											:icon-size="80"
											:custom-style="{ marginBottom: '15px' }"
										/>
										<div class="stat-info">
											<div class="stat-label">访客</div>
											<div class="stat-value">
												{{dataVisitor.data.today.visitor}}
												<span class="stat-unit">次</span>
											</div>
										</div>
									</div>
									
									<div class="stat-item">
										<UIComponents 
											type="icon" 
											icon-name="production" 
											:icon-size="80"
											:custom-style="{ marginBottom: '15px' }"
										/>
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
									最近3小时内入场人数：{{dataVisitor.data.last3Hours}}
								</div>
							</div>
						</UIComponents>
					</div>

					<!-- 设备告警清单 -->
					<div class="card-container right">
						<UIComponents 
							type="plate" 
							variant="alert"
							:custom-style="{ 
								width: '610px', 
								minHeight: '340px',
								marginTop: '60px' 
							}"
						>
							<div class="card-content">
								<div class="card-header">
									<div class="card-title">设备告警清单</div>
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
										:custom-style="{ marginLeft: 'auto' }"
									>
										<span style="color: #73B1F9; font-size: 16px;">机械臂</span>
									</UIComponents>
								</div>
								
								<div class="alert-table">
									<div class="table-header">
										<div class="header-cell">故障原因</div>
										<div class="header-cell">告警级别</div>
										<div class="header-cell">故障时间</div>
										<div class="header-cell">恢复时间</div>
									</div>
									
									<div class="table-content">
										<div 
											v-for="(item, index) in dataEquipment.data.failureMap.MG400" 
											:key="index"
											v-show="index < 5"
											class="table-row"
											:class="{ 'even': index % 2 === 0 }"
										>
											<div class="table-cell">{{item.failureName}}</div>
											<div class="table-cell" :style="{color: getColor(item.failureLevel)}">
												<UIComponents 
													type="icon" 
													icon-name="alarm" 
													:icon-size="16"
													:custom-style="{ marginRight: '5px' }"
												/>
												{{item.failureLevel}}
											</div>
											<div class="table-cell">{{item.failureTimeStr}}</div>
											<div class="table-cell">{{item.failureRecoverTimeStr}}</div>
										</div>
									</div>
								</div>
							</div>
						</UIComponents>
					</div>
				</div>

				<!-- 第二行：设备效率 + 产线实时数据 -->
				<div class="row-container">
					<!-- 设备效率 -->
					<div class="card-container left">
						<UIComponents 
							type="plate" 
							variant="efficiency"
							:custom-style="{ 
								width: '290px', 
								minHeight: '380px',
								marginTop: '60px' 
							}"
						>
							<div class="card-content">
								<div class="card-header">
									<div class="card-title">设备效率</div>
									<UIComponents 
										type="animation" 
										:particle-count="4"
										:custom-style="{ 
											width: '40px', 
											height: '20px',
											marginLeft: '8px'
										}"
									/>
								</div>
								
								<div class="efficiency-chart">
									<ChartComponents 
										type="circle-bg" 
										:size="120"
									/>
									<div class="efficiency-value">
										<div class="percentage">{{dataEquipment.data.OEE}}%</div>
										<div class="label">OEE</div>
									</div>
								</div>
								
								<div class="efficiency-details">
									<div class="detail-item">
										<span class="detail-label">设备利用率</span>
										<span class="detail-value">{{dataEquipment.data.utilizationRate}}%</span>
									</div>
									<div class="detail-item">
										<span class="detail-label">性能效率</span>
										<span class="detail-value">{{dataEquipment.data.performanceEfficiency}}%</span>
									</div>
									<div class="detail-item">
										<span class="detail-label">质量效率</span>
										<span class="detail-value">{{dataEquipment.data.qualityEfficiency}}%</span>
									</div>
								</div>
							</div>
						</UIComponents>
					</div>

					<!-- 产线实时数据 -->
					<div class="card-container center">
						<UIComponents 
							type="plate" 
							variant="production"
							:custom-style="{ 
								width: '290px', 
								minHeight: '380px',
								marginTop: '60px' 
							}"
						>
							<div class="card-content">
								<div class="card-header">
									<div class="card-title">产线实时数据</div>
									<UIComponents 
										type="animation" 
										:particle-count="4"
										:custom-style="{ 
											width: '40px', 
											height: '20px',
											marginLeft: '8px'
										}"
									/>
								</div>
								
								<div class="production-status">
									<div class="status-grid">
										<div 
											v-for="(value, key) in dataEquipment.data.deviceRealTimeStatus" 
											:key="key"
											class="status-item"
											:class="getDeviceStatusClass(value)"
										>
											<div class="device-icon">
												<UIComponents 
													type="icon" 
													:icon-name="value === 1 ? 'production' : 'guest'" 
													:icon-size="24"
												/>
											</div>
											<div class="device-info">
												<div class="device-id">{{key}}</div>
												<div class="device-status">{{value === 1 ? '运行中' : '待机'}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</UIComponents>
					</div>

					<!-- 产量统计图表 -->
					<div class="card-container right-large">
						<UIComponents 
							type="plate" 
							variant="chart"
							:custom-style="{ 
								width: '580px', 
								minHeight: '380px',
								marginTop: '60px' 
							}"
						>
							<div class="card-content">
								<div class="card-header">
									<div class="card-title">产量统计</div>
									<UIComponents 
										type="animation" 
										:particle-count="8"
										:custom-style="{ 
											width: '60px', 
											height: '20px',
											marginLeft: '10px'
										}"
									/>
								</div>
								
								<div class="chart-container">
									<ChartComponents 
										type="vertical-blue" 
										:data="getProductionChartData()"
										:width="520"
										:height="280"
									/>
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
			VueGridLayout,
			ScaleScreen,
			CrayonClock,
		},
		methods: {
			SetClick() {
				this.$router.push({
					path: '/settingNew'
				})
			},
			getColor(level) {
				switch(level) {
					case '高':
						return '#F44336'
					case '中':
						return '#FF9800'
					case '低':
						return '#66BB6A'
					default:
						return '#FFFFFF'
				}
			},
			getDeviceStatusClass(status) {
				return status === 1 ? 'running' : 'standby'
			},
			getProductionChartData() {
				const data = []
				for (let key in this.dataEquipment.data.ProductionInfo) {
					const item = this.dataEquipment.data.ProductionInfo[key]
					data.push({
						label: key,
						value: item.actual || 0
					})
				}
				return data
			}
		},
		
		mounted() {
			var that = this;
			// 初始化数据
			this.dataVisitor = DataOverviewData.getDataVisitor()
			this.dataEquipment = DataOverviewData.getDataEquipment()
			this.cityValue = Local.getCity() || '深圳'
			
			window.onresize = () => {
				return (() => {
					window.fullHeight = document.documentElement.clientHeight;
					window.fullWidth = document.documentElement.clientWidth;
					that.windowHeight = window.fullHeight;
					that.windowWidth = window.fullWidth;
				})
			};
		},

		watch: {
			windowHeight(val) {
				console.log("实时屏幕高度：", val);
			},
			windowWidth(val) {
				console.log("实时屏幕宽度：", val);
			}
		},

		data() {
			return {
				cityValue: '',
				dataVisitor: DataOverviewData.getDataVisitor(),
				dataEquipment: DataOverviewData.getDataEquipment()
			}
		}
	}
</script>

<style lang="less" scoped>
	.root {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.divroot {
		background: linear-gradient(135deg, #05181d 0%, #0a2633 50%, #0f3a4f 100%);
		width: 100%;
		height: 100%;
	}

	.title-content {
		display: flex;
		align-items: center;
		height: 100%;
		
		.location-text {
			position: absolute;
			margin-top: 55px;
			margin-left: 60px;
			width: 300px;
			font-size: 16px;
			color: white;
			opacity: 0.8;
			cursor: pointer;
			transition: opacity 0.3s ease;
			
			&:hover {
				opacity: 1;
			}
		}
	}

	.row-container {
		display: flex;
		gap: 20px;
		margin: 20px 25px;
		
		.card-container {
			&.left {
				flex: 0 0 610px;
			}
			
			&.right {
				flex: 0 0 610px;
				margin-left: auto;
			}
			
			&.center {
				flex: 0 0 290px;
				margin-left: 320px;
			}
			
			&.right-large {
				flex: 0 0 580px;
				margin-left: auto;
			}
		}
	}

	.card-content {
		padding: 20px;
		height: 100%;
	}

	.card-header {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		
		.card-title {
			font-family: 'myfont', sans-serif;
			color: white;
			font-size: 18px;
			font-weight: bold;
		}
		
		.tab-group {
			margin-left: auto;
			display: flex;
			gap: 10px;
		}
	}

	.stats-content {
		display: flex;
		gap: 40px;
		margin: 30px 0;
		
		.stat-item {
			display: flex;
			align-items: center;
			gap: 20px;
			
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
		font-size: 16px;
		color: rgba(255, 255, 255, 0.6);
		margin-top: 20px;
		padding-top: 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.alert-table {
		.table-header {
			display: flex;
			padding: 15px 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
			
			.header-cell {
				flex: 1;
				font-size: 16px;
				color: white;
				font-weight: bold;
			}
		}
		
		.table-content {
			max-height: 200px;
			overflow-y: auto;
			
			.table-row {
				display: flex;
				padding: 15px 0;
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
				transition: background 0.3s ease;
				
				&.even {
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
				}
			}
		}
	}

	.efficiency-chart {
		position: relative;
		display: flex;
		justify-content: center;
		margin: 30px 0;
		
		.efficiency-value {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			
			.percentage {
				font-size: 32px;
				font-weight: bold;
				color: #4FC3F7;
				margin-bottom: 5px;
			}
			
			.label {
				font-size: 14px;
				color: rgba(255, 255, 255, 0.7);
			}
		}
	}

	.efficiency-details {
		.detail-item {
			display: flex;
			justify-content: space-between;
			padding: 8px 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
			
			.detail-label {
				color: rgba(255, 255, 255, 0.7);
				font-size: 14px;
			}
			
			.detail-value {
				color: #66BB6A;
				font-weight: bold;
				font-size: 14px;
			}
		}
	}

	.production-status {
		.status-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 15px;
			margin: 20px 0;
			
			.status-item {
				display: flex;
				align-items: center;
				gap: 10px;
				padding: 15px;
				border-radius: 8px;
				transition: all 0.3s ease;
				
				&.running {
					background: rgba(102, 187, 106, 0.1);
					border: 1px solid rgba(102, 187, 106, 0.3);
				}
				
				&.standby {
					background: rgba(255, 193, 7, 0.1);
					border: 1px solid rgba(255, 193, 7, 0.3);
				}
				
				.device-info {
					.device-id {
						font-size: 14px;
						color: white;
						font-weight: bold;
					}
					
					.device-status {
						font-size: 12px;
						color: rgba(255, 255, 255, 0.7);
					}
				}
			}
		}
	}

	.chart-container {
		margin: 20px 0;
		display: flex;
		justify-content: center;
	}
</style>
