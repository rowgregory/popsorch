import { HeaderLower } from './HeaderLower'

export const Header = ({ concerts, campApplicationsSetting }) => {
  return (
    <>
      {/* Main navigation / header lower section */}
      <HeaderLower
        concerts={concerts}
        campApplicationsSetting={campApplicationsSetting}
        aria-label="Main site navigation"
      />
    </>
  )
}
