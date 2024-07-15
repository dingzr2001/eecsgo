<template>
  <el-container>
      <el-header>
        <!-- 导航栏组件 -->
        <GlobalHeader />
      </el-header>
      <el-container>
        <el-aside style="text-align: center; width: 400px;" v-if="isLogin == true">
          <div class="left-image">
              <img src="@/assets/yellow_stroke.png" width="50%" style="border-radius: 10px;"/>
            </div>
          <h1>哈喽，{{ username }}</h1>
          <h4>邮箱<span><i class="el-icon-arrow-right"></i></span>{{ email }}</h4>
          <el-button @click="jumpToAdmin">管理员系统</el-button>
          <el-button @click="handleLogout">退出登录</el-button>
          
        </el-aside>
        <el-main>
          <div v-if="isLogin == false">
            <div class="left-image">
              <img src="@/assets/yellow_stroke.png" width="10%" style="border-radius: 10px;"/>
            </div>
            <h1>您好，游客，您还未登录</h1>
            登录后可以查看录取数据、分享录取数据，还能将自己的数据保存在账号中。
            <el-button type="primary" round @click="handleLogin">去登录/注册</el-button>
          </div>

          <div v-if="isLogin == true">
            <div style="text-align: left;">
              <h1>我的背景数据 
                <span><i class="el-icon-caret-bottom"></i></span>
                <el-button style="vertical-align:middle;  float: right;" type="primary" icon="el-icon-plus" round @click="dialogVisible = true">新建</el-button>
              </h1>

            </div>
            <el-card class="bg-card" v-for="bg in bgList" :key="bg.id">
              <div slot="header" class="bg-card-header" >
                <span>创建于 {{ bg.createDate }}</span>
                <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
              </div>
              <el-row>

                <el-col class="bg-form-title" :span="6">本科学校</el-col>
                <el-col class="bg-form-title" :span="3">本科专业</el-col>
                <el-col class="bg-form-title" :span="3">本科双学位</el-col>
                <el-col class="bg-form-title" :span="3">本科辅修</el-col>
                <el-col class="bg-form-title" :span="2">GPA</el-col>
                <el-col class="bg-form-title" :span="2">均分</el-col>
                <el-col class="bg-form-title" :span="2">语言考试</el-col>
                <el-col class="bg-form-title" :span="3">GRE</el-col>

                <el-col class="bg-form-content" :span="6">{{bg.undergradUniversity}}</el-col>
                <el-col class="bg-form-content" :span="3">{{bg.undergradMajor}}</el-col>
                <el-col class="bg-form-content" :span="3">{{bg.undergradDual}}</el-col>
                <el-col class="bg-form-content" :span="3">{{bg.undergradMinor}}</el-col>

                <el-col class="bg-form-content" :span="2">{{bg.gpa}}/{{bg.gpaScale}}</el-col>
                <el-col class="bg-form-content" :span="2">{{bg.avg}}</el-col>
                <el-col class="bg-form-content" :span="2">{{bg.languageType}}: {{bg.languageOverall}}</el-col>
                <el-col class="bg-form-content" :span="3">{{bg.gre}}={{bg.greV}}+{{bg.greQ}}+{{bg.greAw}}</el-col>

              </el-row>
              <el-row>
                <el-col class="bg-form-title" :span="8">推荐信</el-col>
                <el-col class="bg-form-title" :span="8">论文发表</el-col>
                <el-col class="bg-form-title" :span="8">科研经历</el-col>
                <el-col class="bg-form-content" :span="8">{{bg.rl}}</el-col>
                <el-col class="bg-form-content" :span="8">{{bg.pub}}</el-col>
                <el-col class="bg-form-content" :span="8">{{bg.research}}</el-col>
              </el-row>
              <el-row>
                <el-col class="bg-form-title" :span="8">实习经历</el-col>
                <el-col class="bg-form-title" :span="8">交换经历</el-col>
                <el-col class="bg-form-title" :span="8">项目/比赛经历</el-col>
                <el-col class="bg-form-content" :span="8">{{bg.internship}}</el-col>
                <el-col class="bg-form-content" :span="8">{{bg.exchange}}</el-col>
                <el-col class="bg-form-content" :span="8">{{bg.project}}</el-col>
              </el-row>

            </el-card>
          </div>

          <el-dialog class="createBgDialog" title="请描述一下您的背景" :visible.sync="dialogVisible" width="80%">
            <el-form class="addBgForm" :model="addBgForm" :rules="createFormRules" ref="addBgForm" label-width="120px" >
              <div class="form-two-column">
                <div class="form-column-left">
                    <el-form-item label="本科学校" prop="undergradUniversity">
                      <el-input v-model="addBgForm.undergradUniversity" placeholder="请尽量给出学校全称，避免歧义，例如SCU即可以代表四川大学也可以代表Santa Clara University" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="本科专业">
                      <el-col :span="8">
                        <el-form-item label="" prop="undergradMajor" label-width="0">
                          <el-input v-model="addBgForm.undergradMajor" placeholder="Major, 中英文均可，例：CS, DS, 统计" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="" prop="undergradDual" label-width="10px">
                          <el-input v-model="addBgForm.undergradDual" placeholder="第二学位(Dual)" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="" prop="undergradMinor" label-width="10px">
                          <el-input v-model="addBgForm.undergradMinor" placeholder="辅修(Minor)" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    
                    
                    <el-form-item label="" label-width="0" prop="scoreForm">
                      <el-col :span="16">
                        <el-form-item label="本科绩点" prop="gpaForm">
                          <el-col :span="11">
                            <el-form-item label="" prop="gpa" label-width="0">
                              <el-input v-model="addBgForm.gpa" autocomplete="off"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2" style="text-align: center;">/</el-col>
                          <el-col :span="11">
                            <el-form-item label="" prop="gpaScale" label-width="0">
                              <el-input v-model="addBgForm.gpaScale" autocomplete="off"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="百分制成绩" label-width="100px" prop="avg">
                          <el-input v-model="addBgForm.avg" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    
                    <el-form-item label="语言考试类型" prop="languageType">
                      <el-select v-model="addBgForm.languageType">
                        <el-option
                          v-for="item in languageTypeEnum"
                          :key="item.key"
                          :label="item.label"
                          :value="item.key">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item prop="languageForm" label="语言成绩" v-if="addBgForm.languageType != null && addBgForm.languageType!= 4">
                    
                    
                    <el-col :span="4">
                      <el-form-item prop="languageOverall">
                        <el-input placeholder="总分" v-model="addBgForm.languageOverall" :disabled="addBgForm.languageType == 4"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="4">
                      <el-form-item prop="reading">
                        <el-input placeholder="阅读" v-model="addBgForm.reading" :disabled="addBgForm.languageType == 4"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="4">
                      <el-form-item prop="listening">
                        <el-input placeholder="听力" v-model="addBgForm.listening" :disabled="addBgForm.languageType == 4"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="4">
                      <el-form-item prop="writing">
                        <el-input placeholder="写作" v-model="addBgForm.writing" :disabled="addBgForm.languageType == 4"></el-input>
                      </el-form-item> 
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="4">
                      <el-form-item prop="speaking">
                        <el-input placeholder="口语" v-model="addBgForm.speaking" :disabled="addBgForm.languageType == 4"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="GRE分数">
                    <el-checkbox v-model="hasGRE" label="有且使用" @change="handleGRE" border></el-checkbox>
                  </el-form-item>
                  <el-form-item prop="greForm" label="GRE分数" v-if="hasGRE">
                    <el-col :span="2">{{ addBgForm.greQ + addBgForm.greV }}</el-col>
                    <el-col class="line" :span="2">=</el-col>
                    <el-col :span="5">
                      <el-form-item prop="greV">
                        <el-input placeholder="Verbal" v-model.number="addBgForm.greV"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">+</el-col>
                    <el-col :span="5">
                      <el-form-item prop="greQ">
                        <el-input placeholder="Quantitative" v-model.number="addBgForm.greQ"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="3">AW: </el-col>
                    <el-col :span="5">
                      <el-form-item prop="greAw">
                        <el-input placeholder="Analytical Writing" v-model="addBgForm.greAw"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </div>
                <div class="form-column-right">
                  <el-form-item label="推荐信">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="addBgForm.rl"
                      maxlength="30"
                      show-word-limit
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="交换经历">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="addBgForm.exchange"
                      maxlength="30"
                      show-word-limit
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="论文发表">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="addBgForm.pub"
                      maxlength="30"
                      show-word-limit
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="科研经历">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="addBgForm.research"
                      maxlength="30"
                      show-word-limit
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="实习经历">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="addBgForm.internship"
                      maxlength="30"
                      show-word-limit
                    >
                    </el-input>
                    
                  </el-form-item>
                  <el-form-item label="项目/比赛经历">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="addBgForm.project"
                      maxlength="30"
                      show-word-limit
                    >
                    </el-input>
                  </el-form-item>
                  
                </div>
              </div>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddBg">确 定</el-button>
                  </div>
          </el-dialog>
        </el-main>
      </el-container>
  </el-container>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader.vue';
