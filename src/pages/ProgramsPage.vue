<template>
  <div>
    <el-container>


      <el-header>
        <!-- 导航栏组件 -->
        <global-header />
      </el-header>


      <el-container>


        <el-aside width="300px">
          <div style="margin-bottom: 20px;">
            <h1>请选择一个项目</h1>
          </div>
          <el-select class="filter-select" v-model="selectedUniversity" placeholder="选择学校" @change="filterPrograms" filterable>
            <el-option v-for="university in uniqueUniversities" :key="university" :label="university" :value="university"></el-option>
          </el-select>
          <el-select class="filter-select" v-model="selectedMajor" placeholder="选择项目类型" @change="filterPrograms" filterable>
            <el-option v-for="major in uniqueMajors" :key="major" :label="major" :value="major"></el-option>
          </el-select>
          <el-menu :route="true" default-active="1" @select="handleMenuSelect">
            <el-menu-item v-for="program in filteredPrograms" :key="program.id" :index="program.id" >
              {{ program.nameAbbr }}
            </el-menu-item>
          </el-menu>
          <el-button type="primary" plain round @click="addProgramDialogVisible = true">没有我想要的项目</el-button>
        </el-aside>


        <el-main>

          <el-dialog class="createProgramDialog" title="请描述一下你想要的项目~" :visible.sync="addProgramDialogVisible">
            <el-form class="createProgramForm" :model="createProgramForm" :rules="createProgramFormRules" ref="createProgramForm" label-width="120px" >
              <el-row>
              <el-form-item label="学校项目缩写" prop="nameAbbr">
                <el-input v-model="createProgramForm.nameAbbr" placeholder="例如：CMU-MSCS, Stanford-MSEE" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学校" prop="university">
                <el-input v-model="createProgramForm.university" placeholder="请尽量给出官方全称，例如University of California San Diego" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="项目" prop="name">
                <el-input v-model="createProgramForm.name" placeholder="请填写项目名称，如MSCS, MCS, MMath, MEngECE" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学科专业">
                <el-input v-model="createProgramForm.major" placeholder="例如：CS, EE, ECE, ME" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label-width="0">
                <el-col :span="12">
                  <el-form-item label="国家或地区">
                    <el-input v-model="createProgramForm.region" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所在城市">
                    <el-input v-model="createProgramForm.location" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              
              <el-form-item label="项目链接">
                <el-input v-model="createProgramForm.url" placeholder="请给出项目链接" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="托福要求" prop="toeflForm">
                <el-col :span="4">
                  <el-form-item prop="toefl">
                    <el-input placeholder="总分要求" v-model.number="createProgramForm.toefl" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                  </el-form-item>
                 </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-input placeholder="阅读要求" v-model.number="createProgramForm.toeflR" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-input placeholder="听力要求" v-model.number="createProgramForm.toeflL" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-input placeholder="写作要求" v-model.number="createProgramForm.toeflW" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="1">-</el-col> 
                <el-col :span="4">
                  <el-input placeholder="口语要求" v-model.number="createProgramForm.toeflS" oninput="value=value.replace(/[^\d]/g,'')" style="width: 100%;"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item prop="ieltsForm" label="雅思要求">
                 
                
                <el-col :span="4">
                  <el-form-item prop="ielts">
                    <el-input placeholder="总分要求" v-model="createProgramForm.ielts" :validate="validateIelts" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-form-item prop="ieltsR">
                    <el-input placeholder="阅读要求" v-model="createProgramForm.ieltsR" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-form-item prop="ieltsL">
                    <el-input placeholder="听力要求" v-model="createProgramForm.ieltsL" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-form-item prop="ieltsW">
                    <el-input placeholder="写作要求" v-model="createProgramForm.ieltsW" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                  <el-form-item prop="ieltsS">
                    <el-input placeholder="口语要求" v-model="createProgramForm.ieltsS" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="项目时长">
                <el-col :span="10">
                  <el-form-item>
                    <el-input v-model="createProgramForm.minDuration" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">---</el-col>
                <el-col :span="10">
                  <el-form-item>
                    <el-input v-model="createProgramForm.maxDuration" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">月</el-col>
              </el-form-item>
              </el-row>
              <el-row justify="end">
                <el-button-group>
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleSubmit">确 定</el-button>
                </el-button-group>
              </el-row>
            </el-form>
          </el-dialog>

          <!-- 分享Dp需要上交的表单 -->
          <el-dialog class="create-dp-dialog" title="感谢你愿意分享你的录取结果" :visible.sync="addDpDialogVisible" width="90%">
            <el-form class="createDpForm" :model="createDpForm" :rules="createDpFormRules" ref="createDpForm" label-width="100px" >
              <el-form-item label-width="0">
                <el-row>
                <el-col :span="6">
                  <el-form-item label="录取结果" prop="result">
                    <el-select v-model="createDpForm.result" placeholder="请选择录取结果" autocomplete="off">
                      <el-option
                        v-for="item in admitResultEnum"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="申请方向" prop="track">
                    <el-input placeholder="申请时选的方向，例如computer systems" v-model="createDpForm.track"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="提交日期" prop="submitDate">
                    <el-date-picker
                      v-model="createDpForm.submitDate"
                      type="date"
                      placeholder="选择日期"
                      style="width: 200px;">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="通知日期" prop="informDate">
                    <el-date-picker
                      v-model="createDpForm.informDate"
                      type="date"
                      placeholder="选择日期"
                      style="width: 200px;">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                </el-row>
              </el-form-item>
              
              
            </el-form>
            <div style="text-align: left; margin-left: 25px; margin-right: 20px;">
              请选择申请时的背景，已选择ID: <span style="color: #6A6AFF; font-weight: bold;">{{selectedDpId}}</span>
            </div>  
            
            <el-card class="bg-card" v-for="bg in myBg" :key="bg.id">
              <div slot="header" class="bg-card-header" >
                <span style="float: left; font-weight: bold; font-size: 16px; margin-right: 300px;">ID: {{bg.id}}</span>
                <span style="float: left; ">创建于 {{ bg.createDate }}</span>
                <el-checkbox style="float: right; " v-model="selectedDpId" :label="bg.id" border>选择</el-checkbox>
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
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDpDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitDp">确 定</el-button>
            </div>
          </el-dialog>


          <div v-if="selectedProgram == null">
            <el-empty image="https://cdn.pixabay.com/photo/2013/07/12/14/45/apollo-148722_1280.png" :image-size="500"></el-empty>
          </div>
          <div v-if="selectedProgram != null">
            <h2>{{ selectedProgram.university}}, <span style="color: #6A6AFF">{{ selectedProgram.name }}</span></h2>
            <el-descriptions title="项目基本信息">
              <el-descriptions-item label="地理位置">{{ selectedProgram.region }} - {{ selectedProgram.location }}</el-descriptions-item>
              <el-descriptions-item label="时长">{{selectedProgram.minDuration}} - {{ selectedProgram.maxDuration }} 月</el-descriptions-item>
              <el-descriptions-item label="托福要求">总分{{ selectedProgram.toefl}}, 阅读{{ selectedProgram.toeflR }}, 听力{{ selectedProgram.toeflL }}, 写作{{ selectedProgram.toeflW }}, 口语{{ selectedProgram.toeflS }}</el-descriptions-item>
              <el-descriptions-item label="雅思要求">7+</el-descriptions-item>
              <el-descriptions-item label="项目链接"><el-link :underline="false" :href="selectedProgram.url">{{ selectedProgram.url }}</el-link></el-descriptions-item>
            </el-descriptions>

            <el-collapse v-model="activeNames" @change="handleDpUnfold">
              <el-collapse-item name="1">
                <template slot="title">
                  <p class="title">录取结果分享</p>
                </template>
                
                <div style="text-align: left;margin-bottom: 10px;">
                  <el-button @click="handleAddDpDialogVisible" type="primary" plain>分享我的录取结果</el-button>
                </div>

                <el-card>
                  <!-- 这里没选用element的其他组件包括el-descriptions是因为实在是太难调了，宽度老是自己乱动还没办法调成想要的宽度，破防了 -->
                  <el-row v-for="dp in dps" :key="dp.id" style="margin-bottom: 10px;">
                    <el-col :span="24" style="text-align: left;margin-bottom: 10px; font-size: 14px;">
                      <el-col :span="4">分享者：{{dp.creatorUsername}}</el-col>
                      <el-col :span="10">申请方向(Track)：{{dp.track}}</el-col>
                      <el-col :span="5">提交申请时间：{{getDateStringfromDateTime(dp.submitDate)}}</el-col>
                      <el-col :span="5">通知结果时间：{{getDateStringfromDateTime(dp.informDate)}}</el-col>
                    </el-col>
                    <el-col class="dp-form-title" :span="2">结果</el-col>
                    <el-col class="dp-form-title" :span="5">本科学校</el-col>
                    <el-col class="dp-form-title" :span="4">本科专业</el-col>
                    <el-col class="dp-form-title" :span="2">GPA</el-col>
                    <el-col class="dp-form-title" :span="2">均分</el-col>
                    <el-col class="dp-form-title" :span="6">语言考试</el-col>
                    <el-col class="dp-form-title" :span="3">GRE</el-col>

                    <el-col class="dp-form-content" :span="2"><el-tag size="small" :type="dp.result == 1 ? 'success' : 'danger'">{{getAbbrByKey(dp.result)}}</el-tag></el-col>
                    <el-col class="dp-form-content" :span="5">{{dp.bg.undergradUniversity}}</el-col>
                    <el-col class="dp-form-content" :span="4">
                      {{dp.bg.undergradMajor}}
                      <span v-if="dp.bg.undergradDual != null && dp.bg.undergradDual != ''">+{{dp.bg.undergradDual}}(双)</span>
                      <span v-if="dp.bg.undergradMinor != null && dp.bg.undergradMinor != ''">+{{dp.bg.undergradMinor}}(辅)</span>
                    </el-col>
                    <el-col class="dp-form-content" :span="2">{{dp.bg.gpa}}/{{dp.bg.gpaScale}}</el-col>
                    <el-col class="dp-form-content" :span="2">{{dp.bg.avg}}/100</el-col>
                    <el-col class="dp-form-content" :span="6">{{getLanguageTypeName(dp.bg.languageType)}}: 
                      <span v-if="dp.bg.languageType!=3">{{dp.bg.languageOverall}}</span>
                      <span v-if="dp.bg.languageType!=3 && dp.bg.languageType!=4">=R:{{dp.bg.reading}}+L:{{dp.bg.listening}}+W:{{dp.bg.writing}}+S:{{dp.bg.speaking}}</span>
                    </el-col>
                    <el-col class="dp-form-content" :span="3">
                      <span v-if="dp.bg.gre != null">{{dp.bg.gre}}={{dp.greV}}+{{dp.greQ}}+{{dp.greAw}}</span> 
                      <span v-else>未提交</span>
                    </el-col>

                    <el-col class="dp-form-title" :span="8">推荐信</el-col>
                    <el-col class="dp-form-title" :span="8">论文发表</el-col>
                    <el-col class="dp-form-title" :span="8">科研经历</el-col>
                    <el-col class="dp-form-content" :span="8">{{dp.bg.rl}}</el-col>
                    <el-col class="dp-form-content" :span="8">{{dp.bg.pub}}</el-col>
                    <el-col class="dp-form-content" :span="8">{{dp.bg.research}}</el-col>

                    <el-col class="dp-form-title" :span="8">实习经历</el-col>
                    <el-col class="dp-form-title" :span="8">交换经历</el-col>
                    <el-col class="dp-form-title" :span="8">项目/比赛经历</el-col>
                    <el-col class="dp-form-content" :span="8">{{dp.bg.internship}}</el-col>
                    <el-col class="dp-form-content" :span="8">{{dp.bg.exchange}}</el-col>
                    <el-col class="dp-form-content" :span="8">{{dp.bg.project}}</el-col>
                  </el-row>
                  
                  
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="10"
                    :total="dpCount"
                    @current-change="getDps">
                  </el-pagination>
                </el-card>
              </el-collapse-item>
            </el-collapse>
          </div>
          
          <!-- {{ this.programs[0].id }} -->
          

        </el-main>
      </el-container>
    </el-container>
  </div>
  
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader.vue';
import request from '@/request/request';
import { Message } from 'element-ui';
export default {
  components: { GlobalHeader },
  data() {
    return {
      programs: [
        { id: 1, name: 'CMU-MSCS' ,university: 'CMU', major: 'CS'},
        { id: 2, name: 'CMU-MCDS', university: 'CMU', major: 'DS'},
        { id: 3, name: 'CMU-MSCV', university: 'CMU', major: 'CV' },
        { id: 4, name: 'UIUC-MSCS', university: 'UIUC', major: 'CS' },
        { id: 5, name: 'NYU-MSDS', university: 'NYU', major: 'DS' },

        // 其他项目...
      ],
      dps:[
      ],

      myBg: [],

      dpCount: 0,

      //用于页面渲染的数据
      selectedProgram: null,
      filteredPrograms: null,
      selectedUniversity: null,
      selectedMajor: null,
      addProgramDialogVisible: false,
      addDpDialogVisible: false,
      formLabelWidth: '120px',
      admitResultEnum: [
        { key: 1, value: 'Admitted', abbr: 'ad' },
        { key: 2, value: 'Rejected', abbr: 'rej' },
        { key: 3, value: 'WaitList->Admit', abbr: 'wl-ad' },
        { key: 4, value: 'WaitList->Reject', abbr: 'wl-rej' }
      ],
      languageTypeEnum: [
        { key: 1, name: "TOEFL" }, 
        { key: 2, name: "IELTS" },
        { key: 3, name: "Duolinguo" },
        { key: 4, name: "Waive" }
      ],
      selectedProgramId: 0,
      selectedDpId: [],
      //验证规则数据
      

      createProgramFormRules: {
        nameAbbr: [{required: true, message: '请输入项目缩写', trigger: 'blur'}],
        university: [{ required: true, message: '请输入学校名称', trigger: 'blur' }],
        name: [{required: true, message: '请输入项目名字', trigger: 'blur'}],
        toefl: [{ required: false, message: '请输入托福成绩要求！', trigger: 'blur' }],
        
        ielts: [{ validator: this.validateIelts, trigger: 'blur' }],
        ieltsR: [{ validator: this.validateIelts, trigger: 'blur' }],
        ieltsL: [{ validator: this.validateIelts, trigger: 'blur' }],
        ieltsW: [{ validator: this.validateIelts, trigger: 'blur' }],
        ieltsS: [{ validator: this.validateIelts, trigger: 'blur' }],
      },

      createDpFormRules: {
        result: [{required: true, message: '请选择录取结果', trigger: 'blur'}],
        track: [{required: true, message: '请选择申请方向', trigger: 'blur'}],
        submitDate: [{required: true, message: '请选择提交时间', trigger: 'blur'}],
        informDate: [{required: true, message: '请选择通知时间', trigger: 'blur'}]
      },
      //表单数据
      createProgramForm: {
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

      createDpForm: {
        programId: null,
        programName: null,
        track: null,
        result: null,
        submitDate: null,
        informDate: null,
        bgId: null,

      }

    };
  },
  computed: {
    uniqueUniversities() {
      // 获取唯一的学校名列表
      return [...new Set(this.programs.map(program => program.university))];
    },
    uniqueMajors() {
      // 获取唯一的项目类型列表
      return [...new Set(this.programs.map(program => program.major))];
    },
    
  },
  watch: {
    selectedDpId(newValue) {
      console.log('Selected IDs:', newValue)
      // 如果选中的 ID 数量大于 1,则将最新选中的 ID 保留,其他 ID 取消选中
      if (newValue.length > 1) {
        this.selectedDpId = [newValue[newValue.length - 1]]
      }
    }
  },
  created(){
    this.getAllPrograms();
  },
  methods: {
    getAllPrograms() {
      request.get(`/program`)
        .then(response => {
          console.log(response)
          if (response.data.code == 200) {
            this.programs = response.data.data;
          }
        })
        .catch(error => {
          console.log("出错了")
          console.error(error);
        });
    },
    getProgramInfo(programId) {
      request.get(`/program/${programId}`)
        .then(response => {
          this.selectedprogram = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    filterPrograms(){
      this.filteredPrograms = this.programs.filter(program => {
        // 根据选中的学校名和项目类型进行筛选
        const universityMatch = !this.selectedUniversity || program.university === this.selectedUniversity;
        const majorMatch = !this.selectedMajor || program.major === this.selectedMajor;
        return universityMatch && majorMatch;
      });
    },
    handleMenuSelect(index) {
      
      this.selectedProgram = this.programs.find(program => program.id === index);
      console.log(this.selectedProgram);
    },
    handleSubmit() {
      console.log("嗨")
      this.$refs.createProgramForm.validate((valid) => {
      if (valid) {
        // Form is valid, proceed with submission
        request.post('/program/add', this.createProgramForm).then(response => {
          const res = response.data;
          if (res.code == 200) {
            Message({
              message: '提交成功，待管理员审核~',
              type: 'success',
              customClass: 'message-global',
            });
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
    //验证表单输入格式方法
    validateIelts: (rule, value, callback) => {
      //必须大于0
      if (!value || value == "") callback();
      const ieltsScoreSet = new Set([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]);
      console.log("进入雅思验证")
      console.log(value)
      console.log("解析后：", parseFloat(value))
      const decimalRegex = /^\d+(.\d+)?$/;  // eslint-disable-line
      if (decimalRegex.test(value) == false) {
        callback(new Error("请输入有效的数"))
      } else if (ieltsScoreSet.has(parseFloat(value)) == false) {
        callback(new Error("请输入有效的雅思分数"))
      } else {
        callback();
      }
    },
    handleSelectBg(id) {
      this.selectedProgramId = id;
    },
    handleAddDpDialogVisible(){
      this.addDpDialogVisible = true; 
      request.get('/user/bg').then(response=>{
        const res = response.data;
        if(res.code == 200){
          this.myBg = res.data;
        } else{
          Message({
            message: "未获取到用户",
            type: 'error',
            customClass: 'message-global',
          });
        }
      }).catch(error=>{
        console.log(error)
        Message({
            message: "输入格式不正确~",
            type: 'error',
            customClass: 'message-global',
          });
      })
    },
    getDps(currentPageIndex){
      const getRequestParams = {
        programId: this.selectedProgram.id,
        pageIndex: currentPageIndex - 1,
        pageSize: 10
      }
      request.get("/program/dp", {params: getRequestParams}).then(response=>{
        const res = response.data;
        console.log("获取的dp是", res)
        if(res.code == 200){
          this.dps = res.data.dp;

          this.dpCount = res.dpCount;
          console.log(this.dps)
        } else{
          this.dps = null;
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    handleDpUnfold(){
      this.getDps(1);
    },
    submitDp(){
      this.$refs.createDpForm.validate((valid) => {
        if (valid) {
          if(this.selectedDpId.length == 1){
            this.createDpForm.bgId = this.selectedDpId[0];
            this.createDpForm.programId = this.selectedProgram.id;
            this.createDpForm.programName = this.selectedProgram.nameAbbr;
            this.createDpForm.submitDate = new Date(this.createDpForm.submitDate);
            this.createDpForm.informDate = new Date(this.createDpForm.informDate);

            request.post("/program/dp/add", this.createDpForm).then(response=>{
              const res = response.data;
              if(res.code == 200){
                Message({
                  message: '提交成功，感谢你的分享:D',
                  type: 'success',
                  customClass: 'message-global',
                });
              } else{
                Message({
                  message: '提交失败，你已经在这个项目下贡献过一条完全一样的数据啦~',
                  type: 'error',
                  customClass: 'message-global',
                })
              }
            }).catch(error=>{
              console.log(error);
              Message({
                message: '提交失败，可能是用户登录过期',
                type: 'error',
                customClass: 'message-global',
              })
            })
          } else{
            Message({
              message: "请选择一组背景",
              type: 'error',
              customClass: 'message-global',
            });
          }
        } else{
          Message({
            message: "输入格式不正确！",
            type: 'error',
            customClass: 'message-global',
          });
        }
      });
    },
    getAbbrByKey(key) {
      const item = this.admitResultEnum.find(item => item.key === key);
      return item ? item.abbr : null;
    },
    getLanguageTypeName(key) {
      const item = this.languageTypeEnum.find(item => item.key === key);
      return item ? item.name : null;
    },
    getDateStringfromDateTime(dateTime){
      var date = new Date(dateTime);
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
    }
  }
}
</script>

<style>
.dps{
  margin-bottom: 10px;
  }

.createProgramDialog{
  text-align: center;

}

.createProgramForm{
  width: 90%;
}

.title {
  font-weight: bold;
  font-size: large;
  color:orange;
}

.content-width-25{
  width: 25;
}

.dp-form-title{
  border: 1px solid #000;
  font-weight: bold;
  background-color: blanchedalmond;
  padding-top: 5px;
  padding-bottom: 5px;
}

.dp-form-content{
  border: 1px solid #000;
  background-color:ghostwhite;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 50px;
  font-size: 12px;
}

.bg-card-header:before,
  .bg-card-header:after {
    display: table;
    content: "";
  }
  .bg-card-header:after {
    clear: both
  }
 .bg-card{
  margin-left: 20px;
  margin-right: 20px;
 }

 .filter-select{
  margin-bottom: 10px;
 }

</style>