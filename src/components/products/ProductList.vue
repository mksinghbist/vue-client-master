<template>
    <div class="p-4 m-4 table-auto mx-auto">
        <AcButton buttonType="text" @click="onClickButton" class="mb-4">Adding Product</AcButton>
        <AcModal v-if="isModalOpen" :is-modal-open="isModalOpen" @handleModal="isModalClose">
            <template v-slot:acModalBody>
                <ProductInsert></ProductInsert>
            </template>
        </AcModal>
        <CustomTable :tableDataLength="tableDataLength" :itemsPerPage="itemsPerPage"  @page-changed="handlePageChanged">
            <template v-slot:tableHeader>
                <th class="py-2 px-4 border-b text-center" v-for="header in tableIndex" :key="header">
                {{ header }}
                </th>
            </template>
            <template v-slot:tableBody>
                <tr v-for="(item, index) in paginationData" :key="item.id" :class="{ 'bg-gray-100': index % 2 !== 0 }">
                    <td class="py-2 px-4 border-b text-center">{{ index }}</td>
                    <td class="py-2 px-4 border-b text-center">
                        <img class="w-10" :src="item.productImgUrl"/>
                    </td>
                    <td class="py-2 px-4 border-b text-center">{{ item.productTitle }}</td>
                    <td class="py-2 px-4 border-b text-center">
                        <input type="text" class="rounded-md" v-model=item.productPrice />
                    </td>
                    <td class="py-2 px-4 border-b text-center">
                        <input type="text" class="rounded-md" v-model=item.productQty />
                    </td>
                    <td class="py-2 px-4 border-b text-center">
                        <input type="text" class="rounded-md" v-model=item.productMinQty />
                    </td>
                    <td class="py-2 px-4 border-b text-center">
                        <input type="text" class="rounded-md"  v-model=item.productMaxQty />
                    </td>
                    <td class="py-2 px-4 border-b text-center">{{ item.productSoldQty }}</td>                    
                    <td class="py-2 px-4 border-b text-center">
                        <select class="rounded-md" v-model="item.productStatus">
                        <option :value="true">Enable</option>
                        <option :value="false">Disable</option>
                        </select>
                    </td>
                </tr>
            </template>
        </CustomTable>
    </div>
</template>
<script>
import { computed,ref,onMounted} from 'vue';
import { fetchDataFromApi } from '@/services/apiService';
import CustomTable from '../common/CustomTable.vue'
import AcButton from '../Button.vue';
import AcModal from '../common/AcModal.vue'
import ProductInsert from './ProductInsert.vue';
export default {
    name : 'ProductList',
    components: { CustomTable,AcButton,AcModal,ProductInsert },
    setup () {
        const productList = ref([]);
        const newProductList = computed(() => productList.value);
        const tableIndex = ref(['Id','Image', 'Name','Price', 'Quantity','Minimum Qty', 'Maximum Qty', "Sold Qty",'Status']);
        const itemsPerPage = 10;
        const currentPage = ref(1);
        const modalOpen = ref(false);

        const handlePageChanged = (cPageValue) => {
            currentPage.value = cPageValue;
        }

        const fetechProductList = async () => {
            try {
                const data = await fetchDataFromApi('products/list');
                productList.value = data.productList;
                console.log(productList.value);
            } catch (error) {
                productList.value = [];
            }
        }
        const paginationData = computed(() => {
          const start = (currentPage.value - 1) * itemsPerPage;
          const end = start + itemsPerPage;
          return newProductList.value.slice(start, end);
        });
        const onClickButton = () => {
            modalOpen.value = true;
            console.log('user click on button', modalOpen.value);
        };
        const isModalClose = (val) => {
            modalOpen.value = val;  
        }
        const isModalOpen = computed(() => {
            console.log('user click on button', modalOpen.value);
            return modalOpen.value;
        });

        const tableDataLength = computed(() => newProductList.value.length);

        onMounted(() => {
            fetechProductList();
        });
        return {
            newProductList,
            tableIndex,
            itemsPerPage,
            tableDataLength,
            handlePageChanged,
            paginationData,
            onClickButton,
            isModalOpen,
            isModalClose
        }
    }
}
</script>

<style scoped>
    input {
        border: 2px solid #CCC;
        width: 80px;
        text-align: center;
    }
</style>