import request from '@/request/request';
import store from '@/store';
import { Message } from 'element-ui';

export default {
  components: {GlobalHeader},
  data() {
    return {
      isLogin: false,
      username: "您还未登录",
      email: "",
      registerDate: "",
      userInfo: null,
      addBgForm: {
        undergradUniversity: '',
        undergradMajor: '',
        undergradDual: '',
        undergradMinor: '',
        avg: null,
        gpa: null,
        gpaScale: null,
        languageType: null,
        languageOverall: null,
        listening: null,
        reading: null,
        speaking: null,
        writing: null,
        greV: null,
        greQ: null,
        greAw: null,
        exchange: '',
        pub: '',
        research: '',
        internship: '',
        project: '',
        rl: ''
      },  
      bgList: [],
      hasGRE: false,
      //渲染控制数据
      dialogVisible: false,
      languageTypeEnum: [
        { key: 1, label: "TOEFL" }, 
        { key: 2, label: "IELTS" },
        { key: 3, label: "Duolinguo" },
        { key: 4, label: "Waive" }
      ],
      //表单验证数据
      createFormRules: {
        undergradUniversity: [{required: true, message: '请输入本科学校', trigger: 'blur'}],
        undergradMajor: [{ required: true, message: '请输入本科专业', trigger: 'blur' }],
        gpa: [{ required: true, message: '请输入GPA', trigger: 'blur' }],
        gpaScale: [{ required: true, message: '请输入GPA最大值（满绩绩点）', trigger: 'blur' }],
        avg: [{ required: true, message: '请输入百分制成绩', trigger: 'blur' }],
        languageType: [{required: true, message: '请选择语言考试类型', trigger: 'blur'}],
        
        
        languageOverall: [{ validator: (rule, value, callback) => { this.validateLanguage(rule, value, callback, this.addBgForm.languageType, true) }, trigger: 'blur' }],
        reading: [{ validator: (rule, value, callback) => { this.validateLanguage(rule, value, callback, this.addBgForm.languageType, false) }, trigger: 'blur' }],
        listening: [{ validator: (rule, value, callback) => { this.validateLanguage(rule, value, callback, this.addBgForm.languageType, false) }, trigger: 'blur' }],
        writing: [{ validator: (rule, value, callback) => { this.validateLanguage(rule, value, callback, this.addBgForm.languageType, false) }, trigger: 'blur' }],
        speaking: [{ validator: (rule, value, callback) => { this.validateLanguage(rule, value, callback, this.addBgForm.languageType, false) }, trigger: 'blur' }],
      },
    }
  },
  
  methods: {
    handleLogin() {
      this.$router.push('/login')
    },
    handleGRE(value) {
      if (value == false) {
        // this.addBgForm.greV = 0;
        // this.addBgForm.greQ = 0;
        // this.addBgForm.greAw = 0;
        console.log("");
      }
    },
    validateLanguage: (rule, value, callback, languageType, isOverall) => {
      //必须大于0
      console.log("进来了", value)
      if (languageType == 4) {
        callback();
      } else if (!value || value == "") {
        callback(new Error("不能为空"));
      } else {
        if (languageType == 1) {
          const intRegex = /^\d+$/;
          if (intRegex.test(value) == false) {
            callback(new Error("请输入有效的数字"))
          } else {
            const score = parseInt(value)
            if (isOverall == true && score > 120 || score < 0) {
              callback(new Error("请输入有效的托福成绩"))
            } else if (isOverall == false && score > 30 || score < 0) {
              callback(new Error("请输入有效的托福成绩"))
            } else {
              callback();
            }
          } 
        } else if (languageType == 2) {
          const ieltsScoreSet = new Set([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]);
          const decimalRegex = /^\d+(.\d+)?$/;  // eslint-disable-line
          if (decimalRegex.test(value) == false) {
            callback(new Error("请输入有效的数"))
          } else if (ieltsScoreSet.has(parseFloat(value)) == false) {
            callback(new Error("请输入有效的雅思成绩"))
          } else {
            callback();
          }
        }
      }
    },
    submitAddBg() {
      this.$refs.addBgForm.validate((valid) => {
      if (valid) {
        // Form is valid, proceed with submission
        request.post('/user/bg/add', this.addBgForm).then(response => {
        const res = response.data;
          if (res.code == 200) {
            Message({
              message: '提交成功',
              type: 'success',
              customClass: 'message-global',
            });
            this.dialogVisible = false;
          }
          else {
            Message({
              message: res.msg,
              type: 'error',
              customClass: 'message-global',
            });
          }
         }).catch(error => {
          console.log(error);
        });
        } else {
          // Form is invalid, handle the error
          Message({
            message: "输入格式不正确~",
            type: 'error',
            customClass: 'message-global',
          });
        }
      });
    },
    handleLogout(){
      this.$store.commit("handleLogout");
      this.isLogin = false;
    },
    jumpToAdmin(){
      this.$router.push('/admin/programs')
    }
  },
  beforeRouteEnter: async (to, from, next) => {
    const getRequestParams = {
      id: store.state.user ? store.state.user.id : ''
    }
    // request.get('/user', {params: getRequestParams}).then(response => {
    //   res = response.data
    //   console.log("收到了响应", res)

    //   if (res.code == 200) {
    //     success = true;
    //     request.get("user/bg").then(bgResponse => {
    //       bgRes = bgResponse.data;
    //       console.log("触发了内层请求,", bgRes)
    //       if (bgRes.code == 200) {
    //         console.log("获取到用户数据");
    //       } else {
    //         console.log("出错了，可能是用户未登录")

    //       }
    //     }).catch(error => {
    //       console.log(error)
    //     });

    //   } else {
    //     console.log("出错了，可能是用户未登录")

    //   }
    // }).catch(error => {
    //   console.log(error)
    // });
    // console.log("这里会执行")
    try {
      const userResponse = await request.get('/user', { params: getRequestParams });
      const userRes = userResponse.data;
      const bgResponse = await request.get("user/bg");
      const bgRes = bgResponse.data;
      console.log(userRes.code, "+", bgRes.code)
      if (userRes.code == 200 && bgRes.code == 200) {
        next(vm => {
          console.log("进入路由守卫")
          vm.isLogin = true;
          vm.username = userRes.data.username;
          vm.email = userRes.data.email;
          vm.bgList = bgRes.data;
        });
      }else {
        next(vm => {
            vm.isLogin = false;
          });
      }
    } catch {
      next(vm => {
            vm.isLogin = false;
          });
    }
    
        
  }
}
</script>

<style>
.el-descriptions-item .el-descriptions-item__cell {
    text-align: center;
  }

  .el-form-item__label-wrap {
  margin-left: 0px !important;
  text-align: left;
}
  .el-form-item__content {
  text-align: left;
}

.form-two-column{
  display: flex;
}

.form-column-left{
  width: 50%;
}
.form-column-right{
  width: 50%;
}
.line{
  text-align: center;
}
.bg-form-title{
  border: 1px solid #000;
  font-weight: bold;
  background-color:lightsteelblue;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 35px;
}

.bg-form-content{
  border: 1px solid #000;
  background-color:ghostwhite;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 50px;
}
/* .createBgDialog{
  width: 2000px;
} */
 .bg-card{
  margin-top: 10px;
  margin-bottom: 10px;
 }
</style>                  