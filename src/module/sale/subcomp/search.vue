<template>
  <div class="main_top">
    <div class="main_left">
      <el-input
        :placeholder="$t('saleSystem.search')"
        v-model.trim="search"
        @keyup.enter.delete.native="manageAdminUserListsearch"
      >
      </el-input>
      <el-button
        type="success"
        class="searchbutton green"
        @click="manageAdminUserListsearch"
        icon="el-icon-search"
      ></el-button>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      search: null
    };
  },
  mounted() {},
  // watch: {
  //   search: function() {
  //     this.$emit("manageAdminUserListsearch", this.search); //主要是通过$emit方法来实现传参的方式，第一个参数是自定义事件名称，第二个则是要传的数据
  //   }
  // },
  // created() {
  //   this.manageAdminUserListsearch();
  // },
  methods: {
    manageAdminUserListsearch() {
      this.$emit("manageAdminUserListsearch", this.search);
    }
  }
};
</script>