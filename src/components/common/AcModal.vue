<template>
  <div class="Ac-modal">
    <div @click="onToggle" class="modal animated fadeIn faster fixed z-50 pin bg-smoke-light w-5/6  pt-3 pb-3" style="overflow-x:hidden; overflow-y:auto;">
      <div class="animated border border-smoke-lighter border-solid fixed shadow-inner w-5/6 md:relative mx-auto bg-white md:rounded md:shadow flex flex-col">
        <div class="flex justify-between border-b border-grey-lighter border-solid">
          <span @click="onToggle" class="flex flex-col justify-center pr-4">
            <svg class="h-6 w-6 font-hairline text-grey hover:text-grey-lighter" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>

        <div class="pt-4 pr-6 pb-4 pl-6 text-sm">
          <slot name="acModalBody"></slot>
        </div>
      </div>
    </div>
  </div>
    <!-- <transition name="fade">
      <div v-if="isModalVisible" >
        <div
          @click="onToggle"
          class="absolute bg-black opacity-70 inset-0 z-0"
        ></div>
        <div
        class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
        >
          <div>
            <div class="text-center p-3 flex-auto justify-center leading-6">
              <slot name="acModalBody"></slot>
            </div>
            <div class="p-3 mt-2 text-center space-x-4 md:block">
              <button
                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
              >
                Save
              </button>
              <button
                @click="onToggle"
                class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition> -->
</template>
  
<script>
  import { computed, ref } from 'vue';
  export default {
    name: "AcModal",
    props: {
      isModalOpen : {
        type : Boolean,
        default: false,
      }
    },
    setup(props, { emit }) {
      const isOpen = ref(props.isModalOpen);

      const onToggle = () => {
        isOpen.value = !isOpen.value;
        emit('handleModal', isOpen.value);
      };

      const isModalVisible = computed(() => {
        return isOpen.value;
      });

      return {
        onToggle,
        isModalVisible,
        isOpen,
      };
    },
  };
</script>
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 500ms ease-out;
  }

  </style>
  