import { atom } from 'recoil';

const activeUserState = atom({
    key: 'activeUserState',
    default: [] as string[]
});

export default activeUserState;
