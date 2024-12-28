<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
        };
    },

};
</script>

<template>
    <h1>
        Single Product {{ id }}
    </h1>
</template>
