<template>
  <div class="Ac-modal">
    <div class="modal animated fadeIn faster fixed z-50 pin bg-smoke-light w-5/6 pt-3 pb-3" style="overflow-x: hidden; overflow-y: auto;">
      <div class="animated border border-smoke-lighter border-solid fixed shadow-inner w-5/6 md:relative mx-auto bg-white md:rounded md:shadow flex flex-col">
        <div class="pt-4 pr-6 pb-4 pl-6 text-sm">
          <slot name="acModalBody"></slot>
        </div>
      </div>
    </div>
  </div>
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
  