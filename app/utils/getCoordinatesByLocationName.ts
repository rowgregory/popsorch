export const getCoordinatesByLocationName = (locationName: string) => {
  switch (locationName) {
    case 'SCF Neel Performing Arts Center':
      return { lat: 27.438635, long: -82.589485 }
    case 'Manatee High School Davis Performing Arts Center':
      return { lat: 27.497813, long: -82.567785 }
    default:
      return { lat: 27.282769, long: -82.520595 } // Default coordinates
  }
}
