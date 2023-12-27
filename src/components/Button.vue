<template>
    <div>
        <button :type="bType" class="bg-green-400 hover:bg-green-500 duration-300 font-sm text white rounded py-1.5 px-4 btn"><slot></slot></button>
    </div>
</template>
<script>
export default {
    name: 'acButton', 
    props : {
        bType : {
          type : String,
          default : "submit"
        }
    } 
}
</script>