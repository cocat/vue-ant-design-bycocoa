<template>
  <a-form>
    <!-- 方法一 选用 -->
    <!-- @keyup.enter.native="handleEnter(value)" -->

    <!-- 方法二、 三选用 -->
    <!-- @focus="handleFocus" -->
    <a-select
      show-search
      :value="value"
      placeholder="建议联想搜索关键词：58"
      :show-arrow="false"
      :not-found-content="null"
      @search="handleSearch"
      @blur="handleBlur"
      @select="handleSelect"
      @focus="handleFocus"
      class="selectonFocus"
      :defaultActiveFirstOption="false"
    >
      <a-select-option
        class="selectOption"
        v-for="d of data"
        :key="d"
        style="height: 1600px"
      >
        {{ d }}
      </a-select-option>
    </a-select>
    <a-button type="primary" @click="handleSubmit">搜索</a-button>
  </a-form>
</template>
<script>
import jsonp from "fetch-jsonp";

//取数据 render UI
function fetch(value, callback) {
  let timeout;
  //节流
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  //   const currentValue = value;
  //拿到数据
  function fake() {
    //看官网，cb函数  https://www.npmjs.com/package/fetch-jsonp
    jsonp(
      `https://www.baidu.com/sugrec?ie=utf-8&json=1&prod=pc&from=m_web&wd=${value}&cb=abc&_=1614768701183`,
      { jsonpCallback: "cb" }
    )
      .then((response) => response.json())
      .then((d) => {
        const data = [];
        // console.log(d.g);
        const text = d.g;
        for (let i in text) {
          data[i] = text[i].q;
        }
        callback(data);
      });
  }
  timeout = setTimeout(fake, 300);
}

//跳转链接 判断
function jump(v) {
  //   判断v=this.value 是否为空
  if (v == null) {
    alert("还没有输入内容");
    return false;
  }
  window.location.href = `https://www.baidu.com/s?wd=${v}`;
}

//事件监听函数 --- 对应方法二
function handleEnter(event) {
  let x = event.which || event.keyCode;
  if (x == 13) {
    const str = this.value;
    jump(str);
  }
}

//事件监听函数 --- 对应方法三
// function handleEnterKey(e) {
//   if (e.key == "Enter") {
//     let str = this.value;
//     jump(str);
//   }
// }

export default {
  data() {
    return {
      data: [],
      value: undefined,
    };
  },

  methods: {
    //输入框输入
    handleSearch(value) {
      //在每一次改变前去清空输入框，重新拉取数据
      this.data = [];
      this.value = value;
      fetch(value, (data) => (this.data = data));
    },

    //输入框失焦
    handleBlur(value) {
      this.value = value;
      this.data = [];
      //   console.log("没有及时清空");
      document.removeEventListener("keyup", handleEnter.bind(this), false);
    },

    //下拉选中
    handleSelect(v) {
      this.value = v;
      //   console.log("选中");
      jump(v);
    },

    //回车方法一 最简单  通过vue原生方法@keyup.enter 监听，详见https://blog.csdn.net/xiaxiangyun/article/details/80404768
    // handleEnter(v) {
    //   this.data = [];
    //   this.value = v;
    //   jump(v);
    // },

    //回车方法二 keycode来判断
    handleFocus() {
      document.addEventListener("keyup", handleEnter.bind(this), false);
      //在handleBlur里remove
    },

    // 回车方法三 event.key == "enter"判断
    // handleFocus() {
    //   document.addEventListener("keyup", handleEnterKey.bind(this), false);
    // },

    //搜索btn
    handleSubmit() {
      // 跳转链接
      const currentvalue = this.value;
      jump(currentvalue);
    },
  },
};
</script>


<style lang=less scoped>
/* 失焦样式 */
.selectonFocus {
  width: 500px;
  margin: 30px 10px 0 10px;
}
</style>