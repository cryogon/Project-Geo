<template>
  <div>
    <button @click="returnToMap">returnToMap</button>
    <pre style="margin-block-start: 10rem">
      {{ user }}
    </pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$auth0.user,
    };
  },
  methods: {
    returnToMap() {
      this.$router.push("/map");
    },
  },
};
</script>
