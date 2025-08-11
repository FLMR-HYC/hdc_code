<template>
  <div class="modern-card" :class="[size, variant, { hover: hoverable, loading }]">
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    
    <div v-if="header || $slots.header" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ header }}</h3>
      </slot>
    </div>
    
    <div class="card-body">
      <slot></slot>
    </div>
    
    <div v-if="footer || $slots.footer" class="card-footer">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModernCard',
  props: {
    header: String,
    footer: String,
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'success', 'warning', 'danger'].includes(value)
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.modern-card {
  background: var(--background-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.modern-card.hover:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.modern-card.small {
  padding: var(--spacing-sm);
}

.modern-card.medium {
  padding: var(--spacing-md);
}

.modern-card.large {
  padding: var(--spacing-lg);
}

.modern-card.primary {
  border-left: 4px solid var(--primary-color);
}

.modern-card.success {
  border-left: 4px solid var(--success-color);
}

.modern-card.warning {
  border-left: 4px solid var(--warning-color);
}

.modern-card.danger {
  border-left: 4px solid var(--error-color);
}

.card-header {
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: var(--spacing-md);
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.card-body {
  flex: 1;
}

.card-footer {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  margin-top: var(--spacing-md);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
