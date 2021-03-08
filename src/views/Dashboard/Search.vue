<template>
  <a-form>
    <!-- 方法一 选用 -->
    <!-- @keyup.enter.native="handleEnter(value)" -->

    <!-- 方法二、 三选用 -->
    <!-- @focus="handleFocus" -->
    <a-select
      show-search
      :value="value"
      placeholder="联想搜索关键词：58"
      :show-arrow="false"
      :not-found-content="null"
      @search="handleSearch"
      @blur="handleBlur"
      @select="handleSelect"
      @keyup.enter.native="handleEnter(value)"
      class="selectonFocus"
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

  const currentValue = value;
  //拿到数据
  function fake() {
    //看官网，cb函数  https://www.npmjs.com/package/fetch-jsonp ..json携带指令没搞太明白
    jsonp(
      `https://www.baidu.com/sugrec?ie=utf-8&json=1&prod=pc&from=m_web&wd=58&cb=abc&_=1614768701183`,
      { jsonpCallback: "cb" }
    )
      .then((response) => response.json())
      .then((d) => {
        const data = [];
        if (currentValue == "58") {
          //先拿到了对应的数组（其实还是json对象）
          var jsonData = d.g;
          //将json对象转成数组
          var text = eval(jsonData);

          for (var i = 0; i < text.length; i++) {
            data[i] = text[i].q;
          }
          //   console.log(data);
          callback(data);
        }
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
  const str = v;
  window.location.href = `https://www.baidu.com/s?wd=${str}`;
}

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
      this.data = [];
      this.value = value;
      document.removeEventListener(
        "keyup",
        (e) => {
          if (e.key == "Enter") {
            var str = this.value;
            console.log("事件监听");
            jump(str);
          }
        },
        false
      );
    },

    //下拉选中
    handleSelect(v) {
      this.value = v;
      //   console.log("选中");
      jump(v);
    },

    //回车 方法一  通过vue原生方法@keyup.enter 实现监听，详见https://blog.csdn.net/xiaxiangyun/article/details/80404768
    handleEnter(v) {
      this.data = [];
      this.value = v;
      jump(v);
    },

    //回车 方法二 keycode来判断 添加\移除addeventlistener
    // handleFocus() {
    //   document.addEventListener(
    //     "keyup",
    //     (event) => {
    //       var x = event.which || event.keyCode;
    //       if (x == 13) {
    //         var str = this.value;
    //         jump(str);
    //       }
    //     },
    //     false
    //   );
    // },

    //回车 方法三 事件监听event.key
    // handleFocus() {
    //   document.addEventListener(
    //     "keyup",
    //     (e) => {
    //       if (e.key == "Enter") {
    //         var str = this.value;
    //         jump(str);
    //       }
    //     },
    //     false
    //   );
    // },

    //搜索btn
    handleSubmit() {
      // 跳转链接
      var currentvalue = this.value;
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