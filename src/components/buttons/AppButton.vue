<script setup lang="ts">
interface Props {
  label: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
})

const emit = defineEmits<{
  onSubmit: []
}>()

function handleButtonClick() {
  emit('onSubmit')
}
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    @click="handleButtonClick"
    class="rounded-xl w-full mx-4 px-5 py-4 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50"
    :class="
      props.variant === 'primary'
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    "
  >
    {{ props.label }}
  </button>
</template>
