import axios from 'axios';
// let domainurl='http://localhost:3000'
let domainurl='http://zy.whaoot.com:3000'
export default{
    prodlis:()=>{
      return  axios.get(`${domainurl}/prods/prodlist`)
    },
    proddetail:(id)=>{
      return  axios.get(`${domainurl}/prods/proddetail`,{params:{id:id}})
    }
}