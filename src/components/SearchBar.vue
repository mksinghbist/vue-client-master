<template>
  <div class="border rounded overflow-hidden flex sm:mt-1">
      <input type="text" class="flex-1 pr-4 pl-4 py-2 md:pl-2" placeholder="Search...">
      <button class="flex-shrink-0 w-1/10 flex items-center justify-center pr-4 pl-4 border-l md:pl-2">
          <i class="fas fa-sync-alt text-grey-dark"></i>
      </button>
  </div>
</template>
<script>
    export default {
        name: 'SearchBar',
        components : { },
        props: {
        }
    }
  </script>