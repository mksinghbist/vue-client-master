<template>
<div v-if="isAdmin" class="flex-grow text-gray-800">
    <AcNotificationVue></AcNotificationVue>
    <main class="p-6 sm:p-10 space-y-6">
        <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div class="mr-6">
            <h1 class="text-4xl font-semibold mb-2">Dashboard</h1>
        </div>
        </div>
        <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
            <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            </div>
            <div>
            <span class="block text-2xl font-bold">62</span>
            <span class="block text-gray-500">Students</span>
            </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
            <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            </div>
            <div>
            <span class="block text-2xl font-bold">6.8</span>
            <span class="block text-gray-500">Average mark</span>
            </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
            <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            </div>
            <div>
            <span class="inline-block text-2xl font-bold">9</span>
            <span class="inline-block text-xl text-gray-500 font-semibold">(14%)</span>
            <span class="block text-gray-500">Underperforming students</span>
            </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
            <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            </div>
            <div>
            <span class="block text-2xl font-bold">83%</span>
            <span class="block text-gray-500">Finished homeworks</span>
            </div>
        </div>
        </section>
        <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div class="mr-6">
                <h2 class="text-3xl font-semibold mb-1">User Details</h2>
            </div>
        </div>
        <CustomTable :tableDataLength="tableDataLength" :itemsPerPage="itemsPerPage"  @page-changed="handlePageChanged">
            <template v-slot:tableHeader>
                <th class="py-2 px-4 border-b text-center" v-for="header in tableIndex" :key="header">
                {{ header }}
                </th>
            </template>
            <template v-slot:tableBody>
                <tr v-for="(item, index) in paginationData" :key="item.id" :class="{ 'bg-gray-100': index % 2 !== 0 }">
                    <td class="py-2 px-4 border-b text-center">{{ index }}</td>
                    <td class="py-2 px-4 border-b text-center">{{ item.name }}</td>
                    <td class="py-2 px-4 border-b text-center">{{ item.userEmail }}</td>
                    <td class="py-2 px-4 border-b text-center">{{ item.admin }}</td>
                    <td class="py-2 px-4 border-b text-center">
                        <select>
                        <option value="enable">Enable</option>
                        <option value="disable">Disable</option>
                        </select>
                    </td>
                </tr>
            </template>
        </CustomTable>
    </main>
</div>
</template>
<script>
import { computed , ref, onMounted, onBeforeUnmount} from 'vue';
import CustomTable from '../common/CustomTable.vue';
import { fetchDataFromApi } from '@/services/apiService'; 
import { useStore } from 'vuex';
import AcNotificationVue from '../common/AcNotification.vue';
export default {
    name : 'AdminPanel',
    components : { CustomTable, AcNotificationVue },
    props: {},
    setup () {
        const screenWidth = ref(window.innerWidth);
        const tableIndex = ref(['Id','Name', 'Email', 'Admin Status','Status']);
        const customerData = ref([]);
        const itemsPerPage = 4 ;
        const currentPage = ref(1);
        const store = new useStore();
        const handlePageChanged = (cPageValue) => {
            currentPage.value = cPageValue;
        }
        const handleResize = () => {
            screenWidth.value = window.innerWidth;
        };
        const fetechUser = async () => {
            try {
                const data = await fetchDataFromApi('users');
                customerData.value = data.users;
            } catch (error) {
                customerData.value = [];
            }
        };
        const tableBodyData = computed(() => customerData.value );
        const paginationData = computed(() => {
          const start = (currentPage.value - 1) * itemsPerPage;
          const end = start + itemsPerPage;
          return tableBodyData.value.slice(start, end);
      });
      const tableDataLength = computed(() => tableBodyData.value.length);
        onMounted(async () => {
            window.addEventListener('resize', handleResize);
            await fetechUser();
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize);
        });

        // You can use screenWidth.value in your component logic
        const isScreenlg = computed(() => {
            return screenWidth.value > 768;
        });
        const isAdmin = computed(() => {
            console.log('admin  checking -->', store.state.isAdmin);
           return store.state.isAdmin
        });
        onMounted(() => {

        })
        return {
            isScreenlg,
            tableIndex,
            paginationData,
            itemsPerPage,
            handlePageChanged,
            tableDataLength,
            isAdmin
        };
    }
}
</script>