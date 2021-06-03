import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { MovieDispatch, MovieRootState } from '../../redux/store'

export const useAppDispatch = () => useDispatch<MovieDispatch>()
export const useAppSelector: TypedUseSelectorHook<MovieRootState> = useSelector
