import { selector } from 'recoil';

import activeUserState from '@/store/activeUserState';

const activeUserSelector = selector({
    key: 'activeUserSelector',
    get: ({ get }) => {
        const users = get(activeUserState);
        return users;
    }
});

export default activeUserSelector;
