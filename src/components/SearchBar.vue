<template>
  <div class="border rounded overflow-hidden flex sm:mt-1">
    <input type="text" class="pr-4 pl-4 py-2 md:pl-2" placeholder="Search...">
    <button class="flex items-center justify-center pr-4 pl-4 border-l md:pl-2">
      <svg class="h-4 w-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
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