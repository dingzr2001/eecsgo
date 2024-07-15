<template>
  <el-container>
    <el-header>
      <global-header />
    </el-header>
    <el-container>
      <el-aside>
        <h2>你好，管理员</h2>
      </el-aside>
      <el-main>
        <el-card v-for="auditProgram in auditProgramList" :key="auditProgram.id">
          <el-row style="vertical-align: center;">
            <el-col :span="8">{{auditProgram.university}}</el-col>
          <el-col :span="8">{{auditProgram.name}}</el-col>
          <el-col :span="4">
            <el-button @click="handleAudit(auditProgram)">审核</el-button>
            <el-button>拒绝</el-button>
          </el-col>
          </el-row>
          
        </el-card>
        <el-dialog :visible.sync="auditDialogVisible">
          <el-form class="currentProgram" :model="currentProgram" :rules="currentProgramRules" ref="currentProgram" label-width="120px" >
              <el-row>
              <el-form-item label="学校项目缩写" prop="nameAbbr">
                <el-input v-model="currentProgram.nameAbbr" placeholder="例如：CMU-MSCS, Stanford-MSEE" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学校" prop="university">
                <el-input v-model="currentProgram.university" placeholder="请尽量给出官方全称，例如University of California San Diego" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="项目" prop="name">
                <el-input v-model="currentProgram.name" placeholder="请填写项目名称，如MSCS, MCS, MMath, MEngECE" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学科专业">
                <el-input v-model="currentProgram.major" placeholder="例如：CS, EE, ECE, ME" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label-width="0">
                <el-col :span="12">
                  <el-form-item label="国家或地区">
                    <el-input v-model="currentProgram.region" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所在城市">
                    <el-input v-model="currentProgram.location" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              
              <el-form-item label="项目链接">
                <el-input v-model="currentProgram.url" placeholder="请给出项目链接" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="托福要求" prop="toeflForm">
                <el-col :span="4">
                  <el-form-item prop="toefl">
                    <el-input placeholder="总分要求" v-model.number="currentProgram.toefl" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                  </el-form-item>
                 </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-input placeholder="阅读要求" v-model.number="currentProgram.toeflR" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-input placeholder="听力要求" v-model.number="currentProgram.toeflL" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-input placeholder="写作要求" v-model.number="currentProgram.toeflW" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-input placeholder="口语要求" v-model.number="currentProgram.toeflS" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item prop="ieltsForm" label="雅思要求">
                
                
                <el-col :span="4">
                  <el-form-item prop="ielts">
                    <el-input placeholder="总分要求" v-model="currentProgram.ielts" :validate="validateIelts" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-form-item prop="ieltsR">
                    <el-input placeholder="阅读要求" v-model="currentProgram.ieltsR" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-form-item prop="ieltsL">
                    <el-input placeholder="听力要求" v-model="currentProgram.ieltsL" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-form-item prop="ieltsW">
                    <el-input placeholder="写作要求" v-model="currentProgram.ieltsW" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-form-item prop="ieltsS">
                    <el-input placeholder="口语要求" v-model="currentProgram.ieltsS" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="项目时长">
                <el-col :span="10">
                  <el-form-item>
                    <el-input v-model="currentProgram.minDuration" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">---</el-col>
                <el-col :span="10">
                  <el-form-item>
                    <el-input v-model="currentProgram.maxDuration" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">月</el-col>
              </el-form-item>
              </el-row>
              <el-row justify="end">
                <el-button-group>
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="passProgramThrottle">确 定</el-button>
                </el-button-group>
              </el-row>
            </el-form>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader.vue';
import request from '@/request/request';
import {throttle} from '@/utils/throttle'
import { Message } from 'element-ui';
export default {
  components: { GlobalHeader },
  data(){
    return{
      auditProgramList: [],
      pageIndex: 0,
      pageSize: 10,
      currentProgram: {
        nameAbbr: '',           
        university: '',
        name: '',
        major: '',
        region: '',
        location: '',
        minDuration: 0,
        maxDuration: 0,
        toefl: null,
        toeflL: null,
        toeflR: null,
        toeflS: null,
        toeflW: null,
        ielts: null,
        ieltsL: null,
        ieltsR: null,
        ieltsS: null,
        ieltsW: null,
        role: '',
      },
      auditDialogVisible: false
    }
  },
  methods:{
    // getProgramList(pageIndex, pageSize){

    // }
    handleAudit(selectedProgram){
      this.auditDialogVisible = true;
      this.currentProgram = selectedProgram;
    },
    passProgramThrottle: throttle(function(){
      this.passProgram()
    }, 500),
    passProgram(){
      request.post("/admin/programs/approve", this.currentProgram).then(response=>{
        const res = response.data;
        if(res.code ==  200){
          this.auditDialogVisible = false;
          Message({
            message: '审核通过',
            type: 'success',
            customClass: 'message-global',
          });
        } else{
          Message({
            message: '出了点错误，请检查登录状态并稍后再试',
            type: 'error',
            customClass: 'message-global',
          });
        }
      }).catch(error=>{
        console.log(error);
        Message({
            
            message: '出了点错误，请检查登录状态并稍后再试',
            type: 'error',
            customClass: 'message-global',
          });
      })
    }
  },
  beforeRouteEnter(from, to, next){
    const getProgramsRequest = {
      pageIndex: 0,
      pageSize: 10
    }
    request.get("/admin/programs", {params: getProgramsRequest}).then(response => {
      const res = response.data;
      console.log(res.data);
      if(res.code == 200){
        next(vm=>{
          vm.auditProgramList = res.data;
        })
      } else{
        next(vm=>{
          vm.auditProgramList = null;
        })
        
      }
    }).catch(error=>{
      console.log(error);
      next(vm=>{
        vm.auditProgramList = null;
      })
    })
  }
}
</script>

<style>

</style>