
interface Props{
    label:string
    onClick:(value:string)=>void,
    isActive?:boolean
}

export const TagsSliderComponent = ({label,onClick,isActive}:Props) => {
  return (
    <div
    onClick={()=>onClick(label)}
    className={`rounded-[107px] 2xl:w-[7rem] w-[6rem] text-center flex items-center justify-center dark:bg-transparent bg-white 
    border-[1px] border-solid px-[32px] py-[17px]  font-bold cursor-pointer select-none border-[#989898]
    ${isActive ? 'dark:text-white dark:border-white bg-[#98989869] text-neutral-700 ' : 'text-[#989898]' }
    `}>
        {label}
    </div>
  )
}
