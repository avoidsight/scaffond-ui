<template>
    <div style="height:100%">
      <div style="height:95% ;overflow-y:auto; overflow-x:hidden">
        <el-form ref="form" :model="form" label-position="left" :rules="rules" label-width="auto"> 
           <el-row :gutter="2">
              <el-col :span="8">
                <el-form-item label="上传附件">
                  <FileUpload
                    :isShowTip="false"
                    @input="setResources"
                    :value="form.resources"
                  />
                </el-form-item>
              </el-col>
               <!-- <el-col :span="16">
                    <el-steps align-center :active="activenum" finish-status="success">
                      <el-step title="退料确认" description="屈丽丽">
                        <template slot="description" >
                          <div>屈丽丽</div>
                          <div>2021-6-12</div>
                        </template>
                      </el-step>
                      <el-step title="仓库签收" description="周毛毛">
                        <template slot="description" >
                          <div>周毛毛</div>
                          <div>2021-6-12</div>
                        </template></el-step>
                      <el-step title="项目确认" description="万忠忠">
                        <template slot="description" >
                          <div>万忠忠</div>
                          <div>2021-6-12</div>
                        </template>
                      </el-step>
                      <el-step title="完成" ></el-step>
                    </el-steps>
                </el-col> -->
           </el-row>
              <!-- start 合同明细 -->
                <el-divider content-position="left">合同明细</el-divider>
                <el-row :gutter="2">
                  <el-col :span="8">
                    <el-form-item label="合同编码">
                        <el-input  v-model="form.contractCode" readonly >                 
                        </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同名称" prop="menuType">
                      <el-input  v-model="form.contractName" readonly >                 
                        </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="客户名称" prop="icon" :required="true">             
                        <el-input  v-model="form.icon" placeholder="客户名称" >                 
                        </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="仓库名称" prop="menuName" :required="true">
                      <el-input v-model="form.warehouseName" readonly />
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="施工地址" prop="orderNum">
                      <el-input v-model="form.address" placeholder="施工地址" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- end 合同明细 -->
                <!-- start 物流明细 -->
                <el-divider content-position="left">物流明细</el-divider>
                <el-row :gutter="2">
                  <el-col :span="8">
                    <el-form-item label="流水单号" :required="true">
                    <el-input v-model="form.formCode" readonly />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" >
                    <el-form-item label="业务单号">
                    <el-input v-model="form.businessCode" readonly />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" >
                    <el-form-item label="业务日期" :required="true">
                    <!-- <el-input v-model="selectObj.outTime"/> -->
                      <el-date-picker
                        v-model="form.outTime"
                        style="width: 100%"
                        value-format="yyyy-MM-dd"
                        type="date">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出租运费">
                      <el-input v-model="form.carRentalFee"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"> 
                        <i slot="suffix" style="font-style:normal;margin-right: 5px;">元</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" >
                    <el-form-item label="装车费">
                      <el-input v-model="form.loadingFee"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"> 
                        <i slot="suffix" style="font-style:normal;margin-right: 5px;">元</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" >
                    <el-form-item label="卸车费">
                      <el-input v-model="form.unloadingFee"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"> 
                        <i slot="suffix" style="font-style:normal;margin-right: 5px;">元</i>
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="线路起点">
                    <el-input v-model="form.origin"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" >
                    <el-form-item label="线路终点">
                    <el-input v-model="form.destination"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" >
                    <el-form-item label="运输单价" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
                      <el-input v-model="form.transportationUnitPrice"> 
                        <el-dropdown slot="suffix" @command="handleCommand">
                          <span class="el-dropdown-link" >
                            {{transportUnits}}<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown" :popper-append-to-body="false">
                            <el-dropdown-item command="t">元/吨</el-dropdown-item>
                            <el-dropdown-item command="kg">元/kg</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <!-- <i slot="suffix" style="font-style:normal;margin-right: 5px;">元/吨</i> -->
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="运输单位">
                      <el-input v-model="form.transportUnit"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" >
                    <el-form-item label="车牌号" required>
                    <el-input v-model="form.carNumber"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" >
                    <el-form-item label="运输费" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
                      <el-input v-model="form.freight"> 
                        <i slot="suffix" style="font-style:normal;margin-right: 5px;">元</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- end 物流明细 -->
            <el-divider></el-divider>
            <el-row :gutter="2">
              <el-col :span="8" >
                <el-form-item label="中成理论重量" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
                  <el-input v-model="form.lessorTheoreticalWeight">
                    <i slot="suffix" style="font-style:normal;margin-right: 5px;">kg</i>
                  </el-input>
                </el-form-item>
              </el-col>
             

              <el-col :span="8" >
                <el-form-item label="供应商理论重量" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
                   <el-input v-model="form.supplierTheoreticalWeight">
                    <i slot="suffix" style="font-style:normal;margin-right: 5px;">kg</i>
                  </el-input>
                </el-form-item>
              </el-col>
              
              <el-col :span="8" >
                <el-form-item label="总杂费" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
                  <el-input v-model="form.totalMiscelFee">
                    <i slot="suffix" style="font-style:normal;margin-right: 5px;">元</i>
                  </el-input>
                </el-form-item>
              </el-col>
              

              <el-col :span="8" >
                <el-form-item label="实际重量" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
                  <el-input v-model="form.actualWeight">
                  <i slot="suffix" style="font-style:normal;margin-right: 5px;">kg</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="最终结算重量" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
                  <el-input v-model="form.balanceWeight">
                    <i slot="suffix" style="font-style:normal;margin-right: 5px;">kg</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="经办人">
                  <el-input v-model="form.operator"/>
                </el-form-item>
              </el-col>

              <el-col :span="24" >
                <el-form-item label="备注">
                  <el-input v-model="form.remark" 
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"/>
                </el-form-item>
              </el-col>
          </el-row>
        </el-form>

        <el-tabs v-model="activeName" @tab-click="handleTab">
          <!-- start tab 1 -->
          <el-tab-pane label="周转明细" name="revolve">
            <el-form ref="tableform"  :rules="rules">
                <el-table
                  ref="mytable"
                  :data="table_data"
                  style="width: 100%"
                  :cell-style="{padding:'0px'}"
                  highlight-current-row
                >
                  <el-table-column label="操作" align="center" width="70">
                    <template slot-scope="scope">
                      <!-- 全局控制的编辑  -->
                      <!-- 添加控制  -->
                      <div  style="display: inline-block;">
                        <!-- 新增  -->
                        <el-button
                        style="max-height:20px;max-width:20px;padding:3px;"
                          size="mini"
                          type="success"
                          circle
                          @click="handleAdd(scope.$index, scope.row)"
                          icon="el-icon-plus"
                        ></el-button>
                      </div>
                      <!-- 删除   -->
                      <el-button v-if="table_data.length > 1"
                        style="max-height:20px;max-width:20px;padding:3px;"
                        size="mini"
                        circle
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                      ><i class="el-icon-minus"></i></el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    v-for="(item,index,key) in table_columns"
                    :item="item"
                    :key="key"
                    :index="index"
                    :label="item.label"
                    :width="item.width"
                  >
                    <template slot-scope="scope" >

                      <span v-if="  item.prop != 'category' && ( item.prop == 'id' || item.prop == 'units' || item.prop == 'singleWeight' )">
                        {{scope.row[item.prop]}}
                      </span>

                      <!-- 物料编辑 -->
                      <span v-else-if="  item.prop == 'category' ">
                        <div>
                          <el-form-item label="" :prop="'table_data.' + scope.$index + '.category'" >
                            <el-cascader 
                            :required="true"
                            class="tableColumn"
                            ref="singleCascader"
                            v-model="scope.row['category']"
                            :key="item.value"
                            :options="materialtypes"
                            :props="selProps"
                             @change="handleChange($event,scope.row,scope.$index)"
                            clearable >
                          </el-cascader>
                          </el-form-item>
                        </div>
                      </span>
                      <el-form-item v-else-if=" item.prop == 'materialsNumber'||item.prop == 'materialsNum'" label="" :prop="'table_data.' + scope.$index + '.'+item.prop" >
                        <el-input  class="tableColumn"
                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                          v-model="scope.row[item.prop]"
                        ></el-input>
                      </el-form-item>                    

                      <el-form-item v-else-if=" item.prop == 'remarks'" label="" :prop="'table_data.' + scope.$index + '.remarks'" >
                        <el-input    class="tableColumn"                       
                          v-model="scope.row[item.prop]"
                          :placeholder="item.label"
                        ></el-input>
                      </el-form-item>
                      <!-- 提交的时候自己计算 -->
                      <el-form-item v-else-if=" item.prop == 'materialsWeight'" label="" :prop="'table_data.' + scope.$index + '.remarks'" >
                          {{scope.row["singleWeight"]?scope.row["materialsNumber"]*scope.row["singleWeight"]:0}}
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>

          </el-tab-pane>
          <!-- end tab 1 -->
          <!-- start tab 2 -->
          <el-tab-pane label="杂费明细" name="petty">
              <el-form ref="tableform"  :rules="rules">
                <el-table
                  ref="mytable"
                  :data="table_data"
                  style="width: 100%"
                  :cell-style="{padding:'0px'}"
                  highlight-current-row
                >
                  <el-table-column label="操作" align="center" width="70">
                    <template slot-scope="scope">
                      <!-- 全局控制的编辑  -->
                      <!-- 添加控制  -->
                      <div  style="display: inline-block;">
                        <!-- 新增  -->
                        <el-button
                        style="max-height:20px;max-width:20px;padding:3px;"
                          size="mini"
                          type="success"
                          circle
                          @click="handleAdd(scope.$index, scope.row)"
                          icon="el-icon-plus"
                        ></el-button>
                      </div>
                      <!-- 删除   -->
                      <el-button v-if="table_data.length > 1"
                        style="max-height:20px;max-width:20px;padding:3px;"
                        size="mini"
                        circle
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                      ><i class="el-icon-minus"></i></el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    v-for="(item,index,key) in table_columns_petty"
                    :item="item"
                    :key="key"
                    :index="index"
                    :label="item.label"
                    :width="item.width"
                  >
                    <template slot-scope="scope">

                      <span v-if="  item.prop != 'category' && ( item.prop == 'materialsNumber' || item.prop == 'units' || item.prop == 'materialsWeight')">
                        {{scope.row[item.prop]}}
                      </span>

                      <!-- 物料编辑 -->
                      <span v-else-if="  item.prop == 'category' ">
                        <div>
                          <el-form-item label="" :prop="'table_data_petty.' + scope.$index + '.category'" >
                            <el-cascader 
                            :required="true"
                             class="tableColumn"
                            ref="singleCascader"
                            v-model="scope.row['category']"
                            :key="item.value"
                            :options="materialtypes"
                            :props="selProps"
                            @change="handleChange"
                            clearable >
                          </el-cascader>
                          </el-form-item>
                        </div>
                      </span>
                      
                      <el-form-item v-else-if=" item.prop == 'name'" label="" :prop="'table_data.' + scope.$index + '.name'" >
                        <el-input  class="tableColumn"
                          v-model="scope.row[item.prop]"
                          :placeholder="item.label"
                        ></el-input>
                      </el-form-item>

                      <el-form-item v-else-if=" item.prop == 'goodsNumber'" label="" :prop="'table_data.' + scope.$index + '.goodsNumber'" >
                        <el-input  class="tableColumn"    
                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')"                   
                          v-model="scope.row[item.prop]"
                          :placeholder="item.label"
                        ></el-input>
                      </el-form-item>

                      <el-form-item v-else-if=" item.prop == 'chargeNumber'" label="" :prop="'table_data.' + scope.$index + '.chargeNumber'" >
                        <el-input  class="tableColumn"       
                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')"                
                          v-model="scope.row[item.prop]"
                          :placeholder="item.label"
                        ></el-input>
                      </el-form-item>

                      <el-form-item v-else-if=" item.prop == 'cost'" label="" :prop="'table_data.' + scope.$index + '.cost'" >
                        <el-input  class="tableColumn"    
                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')"                   
                          v-model="scope.row[item.prop]"
                          :placeholder="item.label"
                        ></el-input>
                      </el-form-item>

                      <el-form-item v-else-if=" item.prop == 'totalCost'" label="" :prop="'table_data.' + scope.$index + '.totalCost'" >
                        {{scope.row["cost"]&&scope.row["chargeNumber"]?scope.row["chargeNumber"]*scope.row["cost"]:0}}
                      </el-form-item>

                      <el-form-item v-else-if=" item.prop == 'remarks'||item.prop == 'feeName'" label="" :prop="'table_data.' + scope.$index + '.'+item.prop" >
                        <el-input  class="tableColumn"            
                          v-model="scope.row[item.prop]"
                          :placeholder="item.label"
                        ></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
          </el-tab-pane>
          <!--end tab 2 -->
        </el-tabs>   
      </div>
      <el-row :gutter="2" style="padding-top:.5rem">
          <el-col :span="16">
            <div align="left">
              <el-descriptions :column="4">
                <el-descriptions-item label="制单人">kooriookami</el-descriptions-item>
                <el-descriptions-item label="制单日期">18100000000</el-descriptions-item>
                <el-descriptions-item label="审核人">苏州市</el-descriptions-item>               
                <el-descriptions-item label="审核日期">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
              </el-descriptions>
            </div>
          </el-col>
          <el-col :span="8">
            <div align="right">
              <el-button type="primary" @click="submitForm">确 定</el-button>
              <el-button @click="cancel">取 消</el-button>
            </div>
          </el-col>
      </el-row>
    </div>
