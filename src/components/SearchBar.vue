<script lang="ts">
export default {
  props: {
    searchString: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  methods: {
    emitUpdateSearchString(event: Event) {
      const inputElement = event.target as HTMLInputElement
      const value = inputElement.value
      this.$emit('update:value', value)
    },
  },
}
</script>

<template>
  <input
    class="search-input"
    type="text"
    :placeholder="placeholder"
    :value="searchString"
    @input="emitUpdateSearchString"
  />
</template>

<style scoped>
.search-input {
  border: 1px solid black;
  border-radius: 2px;
  width: 100%;
  padding: 2vh;
}

.search-input:hover {
  background-color: rgb(128, 128, 128, 0.1);
}
</style>
