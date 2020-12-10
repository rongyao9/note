
<template>
  <span>{{ printVal }}</span>
</template>

<script>
// 使用方式
// <count-in  :startVal='0' :endVal='100.525' :speed='500' :decimals="0" :isReverse='true' />
// 样式:外部修改
// startVal:开始数值
// endVal:结束数值
// speed:速度（数值越小，速度越慢）
// decimals:保留几位小数
// isReverse:true 是否支持从大到小（已经进行数值动态判断处理，所以此值没有意义了）
export default {
  props: {
    startVal: {
      type: [String, Number],
      default: "",
    },
    endVal: {
      type: [String, Number],
      default: "",
    },
    speed: {
      type: [String, Number],
      default: 5,
    },
    decimals: {
      type: [String, Number],
      default: 0,
    },
    isReverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      start: +this.startVal,
      end: +this.endVal,
      formatSpeed: +this.speed || 5,
    };
  },
  computed: {
    formatDecimals() {
      let formatDecimals = this.decimals > 0 ? this.decimals : 0;
      return formatDecimals;
    },
    decimalsLen() {
      let decimalsLen = Math.pow(10, this.formatDecimals);
      return decimalsLen;
    },
    printVal() {
      let start = (
        parseInt(this.start * this.decimalsLen, 10) / this.decimalsLen
      ).toFixed(this.formatDecimals);
      return start;
    },
  },
  watch: {
    endVal: {
      handler(val) {
        this.$nextTick(() => {
          this.start = +this.startVal;
          this.end = +this.endVal;
          this.formatSpeed = +this.speed || 20;
          this.accumulativeMachine();
        });
      },
    },
  },
  methods: {
    accumulativeMachine() {
      setTimeout(() => {
        if (this.isReverse) {
          let decimals = this.formatDecimals === 0 ? 0 : 1 / this.decimalsLen;
          let formatSpeed = this.formatSpeed / this.decimalsLen + decimals;
          this.start -= formatSpeed;
          if (this.printVal <= this.end) {
            this.start = this.end;
            return;
          }
        } else {
          let decimals = this.formatDecimals === 0 ? 0 : 1 / this.decimalsLen;
          let formatSpeed = this.formatSpeed / this.decimalsLen + decimals;
          this.start += formatSpeed;
          if (this.printVal >= this.end) {
            this.start = this.end;
            return;
          }
        }
        this.accumulativeMachine();
      }, 8);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.accumulativeMachine();
    });
  },
};
</script>
