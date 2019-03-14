<template>
  <div class="listbox">
    <div class="listword">
      {{$t('saleSystem.saleList')}}
    </div>
    <div class="listbutton">
      <el-button
        class="user"
        @click="exportManageAdminUserList"
        :loading="exportloading"
      >{{$t('saleSystem.exportList')}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["exportloading"],
  methods: {
    exportManageAdminUserList() {
      this.$emit("exportManageAdminUserList");
    }
  }
};
</script>

