import axios from 'axios';
const setNamelist=(payload)=>{
    return {
        type:'set-name-list',
        payload
    }
}
const getListAction=()=>{
    return (dispatch)=>{
       return axios.post('http://localhost:8000/apitest')
        .then(function (response) {
            const res=response.data.list;
            dispatch(setNamelist(res))
        })
    }
}
export {
    getListAction
}