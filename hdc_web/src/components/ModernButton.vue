<template>
  <button 
    :class="[
      'modern-button',
      type,
      size,
      {
        'is-loading': loading,
        'is-disabled': disabled,
        'is-round': round,
        'is-circle': circle,
        'has-icon': icon
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <i v-if="loading" class="loading-icon el-icon-loading"></i>
    <i v-else-if="icon" :class="icon"></i>
    
    <span v-if="!circle && $slots.default" class="button-text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ModernButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'ghost'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['mini', 'small', 'medium', 'large'].includes(value)
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    icon: String
  },
  methods: {
    handleClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event);
      }
    }
  }
}
</script>

<style scoped>
.modern-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  font-family: var(--font-primary);
  font-weight: 500;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  outline: none;
  user-select: none;
}

/* 尺寸 */
.modern-button.mini {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: var(--radius-sm);
  min-height: 24px;
}

.modern-button.small {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 14px;
  border-radius: var(--radius-md);
  min-height: 32px;
}

.modern-button.medium {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 14px;
  border-radius: var(--radius-md);
  min-height: 40px;
}

.modern-button.large {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 16px;
  border-radius: var(--radius-lg);
  min-height: 48px;
}

/* 类型 */
.modern-button.default {
  background: var(--background-card);
  color: var(--text-primary);
  border-color: var(--border-color);
  box-shadow: var(--shadow-sm);
}

.modern-button.default:hover {
  background: var(--background-tertiary);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.modern-button.primary {
  background: var(--primary-gradient);
  color: var(--text-white);
  box-shadow: var(--shadow-md);
}

.modern-button.primary:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
  filter: brightness(1.1);
}

.modern-button.secondary {
  background: var(--secondary-color);
  color: var(--text-white);
  box-shadow: var(--shadow-md);
}

.modern-button.secondary:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
  filter: brightness(1.1);
}

.modern-button.success {
  background: var(--success-color);
  color: var(--text-white);
  box-shadow: var(--shadow-md);
}

.modern-button.success:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
  filter: brightness(1.1);
}

.modern-button.warning {
  background: var(--warning-color);
  color: var(--text-white);
  box-shadow: var(--shadow-md);
}

.modern-button.warning:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
  filter: brightness(1.1);
}

.modern-button.danger {
  background: var(--error-color);
  color: var(--text-white);
  box-shadow: var(--shadow-md);
}

.modern-button.danger:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
  filter: brightness(1.1);
}

.modern-button.ghost {
  background: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.modern-button.ghost:hover {
  background: var(--primary-color);
  color: var(--text-white);
  transform: translateY(-2px);
}

/* 状态 */
.modern-button.is-loading,
.modern-button.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.modern-button.is-loading:hover,
.modern-button.is-disabled:hover {
  transform: none;
  box-shadow: initial;
}

/* 形状 */
.modern-button.is-round {
  border-radius: var(--radius-full);
}

.modern-button.is-circle {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
}

.modern-button.is-circle.small {
  width: 32px;
  height: 32px;
}

.modern-button.is-circle.large {
  width: 48px;
  height: 48px;
}

/* 图标 */
.loading-icon {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 波纹效果 */
.modern-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.modern-button:active::after {
  width: 200px;
  height: 200px;
}
</style>
