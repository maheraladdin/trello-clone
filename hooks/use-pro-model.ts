import {create} from "zustand";

type ProModelStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useProModel = create<ProModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useProModel;