import { atom } from 'recoil';

export const balanceState = atom({
    key: 'balanceState', // unique ID (with respect to other atoms/selectors)
    default: 'xxxx', // default value (aka initial value)
});
