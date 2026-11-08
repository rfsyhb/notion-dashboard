import { useQuery } from '@tanstack/react-query';
import { getAuthStatus } from '../auth/auth';

export function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getAuthStatus,
  });
}
