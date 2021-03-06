<template>
  <a-select
    show-search
    :value="value"
    placeholder="input search text"
    style="width: 200px"

    @search="handleSearch"
    @change="handleChange"
  >
    <a-select-option v-for="d of data" :key="d" style="height:1600px">
      {{ d }}
    </a-select-option>
  </a-select>
</template>
<script>
import jsonp from 'fetch-jsonp';

let timeout;

//节流
function fetch(value,callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  //这里没想清楚 ,value是输入的内容
  //currentValue = value;
    console.log(value)

    function fake() {
    //看官网，cb函数  https://www.npmjs.com/package/fetch-jsonp ..json携带指令没搞明白
    jsonp(`https://www.baidu.com/sugrec?ie=utf-8&json=1&prod=pc&from=m_web&wd=58&cb=abc&_=1614768701183`,{
    jsonpCallback: 'cb'})
      .then(response => response.json())
      .then(d => {
        //先拿到了对应的数组（其实还是json对象）
        var jsonData = d.g;
        //将json对象转成数组
        var text=eval(jsonData);
        const data=[];

        for(var i=0;i<text.length;i++){
        data[i] = text[i].q
        }
        // console.log(data);
        callback(data);
      }
    )
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
  methods: {
    handleSearch(value) {
      fetch(value, data => (this.data = data));
    },
    handleChange(value) {
      console.log(value);
      this.value = value;
      fetch(value, data => (this.data = data));
    },
  },
};
</script>
