const getInterestsMapping = async (
  isOption1: boolean,
  isOption2: boolean,
  isOption3: boolean,
  isOption4: boolean,
  agreedToPrivacyStatement: boolean,
  isNewPatron: boolean,
  interests: any,
  privacyInterestsId: string,
  newPatronInterestsId: string
) => {
  const interestMapping: Record<string, boolean> = {}

  if (isOption1) interestMapping[interests[0]] = isOption1
  if (isOption2) interestMapping[interests[1]] = isOption2
  if (isOption3) interestMapping[interests[2]] = isOption3
  if (isOption4) interestMapping[interests[3]] = isOption4
  if (agreedToPrivacyStatement) interestMapping[privacyInterestsId] = agreedToPrivacyStatement
  if (isNewPatron) interestMapping[newPatronInterestsId] = isNewPatron

  return interestMapping
}

export default getInterestsMapping
