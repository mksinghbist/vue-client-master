<template>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12 mb-4"></div>
  </div>
</template>
<script>
import { onMounted, onUnmounted , ref } from 'vue';
import eventBus from '../../common/eventBus';
export default {
  name: 'AcLoader',
  setup() {
    const isLoading = ref(false);

    // Listen for showLoader and hideLoader events
    const showLoaderHandler = () => {
      isLoading.value = true;
    };

    const hideLoaderHandler = () => {
      console.log("calling showloader");
      isLoading.value = false;
    };

    onMounted(() => {
      eventBus.on('showLoader', showLoaderHandler);
      eventBus.on('hideLoader', hideLoaderHandler);
    });

    onUnmounted(() => {
      eventBus.off('showLoader', showLoaderHandler);
      eventBus.off('hideLoader', hideLoaderHandler);
    });

    return { isLoading };
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
