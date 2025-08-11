<template>
	<div class="divroot">
		<ScaleScreen :width="1920" :height="1137" :selfAdaption="true" :alignTop="false">
			<div class="root">
				<!-- 标题栏 - 使用新组件替换图片 -->
				<div style="display: flex; flex-direction: column; height:48px;">
					<UIComponents 
						type="title" 
						:custom-style="{ width: '1920px', height: '74px', position: 'absolute' }"
					>
						<div class="title-content">
							<UIComponents 
								type="icon" 
								icon-name="address" 
								:icon-size="20"
								:custom-style="{ position: 'absolute', marginTop: '55px', marginLeft: '25px' }"
							/>
							<span class="location-text">鸿志智慧工厂数字化大屏系统</span>
						</div>
					</UIComponents>
					<CrayonClock style="position:absolute; margin-top: 55px; margin-left: 1615px;">
					</CrayonClock>
				</div>
				
				<!-- 面包屑导航 -->
				<div class="content-elpage">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item :to="{ path: '/dataOverviewNew' }">鸿志智慧工厂</el-breadcrumb-item>
						<el-breadcrumb-item>配置</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				
				<!-- 配置表单区域 - 使用新组件替换图片 -->
				<div class="form-container">
					<UIComponents 
						type="plate" 
						variant="config"
						:custom-style="{ 
							width: '610px', 
							minHeight: '400px',
							padding: '30px',
							margin: '60px auto 0'
						}"
					>
						<!-- 表单标题 -->
						<div class="form-header">
							<UIComponents 
								type="icon" 
								icon-name="production" 
								:icon-size="24"
								:custom-style="{ marginRight: '12px' }"
							/>
							<h2 class="form-title">设备配置管理</h2>
						</div>
						
						<UIComponents type="divider" />
						
						<!-- 表单内容 -->
						<el-form ref="form" :model="form" label-width="120px" class="config-form">
							<div class="form-section">
								<h3 class="section-title">
									<UIComponents 
										type="icon" 
										icon-name="address" 
										:icon-size="16"
										:custom-style="{ marginRight: '8px' }"
									/>
									区域选择
								</h3>
								
								<el-form-item label="选择地区">
									<el-select 
										ref="selectCityLabel" 
										v-model="cityValue" 
										placeholder="请选择地区"
										@change="getRegion"
										class="custom-select"
									>
										<el-option 
											v-for="item in cityOptions" 
											:key="item.id" 
											:label="item.name"
											:disabled="item.useFlag==0" 
											:value="item.id"
										/>
									</el-select>
								</el-form-item>
								
								<el-form-item label="选择展区">
									<el-select 
										ref="selectRegionLabel" 
										v-model="regionValue" 
										placeholder="请选择展区"
										class="custom-select"
									>
										<el-option 
											v-for="item in regionOptions" 
											:key="item.id" 
											:label="item.name"
											:disabled="item.useFlag==0" 
											:value="item.id"
										/>
									</el-select>
								</el-form-item>
							</div>
							
							<!-- 状态指示器 -->
							<div class="status-indicator" v-if="cityValue && regionValue">
								<UIComponents 
									type="animation" 
									:particle-count="8"
									:custom-style="{ 
										width: '100%', 
										height: '40px',
										background: 'rgba(102, 187, 106, 0.1)',
										borderRadius: '8px',
										border: '1px solid rgba(102, 187, 106, 0.3)'
									}"
								>
									<div class="status-text">
										✓ 配置完成：{{ getCityName() }} - {{ getRegionName() }}
									</div>
								</UIComponents>
							</div>
							
							<!-- 操作按钮 -->
							<el-form-item class="button-group">
								<el-button 
									type="primary" 
									@click="onSubmit"
									class="save-button"
									:disabled="!cityValue || !regionValue"
								>
									<UIComponents 
										type="icon" 
										icon-name="production" 
										:icon-size="16"
										:custom-style="{ marginRight: '8px' }"
									/>
									保存并关闭
								</el-button>
								<el-button 
									@click="resetForm"
									class="reset-button"
								>
									重置
								</el-button>
							</el-form-item>
						</el-form>
					</UIComponents>
				</div>
			</div>
		</ScaleScreen>
	</div>
</template>

