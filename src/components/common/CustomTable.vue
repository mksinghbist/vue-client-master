<template>
  <div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <slot name="tableHeader"></slot>
          </tr>
        </thead>
        <tbody>
          <slot name="tableBody"></slot>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="tableDataLength !== 0 && itemsPerPage !== 0" class="mt-4 flex justify-end">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-md"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Prev
      </button>
      <div class="mx-2">{{ currentPage }} / {{ totalPages }}</div>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-md"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: "CustomTable",
  props: {
    tableDataLength: {
      type: Number,
      default: 0,
    },
    itemsPerPage: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const currentPage = ref(1);

    const totalPages = computed(() => Math.ceil(props.tableDataLength / props.itemsPerPage));

    const goToPage = (page) => {
      currentPage.value = page;
      emit('page-changed', currentPage.value); // Emitting the 'page-changed' event
    };

    // Emit the initial page value when the component is mounted
    onMounted(() => {
      emit('page-changed', currentPage.value);
    });

    return {
      totalPages,
      currentPage,
      goToPage,
    };
  },
};
</script>
