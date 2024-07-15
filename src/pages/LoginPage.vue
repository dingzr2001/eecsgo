<template>
  <div class="whole-page">
    <el-card class="login-box">
      <div class="flex-box">

      
        <div class="left-image">
          <img src="@/assets/export.png" width="100%" style="border-radius: 10px;"/>
        </div>
        <div class="right-form">
          <h2>登录 | 注册</h2>
          <el-form ref="loginData" :model="loginData" :rules="rules">
            <el-form-item prop="email">
              <!-- <el-col :span="16"> -->
              <el-input v-model="loginData.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
              <!-- </el-col> -->
            </el-form-item>
            <el-form-item class="password" prop="password">
              <el-input v-model="loginData.password" show-password placeholder="请输入密码" @keyup.enter.native="handleLogin">
              </el-input>
            </el-form-item>
            <el-form-item class="rememberMe" style="text-align:left;">
              <el-checkbox v-model="rememberMe" >记住我</el-checkbox>
            </el-form-item>
            <el-form-item prop="submit" style="text-align:left;">
              <el-button type="primary" @click="handleLogin" style="width: 45%; margin-right: 10px;">登录</el-button>
              <router-link class="list-group-item" active-class="active" to="/register">
                <el-button type="plain" style="width: 50%;" @click="jumpToRegister">没有账号？去注册</el-button>
              </router-link>
            </el-form-item>

          </el-form>
        </div>
      </div>
    
  </el-card>
  </div>
  
  
</template>

<script>
import request from '@/request/request';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      showPassword: false,
      rememberMe: false
    }
  },
  methods: {
    handleLogin() {
      if (!this.loginData.email || !this.loginData.password) {
        Message({
          message: '邮箱或密码不能为空',
          type: 'error',
          customClass: 'message-global',
        });
        return;
      }
      request.post("/login", this.loginData).then(res => {
        const result = res.data;
        if (result.code === 200) {
          
          Message({
            message: '登录成功',
            type: 'success',
            customClass: 'message-global',
          });
          const payload = {
            rememberMe: this.rememberMe,
            Authorization: result.data.token,
            user: result.data.user
          };
          console.log("commit之前是", payload.Authorization);
          this.$store.commit('handleLogin', payload);
          this.$router.push('/');
        } else {
          Message({
            message: result.msg,
            type: 'error',
            customClass: 'message-global',
          });
        }
      })
    },
    jumpToRegister(){
      this.$router.push("/register")
    }
  }  
}
</script>

<style>
.whole-page{
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box{

  width: 60%;
}
.flex-box{
  display: flex; 
  flex-direction: row;
  height: 100%;
  
}
.left-image{
  flex: 18;
  
}
.right-form{
  flex: 12;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.right-form > el-form > el-form-item{
  margin-left: 0;
}
</style>