<template>
  <div class="page-main page-bordered-top">
    <h1 class="page-title">{{ $t('groups.title') }}</h1>
    <span class="page-quick-action">
      <button class="btn btn-accent">
        <span class="material-icons">add_circle</span>
        <span>{{ $t('actions.add-user') }}</span>
      </button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'groups',
  computed: {
  },
};
</script>
