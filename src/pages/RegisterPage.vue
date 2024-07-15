<template>
  <div class="whole-page">
    <el-card class="register-card">
      <div class="logo">
        <img src="@/assets/logo.png" width="50%"/>
      </div>
      <el-form :model="registerForm" ref="registerForm" :rules="formRules" label-width="80px" style="width:80%">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" placeholder="起个好听的名字吧！中英文均可"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱(Email)">
            <template slot="append">
              <el-button @click="sendVerification">
                <span v-if="sendCountdown <= 0">发送验证码</span>
                <span v-else>已发送({{sendCountdown}}s)</span>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="验证码">
          <el-input v-model="registerForm.verification" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="确认密码">
          <el-input v-model="confirmPassword" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="card-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-card>
  </div>

</template>

<script>
import request from '@/request/request'
import { Message } from 'element-ui';
export default {
  data(){
    return{
      username: '',
      registerForm: {
        email: '',
        username: '',
        password: '',
        verificationCode: ''
      },
      confirmPassword: '',
      //用于表单验证的数据
      formRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {validator: this.emailValidator, trigger: 'blur'}
        ]
      },
      //用于渲染的数据
      sendCountdown: 0
    }
  },
  methods: {
    sendVerification(){
      
        this.$refs.registerForm.validate((valid)=>{
          if(valid){
            request.post("/register/verification", {email: this.registerForm.email}).then(response => {
              const res = response.data
              if(res.code == 200){
                this.startCountdown();
              } else{
                Message({
                  message: '出了点错误！请稍后重试一下吧~',
                  type: 'error',
                  customClass: 'message-global',
                });
              }
            }).catch(error=>{
              console.log(error);
              Message({
                message: '出了点异常！请稍后重试一下吧~',
                type: 'error',
                customClass: 'message-global',
              });
            })
          } else{
            Message({
              message: "输入格式不正确~",
              type: 'error',
              customClass: 'message-global',
            });
          }
        })
      
    },
    handleSubmit(){
      this.$refs.registerForm.validate((valid)=>{
        if(valid){
          request.post("/register/register", this.registerForm).then(response => {
            const res = response.data
            if(res.code == 200){
              Message({
                message: '注册成功！',
                type: 'success',
                customClass: 'message-global',
              });
            } else{
              Message({
                message: res.msg,
                type: 'error',
                customClass: 'message-global',
              });
            }
          }).catch(error=>{
            console.log(error);
            Message({
              message: '出了点异常！请稍后重试一下吧~',
              type: 'error',
              customClass: 'message-global',
            });
          })
        } else{
          Message({
            message: "输入格式不正确~",
            type: 'error',
            customClass: 'message-global',
          });
        }
      })
    },
    //发送邮件后倒计时的功能
    startCountdown(){
      this.sendCountdown = 60;
      const intervalId = setInterval(()=>{
        if(this.sendCountdown > 0){
          this.sendCountdown --;
        } else{
          clearInterval(intervalId);
        }
      }, 1000)
    },
    emailValidator(rule, value, callback){
      console.log("value是:",value)
      if(value == null || value == ''){
        callback(new Error("邮箱不能为空！"));
      }else{
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if(reg.test(value) == true)
          callback();
        else
          callback(new Error("邮箱格式不正确！"));
      }
    },
    // checkVerificationCode(){
    //   request.
    // }
  }
}
</script>

<style>
.register-card{
  width: 40%
}
</style>