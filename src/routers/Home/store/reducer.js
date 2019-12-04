const reducer=(state={nameList:[]},action)=>{
    switch(action.type){
        case 'set-name-list':
        return {
            ...state,
            nameList:action.payload
        }
        default:
            return state;
    }
}
export default reducer