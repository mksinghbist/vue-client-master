<template>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12 mb-4"></div>
  </div>
</template>
<script>
import { computed } from 'vue';
export default {
  name: 'AcLoader',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isLoading = computed(() => {
      return props.loading;
    });

    return {
      isLoading
    };
  }
};
</script>
<style>
.loader {
	border-top-color: #3498db !important;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>
