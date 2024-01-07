<template>
    <div>
        <table class="min-w-full bg-white border border-gray-300">
        <thead>
            <tr>
            <th class="py-2 px-4 border-b text-center" v-for="header in headerData" :key="header">
                {{ header }}
            </th>
            </tr>
        </thead>
        <!-- Table body -->
        <tbody>
            <!-- Loop through your data -->
            <tr v-for="(item, index) in paginatedData" :key="item.id" :class="{ 'bg-gray-100': index % 2 !== 0 }">
                <td class="py-2 px-4 border-b text-center">{{ index }}</td>
                <td class="py-2 px-4 border-b text-center">{{ item.name }}</td>
                <td class="py-2 px-4 border-b text-center">{{ item.userEmail }}</td>
                <td class="py-2 px-4 border-b text-center">{{ item.admin }}</td>
                <!-- Add more columns as needed -->
            </tr>
        </tbody>
        </table>

        <!-- Pagination -->
        <div class="mt-4 flex justify-end">
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
            :disabled="currentPage === 1"
            @click="currentPage--"
        >
            Prev
        </button>
        <div class="mx-2">{{ currentPage }} / {{ totalPages }}</div>
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
        >
            Next
        </button>
        </div>
    </div>
</template>   
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    name: "CustomTable",
    props: {
      tableData: {
        type: Array,
        default: () => [
        ],
      },
      headerData: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
    
    const itemsPerPage = 5;
    const CustomTableData = computed(() => { 
        console.log('updated table list --> ', props.tableData);
        return props.tableData;
    });
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(CustomTableData.value.length / itemsPerPage));

    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        console.log(CustomTableData.value.slice(start, end));
        return CustomTableData.value.slice(start, end);
    });
    // watch(() => props.tableData, () => {
    //     CustomTableData.value = props.tableData;
    //     console.log('Updated tableData:', props.tableData);
    // }, { immediate: true });
    // watch(() => CustomTableData.value, (newValue) => {
    //     CustomTableData.value = newValue;
    //     console.log('Updated tableData:', newValue);
    // }, { immediate: true });
    
  
      return {
        paginatedData,
        totalPages,
        currentPage,
        CustomTableData,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles or override Tailwind CSS classes here */
  </style>
  