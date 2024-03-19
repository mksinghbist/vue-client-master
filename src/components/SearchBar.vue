<template>
    <div class="border rounded overflow-hidden flex sm:mt-1">
      <input type="text" v-model="searchQuery" @input="handleInput" class="flex-1 pr-4 pl-4 py-2 text-black md:pl-2" placeholder="Search...">
      <button class="search-btn"><i class="fas fa-search"></i></button>
    </div>
    <ul v-if="showSuggestions" class="suggestions-list">
      <li v-for="suggestion in filteredSuggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">{{ suggestion }}</li>
    </ul>
</template>
<script>
    import { ref, computed } from 'vue';
    export default {
        name: 'SearchBar',
        components : { },
        props: {
        },
        setup() {
          const searchQuery = ref('');
          const suggestions = []; // Array of suggestions
          const showSuggestions = ref(false);

          const filteredSuggestions = computed(() => {
            return suggestions.filter(suggestion => suggestion.toLowerCase().includes(searchQuery.value.toLowerCase()));
          });

          const handleInput = () => {
            if (searchQuery.value.length >= 3) {
              console.log('searchQuery value --->',searchQuery.value);
              showSuggestions.value = true;
            } else {
              showSuggestions.value = false;
            }
          };

          const selectSuggestion = (suggestion) => {
            searchQuery.value = suggestion;
            showSuggestions.value = false;
          };

          return {
            searchQuery,
            suggestions,
            showSuggestions,
            filteredSuggestions,
            handleInput,
            selectSuggestion
          };
        }
};
</script>

<style>
.search-btn {
    background-color: transparent;
    font-size: 18px;
    padding: 6px 9px;
    margin-left:-45px;
    border:none;
    color: #6c6c6c;
    transition: all .4s;
    z-index: 10;
}
</style>