<script>
// 引入组件
import ScaleScreen from '@/views/scale-screen.vue'
import UIComponents from '@/components/UIComponents.vue'
import Utils from '../utils/Utils.ts'
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
		ScaleScreen,
		UIComponents,
		CrayonClock,
	},
	methods: {
		// 保存并关闭
		onSubmit() {
			console.log('submit!');
			if (this.cityValue == '') {
				Utils.showMessage('请选择地区！', 'warning')
				return
			}
			if (this.regionValue == '') {
				Utils.showMessage('请选择展区！', 'warning')
				return
			}
			
			Local.saveCity(this.$refs.selectCityLabel.selected.currentLabel)
			Local.saveRegion(this.$refs.selectRegionLabel.selected.currentLabel)
			Local.saveId(this.regionValue)
			Utils.showMessage('保存成功！', 'success')
			this.$router.back()
		},
		// 重置表单
		resetForm() {
			this.cityValue = ''
			this.regionValue = ''
			this.regionOptions = []
			Utils.showMessage('表单已重置', 'info')
		},
		// 获取城市名称
		getCityName() {
			const city = this.cityOptions.find(item => item.id === this.cityValue)
			return city ? city.name : ''
		},
		// 获取区域名称
		getRegionName() {
			const region = this.regionOptions.find(item => item.id === this.regionValue)
			return region ? region.name : ''
		},
		// 获取城市列表
		getCity() {
			ServiceGet({
				url: '/hdc/api/city/listCity',
			}).then(res => {
				console.log('/hdc/api/city/listCity 访问成功', res);
				this.cityOptions = res
			}).catch(e => {
				console.log('/hdc/api/city/listCity 访问失败', e);
			})
		},
		// 获取地区列表
		getRegion() {
			ServiceGet({
				url: '/hdc/api/group/listGroup',
				params: {
					cityId: this.cityValue
				}
			}).then(res => {
				console.log('/hdc/api/group/listGroup 访问成功', res);
				this.regionOptions = res
			}).catch(e => {
				console.log('/hdc/api/group/listGroup 访问失败', e);
			})
		},
	},

	mounted() {
		var that = this;
		window.onresize = () => {
			return (() => {
				window.fullHeight = document.documentElement.clientHeight;
				window.fullWidth = document.documentElement.clientWidth;
				that.windowHeight = window.fullHeight;
				that.windowWidth = window.fullWidth;
				that.rowHeight = window.fullWidth
			})
		};

		// 获取城市列表
		this.getCity()
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

	data() {
		return {
			form: {},
			cityOptions: [],
			cityValue: '',
			regionOptions: [],
			regionValue: ''
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
	background-color: #05181d;
	width: 100%;
	height: 100%;
}

.content-elpage {
	display: flex;
	flex-direction: row;
	align-items: center;
	align-self: center;
	height: 60px;
	margin-left: 15px;
}

.title-content {
	display: flex;
	align-items: center;
	padding: 0 25px;
	height: 100%;
	
	.location-text {
		color: white;
		font-size: 24px;
		font-weight: bold;
		margin-left: 40px;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}
}

.form-container {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	min-height: 500px;
}

.form-header {
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	
	.form-title {
		color: white;
		font-size: 24px;
		font-weight: bold;
		margin: 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}
}

.config-form {
	.form-section {
		margin-bottom: 30px;
		
		.section-title {
			color: rgba(255, 255, 255, 0.9);
			font-size: 18px;
			margin-bottom: 20px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid rgba(30, 144, 255, 0.3);
			padding-bottom: 10px;
		}
	}
	
	.custom-select {
		width: 100%;
	}
	
	.status-indicator {
		margin: 20px 0;
		
		.status-text {
			color: #66BB6A;
			font-size: 14px;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	}
	
	.button-group {
		margin-top: 40px;
		text-align: center;
		
		.save-button {
			background: linear-gradient(135deg, #1e90ff 0%, #0064c8 100%);
			border: none;
			padding: 12px 30px;
			font-size: 16px;
			font-weight: bold;
			border-radius: 25px;
			transition: all 0.3s ease;
			
			&:hover:not(:disabled) {
				transform: translateY(-2px);
				box-shadow: 0 8px 25px rgba(30, 144, 255, 0.4);
			}
			
			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}
		
		.reset-button {
			background: rgba(255, 255, 255, 0.1);
			border: 1px solid rgba(255, 255, 255, 0.3);
			color: white;
			margin-left: 15px;
			padding: 12px 25px;
			border-radius: 25px;
			transition: all 0.3s ease;
			
			&:hover {
				background: rgba(255, 255, 255, 0.2);
				transform: translateY(-1px);
			}
		}
	}
}

/deep/ .el-breadcrumb__inner {
	color: white;
}

/deep/ .el-form-item__label {
	color: white !important;
	font-size: 16px;
}

/deep/ .el-select {
	.el-input__inner {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(30, 144, 255, 0.3);
		color: white;
		border-radius: 8px;
		
		&:focus {
			border-color: #1e90ff;
			box-shadow: 0 0 10px rgba(30, 144, 255, 0.3);
		}
	}
	
	.el-input__suffix {
		color: rgba(255, 255, 255, 0.6);
	}
}

/deep/ .el-select-dropdown {
	background: rgba(5, 24, 29, 0.95);
	border: 1px solid rgba(30, 144, 255, 0.3);
	backdrop-filter: blur(10px);
	
	.el-select-dropdown__item {
		color: white;
		
		&:hover {
			background: rgba(30, 144, 255, 0.2);
		}
		
		&.selected {
			background: rgba(30, 144, 255, 0.3);
			color: #1e90ff;
		}
	}
}
</style>