</template>
<script>
import {accMul, changeNum} from '@/utils/math'
import {getMaterialtype} from '@/api/businessManage/stockInV1'
import {addInventory,updateInventory,getDetail} from '@/api/businessManage/stockIn'
import FileUpload from "@/components/FileUpload";
    export default {
        name: "editDialog",
        components: { FileUpload },
        props: {         
          //0新增，1编辑,2:查看
          editMode:{
              type:Number,
              default:0
          },         
          //stockType:0: 入库, 1: 出库
          stockType:{
            type:Number,
            default:0
          }
          //contractId:selectObj.contractCode
        },
        data(){
            return{
              selProps: {
                value: 'id',
                label: 'label',
                children: 'materialSpecsTypeListSubs',
                checkStrictly: true
              },
               // 表头信息周转明细
                table_columns: [
                  {
                    prop: 'category',
                    label: '型号规格',
                    width: ''
                  },
                  {
                    prop: 'id',
                    label: '材料编码',
                    width: ''
                  },
                  {
                    prop: 'materialsNumber',
                    label: '数量',
                    width: ''
                  },
                  {
                    prop: 'units',
                    label: '单位',
                    width: '68'
                  },
                  {
                    prop: 'singleWeight',
                    label: '单位重量(kg)',
                    width: ''
                  },
                  {
                    prop: 'materialsNum',
                    label: '件数',
                    width: ''
                  },
                  {
                    prop: 'materialsWeight',
                    label: '合计重量(kg)',
                    width: ''
                  },
                  {
                    prop: 'remarks',
                    label: '备注',
                    width: ''
                  }
                ],
                //杂费明细
                 table_columns_petty: [
                  {
                    prop: 'category',
                    label: '型号规格',
                    width: ''
                  },
                  {
                    prop: 'feeName',
                    label: '杂费名称',
                    width: ''
                  },
                  {
                    prop: 'materialsNumber',
                    label: '收货数量',
                    width: ''
                  },
                  {
                    prop: 'chargeNumber',
                    label: '计费数量',
                    width: ''
                  },
                  {
                    prop: 'units',
                    label: '单位',
                    width: ''
                  },
                  {
                    prop: 'cost',
                    label: '单价',
                    width: ''
                  },
                  {
                    prop: 'totalCost',
                    label: '金额',
                    width: ''
                  },
                  {
                    prop: 'remarks',
                    label: '备注',
                    width: ''
                  }
                ],
                // 表格数据
                table_data: [{}],
                //杂项
                table_data_petty: [{}],
                //
                activenum:0,
                 // 表单参数
                form: {
                  contractId:0,//合同id
                  stockType:0,//0: 入库, 1: 出库
                  //======================================
                  carRentalFee:0,//出租运费
                  loadingFee:0,//装车费
                  unloadingFee:0,//卸车费
                  origin:"",//线路起点
                  destination:"",//线路终点
                  transportationUnitPrice:0,//运输单价
                  transportUnit:"",//运输单位
                  carNumber:"",//车牌号
                  freight:0,//运输费
                  lessorTheoreticalWeight:0,//中成理论重量
                  supplierTheoreticalWeight:0,//供应商理论重量
                  totalMiscelFee:0,//总杂费
                  actualWeight:0,//实际重量
                  balanceWeight:0,//最终结算重量
                  operator:"",//经办人
                  remark:""//备注
                },
                activeName:"revolve",
                materialtypes:[],
                transportUnits:"元/吨",
                rules: {
                  type: [
                    {
                      required: true,
                      message: "0:采购,1:租赁,2:外借,3:寄存不能为空",
                      trigger: "change",
                    },
                  ],
                }
            }
        },
        created() {
          //获取规格型号
          this.initMaterialtype();
        },
        methods:{
            //附件回写
            setResources(fileList) {
              this.form.resources = fileList;
            },
            //通过父组件编辑form信息
            updateForm(row){
              const contractId = row.contractId;
              getDetail(row.id).then((res)=>{
                debugger;
              })
              this.form = row;
            },
            //将form信息完善
            generateForm(){
              let params = this.form;
              //params.contractId = this.selectObj.id;//合同id
              params.stockType = this.stockType;//出入库
              return params;
            },
            submitForm(){
              //waiting for interface
              const form = this.generateForm();
              debugger;
              addInventory(form).then((res)=>{
                debugger;
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.$emit("closeDialog")
              });              
            },
            cancel(){
                this.$emit("closeDialog")
            },
            initMaterialtype(){
              getMaterialtype().then((res)=>{
                 let data = res.data;

                  let datastr = JSON.stringify(data).replace(/"categoryName"/g, '"label"');
                  datastr = datastr.replace(/"specsId"/g, '"id"');
                  datastr = datastr.replace(/"specsName"/g, '"label"');

                  this.materialtypes = JSON.parse(datastr)
              })
            },
            //
            handleAdd(index,row,type) {
              if(type == 'petty'){
                 this.table_data_petty.splice(index + 1, 0, {});
              }else{
                 this.table_data.splice(index + 1, 0, {});
              }             
            },
            //
            // 删除
            handleDelete(index, row,type) {
              if(type == 'petty'){
                 this.table_data_petty.splice(index, 1);
              }else{
                this.table_data.splice(index, 1);
              }
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
            },

            handleCommand(command){
              if(command == 't'){
                //t
                this.transportUnits = "元/吨"
              }else {
                //kg
                this.transportUnits = "元/kg"
              }
            },

          handleTab(){

          },
          handleChange(value, row, index) {
            let materialobj = this.getItemBykey(value);
            this.table_data[index].id = materialobj.id;
            this.table_data[index].units = materialobj.units;
            this.table_data[index].flag = materialobj.flag;
            this.table_data[index].singleWeight = materialobj.singleWeight;
            // 修改重量
            // this.table_data[index].materialsNumber = 0;
            // this.table_data[index].materialsWeight = 0;
            this.$set(this.table_data[index], 'materialsNumber', 0);
            this.changnumberdata(row, index);
          },
          handleChange_petty(value, row, index) {
            let materialobj = this.getItemBykey(value);
            this.table_data_petty[index].units = materialobj.units;
            this.table_data_petty[index].flag = materialobj.flag;
            this.table_data_petty[index].singleWeight = materialobj.singleWeight;
            // 修改重量
            // this.table_data[index].materialsNumber = 0;
            // this.table_data[index].materialsWeight = 0;
            this.$set(this.table_data_petty[index], 'materialsNumber', 0);
            this.changnumberdata(row, index);
          },
          changnumberdata(row, index) {
            this.$set(this.table_data[index], 'materialsNumber', changeNum(this.table_data[index].materialsNumber));

            let weight = accMul(
                Number(this.table_data[index].materialsNumber === undefined ? 0 : this.table_data[index].materialsNumber),
                Number(this.table_data[index].singleWeight === undefined ? 0 : this.table_data[index].singleWeight))
            this.$set(this.table_data[index], 'materialsWeight', weight);
          },
          // 根据id获取对象
          getItemBykey(keys) {
            if (keys === null || keys.length < 1) {
              return '';
            }
            if (this.materialtypes.length > 0) {
              for (let fcount in this.materialtypes) {
                let firsttype = this.materialtypes[fcount];

                if (firsttype.id === keys[0]) {
                  if (keys.length === 1) {
                    //firsttype.units = firsttype.units;
                    return firsttype;
                  }
                  for (let scount in firsttype.materialSpecsTypeListSubs) {
                    let sendtype = firsttype.materialSpecsTypeListSubs[scount];
                    if (sendtype.id === keys[1]) {
                      sendtype.units = firsttype.units;
                      sendtype.flag = firsttype.flag;
                      return sendtype;
                    }
                  }
                }
              }
            }
          },
        },
        watch: {

        }
    
    }

</script>
<style scoped>
 /deep/.tableColumn{
   padding-top:5%;
 }
</style>
