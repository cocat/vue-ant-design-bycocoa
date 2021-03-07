<template>
  <a-form>
    <a-select
      show-search
      :value="value"
      placeholder="input search text"
      :show-arrow="false"
      :not-found-content="null"
      @search="handleSearch"
      @blur="handleBlur"
      @select="handleSelect"
      @keyup.enter.native="handleEnter(value)"
      :defaultActiveFirstOption="false"
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

//拿数据 render UI
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

export default {
  data() {
    return {
      data: [],
      value: undefined,
    };
  },
  //未实现 ------ 这里想要判断键盘是否是enter事件，如果enter对应是下拉框，那么阻止冒泡
  //但是问题是，先触发了handleSelect事件，因为handleSelect事件，核心原理是option没有触发事件，只有select有事件，这个先后顺序没通
  mounted() {
    document.addEventListener("keyup", (e) => {
      //   var key = e.key;
      console.log(e);
      if (e.key == "Enter") {
        //e 是个KeyboardEvent事件
        //e.target对应是个元素
        // console.log(e.target);
        console.log("e.target事件");
        var ele = e.target;
        ele.stopPropagation();
      }
    });
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
    },

    //下拉选中
    handleSelect(v) {
      this.value = v;
      //   console.log("选中");
      window.location.href = "https://www.baidu.com/s?wd=58";
    },

    //输入框回车 本来想用keycode来判断，没搞定，发现vue有一个键盘监听，详见https://blog.csdn.net/xiaxiangyun/article/details/80404768
    //未实现 ------要区分 输入框回车 和 下拉框回车
    handleEnter(v) {
      this.data = [];
      this.value = v;
      //   console.log("回车");
      window.location.href = "https://www.baidu.com/s?wd=58";
    },

    //搜索btn
    handleSubmit() {
      //直接传参了
      const str = this.value;
      window.location.href = `https://www.baidu.com/s?wd=${str}`;
    },
  },
};
</script>


<style lang=less scoped>
/* 失焦样式 */
.selectonFocus {
  width: 500px;
  margin: 30px 10px 0 10px;
  background-color: yellow;
}
</style>