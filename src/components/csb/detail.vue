<template>
  <div class="csb-detail">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">产品解读</mt-tab-item>
      <mt-tab-item id="2">问题解答</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="cd">
          <h2 class="cd-title">开通说明</h2>
          <p>
            在“炉料汇”注册并认证，连续三个月有交易记录，且其认证信息中个人信息块为该企业的法人信息的企业，有机会获得开通“采赊宝”的资格，企业“采赊宝”授信额度大小与其在“炉料汇”上交易额、信用等因素</br>
            （1）开通所需材料</br>
            ● 企业法人本人的身份证正、反面照片，手持本人身份证照片。</br>
            ● 企业法人本人的银行借记卡正反面照片。</br>
            ● 企业法人本人实名认证的手机号。</br>
            ● 企业法人名下汽车车牌号(有车必填)。</br>
            ● 企业法人配偶身份证号码、手机号码(已婚必填)。</br>
            ● 企业营业执照照片（目前工商营业执照、组织机构代码证和税务登记证三证合一）或统一信用代码照片。</br>
            ● 企业详细地址，企业的固定电话或者手机号码。</br>
            ● 2名紧急情况下的联系人姓名、手机号。</br>
            ● 平台id使用授权书，门店照片(门头+法人手持营业执照)和营业执照照片。</br>
            ● 企业公章准备，以便线下核身材料中盖章使用。</br>
          </p>
        </div>

        <div class="cd">
          <h2 class="cd-title">“采赊宝”借款说明</h2>
          <p>
            （1）平台审核确认客户订单信息后，客户在订单中心中，找到所需要融资的订单，点击“采赊宝”，进行融资服务。（贷款期限： 30天，到期一次性还本付息方式，可提前还款）</br>
            （2）页面跳转至支用页面之后，页面联动计算出到期日期和应还利息，客户确认后，在线生成借款合同；</br>
            （3）客户提交贷款申请跳转至借款合同页面，客户在线同意并签署借款合同后，界面提示客户支用成功；客户首次支用及额度变更时，签署《最高额借款合同》，以后每次支用时签署借据。
          </p>
        </div>

        <div class="cd">
          <h2 class="cd-title">“采赊宝”还款说明</h2>
          <p>
            <strong>（1）提前还款</strong></br>
            （a）受理时间：3:00am--14：00pm之间，其余时间页面不可发起提前还款操作 。</br>
            （b）允许客户提前全部还款，不接受部分还款。</br>
            （c）提前还款线下转账时，客户在备注中标明：“姓名”或“替XXX”还款、“提前还款”字样和“贷款订单号”。</br>
            <strong>（2）到期还款：</strong></br>
            （a）到期当天，客户按照应还金额主动转账还款，尽量在到期日上午操作；</br>
            <strong>（3）退货还款</strong></br>
            （a）受理时间：3:00am--15:00pm之间。</br>
            （b）只支持全部退货，用户在平台选择“退款”按钮，用户与平台最终达成一致后进行退货，退货后由平台进行还款操作。</br>
            <strong>（4）人工受理</strong></br>
            （a）平台业务受理时间在9:00am~16:30pm；T+1日工作时间；客户转账资金以实际到账时间为准，为保证线下转账及时到账，请客户在工作日16:00前操作转账还款。</br>
            （b）人工受理后恢复客户额度。
          </p>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="cd">
          <h2 class="cd-title">为什么我不能开通"采赊宝"？</h2>
          <p>
在“炉料汇”注册并认证，连续三个月有交易记录，且其认证信息中个人信息块为该企业的法人信息的企业，有机会获得开通“采赊宝”的资格，企业“采赊宝”授信额度大小与其在“炉料汇”上交易额、信用等因素有关。
          </p>
        </div>

        <div class="cd">
          <h2 class="cd-title">节假日还款怎么处理？</h2>
          <p>
为了避免逾期，如果还款到期日是节假日，建议您在到期日之前进行还款操作（计息日期计算截止为您的还款日）。
          </p>
        </div>

        <div class="cd">
          <h2 class="cd-title">正常还款怎么操作？</h2>
          <p>
正常还款建议在到期日当天上午（只限工作日）进行转账，不需要在线上发起还款申请。
          </p>
        </div>

        <div class="cd">
          <h2 class="cd-title">提前还款怎么操作？</h2>
          <p>
正确的还款流程应该是先进行线下或者网银转账（标注好资金备注，姓名”或“替XXX”还款，“提前还款”字样和“贷款订单号”）， 后再在网上提交还款申请（一定要在网上提交还款申请，否则无法识别还款人）。
          </p>
        </div>

        <div class="cd">
          <h2 class="cd-title">提前还款怎么计算贷款费用，逾期了怎么计算费用的？</h2>
          <p>
提前还款利率按照产品正常利率进行计算，贷款利息总额=0.05%*贷款天数*贷款总额.逾期利息总额=0.05%*30*贷款总额+0.075%*逾期天数*贷款总额。
          </p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '1'
    };
  },
  components: {
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
@import '../../style/base.styl';

.csb-detail {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}

.cd {
  padding: 30px;
  background-color: #ffffff;
  margin-top: 20px;

  .cd-title {
    padding: 0 0 30px 0;
    padding-left: 18px;
    font-size: 24px;
    color: #282828;
    position: relative;

    &:before {
      left: 0;
      content: '';
      position: absolute;
      width: 8px;
      height: 32px;
      background-color: #247ef2;
    }
  }

  p {
    font-size: 20px;
    color: #282828;
    line-height: 1.8;
    margin: 0;
    text-align: justify;
  }
}
</style>
