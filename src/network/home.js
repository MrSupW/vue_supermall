import  {request,t_request} from "./request";

export function getHomeMultidata(){
  return t_request({
    url :'/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return t_request({
    url: '/home/data',
    params:{
      type: type,
      page: page
    }
  })
}

