import { useDispatch } from "react-redux"
import { AppDispatch } from "Redux/Store"

const useTypedDispatch = () => useDispatch<AppDispatch>()

export default useTypedDispatch
