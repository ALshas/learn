import { Result } from 'antd';
import axios from 'axios'
import qs from 'qs'; //queryString  可以把一个对象转成字符串
axios.defaults.baseURL = 'http://localhost:9000';//后端接口的主机和端口号
axios.defaults.withCredentials = true; //跨域的时候，是否携带cookie
axios.defaults.transformRequest = (data={})=> qs.stringify(data);
// response headers body data 很多属性 data属性里放的就是对象格式的响应体
axios.interceptors.response.use(Result=>Result.data)
export default axios;