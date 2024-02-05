<template>
    <div class="acButton">
        <button :type="buttonType" class="bg-green-400 hover:bg-green-500 duration-300 font-sm text-white rounded py-1 px-1 btn sm:text-sm md:text-base lg:text-lg xl:text-xl">
            <slot></slot>
        </button>
    </div>
</template>
<script>
export default {
    name: 'AcButton', 
    props : {
        buttonType : {
          type : String,
          default : "submit"
        }
    }, 
}
</script>