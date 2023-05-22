interface Props{
    isDark?:boolean
}
export const ReportIcon = ({isDark}:Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 21 21">
    <g>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill={isDark ? '#808080' : '#181818'} transform="translate(-419 -600)">
          <g transform="translate(56 160)">
            <path d="M381.9 440h-12.6c-1.16 0-2.1.895-2.1 2v8c0 1.105.94 2 2.1 2h12.6c1.16 0 2.1-.895 2.1-2v-8c0-1.105-.94-2-2.1-2m-16.8 1v18c0 .552-.47 1-1.05 1-.58 0-1.05-.448-1.05-1v-18c0-.552.47-1 1.05-1 .58 0 1.05.448 1.05 1"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
  )
}
