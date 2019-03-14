<template>
    <div>

        <div class="container_box">
            <div class="page_error_msg">
                <div class="inner">
                    <span class="icon_wrp">
                        <i class="icon_page_error"></i>
                    </span>
                    <div class="msg_content">

                        <h2>{{$t('login.email.noregister')}}
                            <a href="./login.html#/indexfree">{{$t('login.email.noregisterA')}}</a>
                            !</h2>

                    </div>
                </div>
            </div>
        </div>
        <!-- 
        <h4>邮箱激活过期，请
            <el-button type="text">重新注册！</el-button>
        </h4> -->
    </div>
</template>
<script>
</script>
<style>
.container_box {
  /* margin: 200px auto; */
  /* text-align: center; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.icon_page_error {
  background: url("../image/link.png") 0 0 no-repeat;
  width: 160px;
  height: 120px;
  vertical-align: middle;
  display: inline-block;
}
.page_error_msg h2 {
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}
a {
  color: #576b95;
  text-decoration: none;
}
</style>