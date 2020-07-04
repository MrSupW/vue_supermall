import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL:'http://192.168.0.102:8000',
    timeout: 2000
  })

  instance.interceptors.request.use(config =>{
    return config
  },err => {
    console.log(error);
    return err
  })

  instance.interceptors.response.use(res => {
    // console.log(res.data);
    return res.data.sort(function () {
      return Math.random()>0.5?-1:1
    })
  },err =>{
    console.log(err);
    return err
  })

  return instance(config)
}

export function t_request(config) {
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout: 2000
  })

  instance.interceptors.request.use(config =>{
    return config
  },err => {
    console.log(error);
    return err
  })

  instance.interceptors.response.use(res => {
    // console.log(res.data)
    return res.data
  },err =>{
    // console.log(err);
    return err
  })
  return instance(config)
}
