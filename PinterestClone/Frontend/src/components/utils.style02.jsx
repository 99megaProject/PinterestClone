import { useDispatch, useSelector } from 'react-redux'




// apperacne style 
const appearanceStyleFn = () => {

    const appearance = useSelector((state) => state.uiFeatureSlice.appearance)
    return appearance ? 'bg-white text-black' : 'bg-black text-white'
}






export { appearanceStyleFn }