import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState } from "Redux/Store"

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default useTypedSelector
