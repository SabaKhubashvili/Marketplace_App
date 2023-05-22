import {create} from 'zustand'

interface loginModalStorage{
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void,
}

export  const useLoginModal = create<loginModalStorage>((set)=>({
    isOpen:false,
    onOpen:()=>{set({isOpen:true})},
    onClose:()=>{set({isOpen:false})},
})) 