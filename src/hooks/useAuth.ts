import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useAuth = () => {
  const { user, isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    isAuthenticated,
    isInitialized,
    isUser: user?.role === 'user',
    isAgent: user?.role === 'agent',
    isAdmin: user?.role === 'admin',
  };
};