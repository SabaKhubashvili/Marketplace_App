

interface Props{
  isActive?:boolean
}

export  function ContactIcon({isActive}:Props) {
  return (
<svg height="32" width="32" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
	<path d="M15.8234 31.5071C7.36455 31.5071 0.507324 24.6498 0.507324 16.191C0.507324 7.73222 7.36455 0.875 15.8234 0.875C24.2822 0.875 31.1395 7.73222 31.1395 16.191C31.1395 24.6498 24.2822 31.5071 15.8234 31.5071ZM11.0603 17.9843L11.0797 17.972C11.9676 20.9033 12.4116 22.3691 12.4116 22.3691C12.5835 22.8446 12.8199 22.9295 13.1068 22.8907C13.3935 22.8518 13.5458 22.6967 13.7329 22.5161C13.7329 22.5161 14.3399 21.9303 15.5538 20.7588L19.4608 23.6497C20.1727 24.043 20.6867 23.84 20.8635 22.9879L23.4025 11.0087C23.6828 9.89373 23.1912 9.44653 22.3266 9.80049L7.41944 15.5586C6.40244 15.9674 6.40736 16.5364 7.23429 16.7901L11.0603 17.9843Z" 
  fill={`${isActive ? '#24B47E' : '#A8A8A8'}`}/>
</svg>
  )
}