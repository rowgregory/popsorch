'use client'

import TeamForm from '../forms/TeamForm'

export default function TeamEditClient({ teamMember }) {
  return <TeamForm isEditing team={teamMember} />
}
