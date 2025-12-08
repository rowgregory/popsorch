const exportCampApplications = (campApplications: any[]) => {
  const convertToCSV = (data: any) => {
    if (!data || data.length === 0) return ''

    // Define headers based on the CampApplication model
    const headers = [
      'Application ID',
      'Student ID',
      'Student First Name',
      'Student Last Name',
      'Grade',
      'School',
      'Student Email',
      'Student Phone',
      'Address ID',
      'Address Line 1',
      'Address Line 2',
      'City',
      'State',
      'ZIP/Postal Code',
      'Parent ID',
      'Parent First Name',
      'Parent Last Name',
      'Relationship to Student',
      'Parent Email',
      'Parent Phone',
      'Consent',
      'Music Teacher',
      'Strings',
      'Brass and Percussion',
      'Woodwinds',
      'Referral Source',
      'Created At',
      'Updated At'
    ]

    // Convert data to CSV rows
    const rows = data.map((app: any) => [
      app.id || '',
      app.student?.id || '',
      app.student?.firstName || '',
      app.student?.lastName || '',
      app.student?.grade || '',
      app.student?.school || '',
      app.student?.studentEmailAddress || '',
      app.student?.studentPhoneNumber || '',
      app.address?.id || '',
      app.address?.addressLine1 || '',
      app.address?.addressLine2 || '',
      app.address?.city || '',
      app.address?.state || '',
      app.address?.zipPostalCode || '',
      app.parent?.id || '',
      app.parent?.firstName || '',
      app.parent?.lastName || '',
      app.parent?.relationshipToStudent || '',
      app.parent?.parentEmailAddress || '',
      app.parent?.parentPhoneNumber || '',
      app.consent ? 'Yes' : 'No',
      app.musicTeacher || '',
      app.strings || '',
      app.brassAndPercussion || '',
      app.woodwinds || '',
      app.referralSource || '',
      app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '',
      app.updatedAt ? new Date(app.updatedAt).toLocaleDateString() : ''
    ])

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map((row) => row.map((field: any) => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    return csvContent
  }

  const downloadCSV = (csvContent: any, filename: any) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleExport = async () => {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const csvContent = convertToCSV(campApplications)
    const filename = `camp_applications_${new Date().toISOString().split('T')[0]}.csv`

    downloadCSV(csvContent, filename)
  }

  return handleExport
}

export default exportCampApplications
