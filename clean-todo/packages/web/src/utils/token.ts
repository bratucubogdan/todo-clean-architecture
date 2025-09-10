import { useStore } from '@/app/store';

export const getToken = () => useStore.getState().token;
