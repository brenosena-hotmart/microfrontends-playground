import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

const useCounterStore = () => useAtom(countAtom);

export default useCounterStore;
