import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Utilisez ces hooks dans votre application au lieu de useDispatch et useSelector natifs.
// Cela garantit que TypeScript connaît exactement la forme de votre état global.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;