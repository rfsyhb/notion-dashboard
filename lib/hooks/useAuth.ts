import { useQuery } from '@tanstack/react-query';
import { getAuthStatus } from '../auth/auth';

export const AUTH_QUERY_KEY = ['auth'];

export function useAuth() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getAuthStatus,
  });
}
