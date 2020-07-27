import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import Axios from "axios";
import store from "./../store";
import {axios_dataToFormdata,axios_addToken} from '@/utils/utils'
import { Toast, Notify, Dialog } from 'vant';
import router from './../router'
var axiosInitialConfig = {
  timeout: 10000,
  withCredentials: false,
  validateStatus: function (status) {
    return status >= 200 && status <= 500
  }
}
NProgress.configure({
  showSpinner: false,
  speed: 800,
  trickle: true
});
var axiosBase = Axios.create(axiosInitialConfig);
// HTTPrequest拦截
axiosBase.interceptors.request.use(config => {
  NProgress.remove();
  NProgress.start() // start progress bar;
  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
axiosBase.interceptors.response.use(res => {
  NProgress.done()
  const status = Number(res.status) || 200
  const errmsg = res.data.errmsg || '请稍候重试!';
  const errcode = Number(res.data.errcode);
  if (errcode != 0 || status != 200) {
    
    if (errcode == 401 || errcode == 402) {
      router.push('/login');
    }else{
      Toast({ message: errmsg, forbidClick: true, duration: 1000 });
    }
    return Promise.reject(res.data.errmsg);
  } else {
    return Promise.resolve(res.data);
  }
}, error => {
  NProgress.done();
  return Promise.reject(new Error(error))
})

export const axiosByFormData = (params) => {
  params = axios_addToken(params);
  var config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: axios_dataToFormdata(params.data)
  }
  return axiosBase(Object.assign(params, config))
}
export const axiosSilent = (config) => {
    config = axios_addToken(config);
    var axiosInstance = Axios.create(axiosInitialConfig);
    axiosInstance.interceptors.response.use(res => {
      const status = Number(res.status) || 200
      const errcode = res.data.errcode;
      if (errcode != 0 || status != 200) {
        return Promise.reject(res.data.errmsg);
      } else {
        return Promise.resolve(res.data);
      }
    }, error => {
      return Promise.reject(new Error(error))
    })
    config.data = axios_dataToFormdata(config.data);
    return axiosInstance({...config}) 
}
export default axiosByFormData;