<template>
  <img src="../../assets/loading.gif" class='myloading' v-if='isloading'>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      isloading: false,
    }
  },
  created() {
    this.beforeRequest();
    this.beforeResponse(300);
  },
  methods: {
    /**
     * [beforeRequest ajax拦截器 Request请求发送前]
     */
    beforeRequest() {
      this.$http.interceptors.request.use((config) => {
        this.isloading = true;
        return config;
      }, (error) => {
        return Promise.reject(error)
      })
    },
    /**
     * [beforeRequest ajax拦截器 Response数据返回前]
     * @param {Number} [delay] [持续时间 默认为0]
     */
    beforeResponse(delay = 0) {
      this.$http.interceptors.response.use((response) => {
        setTimeout(() => {
          this.isloading = false;
        }, delay)
        return response
      }, (error) => {
        return Promise.reject(error)
      })
    }
  }
}

</script>
<style type="text/css" scoped="scoped">
.myloading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 30%;
}

</style>
