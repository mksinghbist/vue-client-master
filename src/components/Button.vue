<template>
    <div class="acButton">
        <button :type="buttonType" class="bg-green-400 hover:bg-green-500 duration-300 font-sm text-white rounded btn sm:text-sm md:text-base lg:text-lg xl:text-xl" :class="padding">
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
        },
        padding: {
            type : String,
            default:"p-2",
        }
    }, 
}
</script>