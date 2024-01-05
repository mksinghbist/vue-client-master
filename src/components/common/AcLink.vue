<template>
    <div>
        <a :href="href" class="bg-green-400 hover:bg-green-500 duration-300 font-sm text white rounded py-1.5 px-4 btn"><slot></slot></a>
    </div>
</template>
<script>
export default {
    name: 'acButton', 
    props : {
        href : {
          type : String,
          default : ""
        }
    } 
}
</script>