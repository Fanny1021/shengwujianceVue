import axios from 'axios'
import QS from 'qs';
import {Message} from 'element-ui'
import store from '../store/index'

let baseUrl="https://result.eolinker.com/CcJhquY51322006261d86885c9778c1aab67eb0dfdec76b?uri=localhost:8080";
// let baseUrl="http://192.168.0.147:8080/";
const $axio = axios.create({
  baseURL: baseUrl,
  responseType: 'json',
  transformResponse: [function (data) {
    return data
  }],
  timeout: 30000
})
$axio.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
$axio.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    // 对请求错误做些什么
Message.error({message:"请求超时"});
  }
);

// 响应拦截器
$axio.interceptors.response.use(
  response => {
    // 对响应数据做点什么,一般是判断状态码，进行一些逻辑处理
    if(!response.status)
    if (response.status && response.status == 200 && response.data.status == 500)
    {
      Message.error({message:response.data.message});
      return ;}
    if(response.data!=null)
    {
Message.success({message:response.data.message});
    }
    return response;
  },

  error => {
    // 对响应错误做点什么
    if(error.status!=null)
    if (error.response.status == 504 || error.response.status == 404) {
      Message.error({message: '未找到服务器'});
    } else if (error.response.status == 403) {
      Message.error({message: '禁止访问,请联系管理员!'});
    } else if (error.response.status == 401) {
      Message.error({message: error.response.data.msg});
    } else {
      if (error.response.data.msg) {
        Message.error({message: error.response.data.msg});
      }else{
        Message.error({message: '未知错误!'});
      }
    }
    return Promise.reject(error) ;
  }
);

//DELETE请求
//用来删除某一个资源的，该请求就像数据库的delete操作
export const $deleteJson = function (url,params) {
  return new Promise((resolve, reject) => {
    $axio({
      method: 'delete',
      url: url,
      params,
      dataType: "json",
      crossDomain: true,
      cache: false
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

//PUT请求
//向服务器端发送数据的，从而改变信息，
// 该请求就像数据库的update操作一样，
// 用来修改数据的内容，但是不会增加数据的种类等，
// 也就是说无论进行多少次PUT操作，其结果并没有不同
//主要作用在一个具体资源之上的（url/xxx），通俗一下讲就是，如URL可以在客户端确定，那么可使用PUT，否则用POST。
export const $putJson = function (url,params) {
  return new Promise((resolve, reject) => {
    $axio({
      method: 'put',
      url: url,
      params,
      dataType: "json",
      crossDomain: true,
      cache: false
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
//GET请求向数据库发索取数据的请求，从而来获取Json信息，
// 该请求就像数据库的select操作一样，只是用来查询一下数据，不会修改、增加数据，
// 不会影响资源的内容，即该请求不会产生副作用
export const $getJson = function (url,params) {
  return new Promise((resolve, reject) => {
    $axio({
      method: 'get',
      url: url,
      params,
      dataType: "json",
      crossDomain: true,
      cache: false
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
//POST请求
//向服务器端发送Json数据的，但是该请求会改变数据的种类等资源，
// 就像数据库的insert操作一样，会创建新的内容。
// 几乎目前所有的提交操作都是用POST请求的
//POST主要作用在一个集合资源之上的（url）
export const $postJson = function (url,params) {
  return new Promise((resolve, reject) => {
    $axio({
      method: 'post',
      url: url,
      params,
      dataType: "json",
      crossDomain: true,
      cache: false
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

