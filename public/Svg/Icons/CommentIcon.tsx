
interface Props{
  isSmall?:boolean
  isDark?:boolean
}


export function CommentIcon({isSmall,isDark}:Props) {
  return (
<svg height={isSmall ? '21px' : "26px"} width={isSmall ? '21px' : "26px"} fill="none" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
	<path d="M7.094 24.3871L0.389648 25.8769L1.8795 19.1726C0.928716 17.3946 0.389648 15.3633 0.389648 13.2061C0.389648 6.2082 6.06257 0.535278 13.0605 0.535278C20.0583 0.535278 25.7313 6.2082 25.7313 13.2061C25.7313 20.204 20.0583 25.8769 13.0605 25.8769C10.9033 25.8769 8.87201 25.3379 7.094 24.3871ZM7.46092 21.7095L8.289 22.1524C9.74387 22.9303 11.3696 23.3428 13.0605 23.3428C18.6588 23.3428 23.1971 18.8045 23.1971 13.2061C23.1971 7.60778 18.6588 3.06945 13.0605 3.06945C7.46215 3.06945 2.92382 7.60778 2.92382 13.2061C2.92382 14.897 3.33624 16.5227 4.11423 17.9776L4.55703 18.8056L3.72735 22.5392L7.46092 21.7095Z" 
   fill={`${isDark ? 'white' : '#3A3A3A'}`}/>
</svg>
  )
}
