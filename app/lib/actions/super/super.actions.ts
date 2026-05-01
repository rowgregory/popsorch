'use server'

import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { getActor } from '../user/getActor'
import { redirect } from 'next/navigation'
import { auth } from '../../auth'
import { buildLogMessage, getRequestContext } from '@/app/utils/parseUserAgent'

async function verifySuperUser() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const user = await prisma.user
    .findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })
    .catch(() => null)

  if (user?.role !== 'SUPER_USER') redirect('/v2/dashboard')
}

export async function deleteConcert(id: string) {
  await verifySuperUser()
  if (!id) return { success: false, error: 'Concert ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const concert = await prisma.concert.delete({ where: { id } }).catch(() => null)
  if (!concert) return { success: false, error: 'Failed to delete concert' }

  await createLog('info', await buildLogMessage(`deleted concert "${concert.name}"`, actor, context), {
    concertId: concert.id,
    name: concert.name,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  return { success: true }
}

export async function deleteVenue(id: string) {
  await verifySuperUser()
  if (!id) return { success: false, error: 'Venue ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const venue = await prisma.venue.delete({ where: { id } }).catch(() => null)
  if (!venue) return { success: false, error: 'Failed to delete venue' }

  await createLog('info', await buildLogMessage(`deleted venue "${venue.name}"`, actor, context), {
    venueId: venue.id,
    name: venue.name,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  return { success: true }
}

export async function deleteTeamMember(id: string) {
  await verifySuperUser()
  if (!id) return { success: false, error: 'Team member ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const teamMember = await prisma.teamMember.delete({ where: { id } }).catch(() => null)
  if (!teamMember) return { success: false, error: 'Failed to delete team member' }

  await createLog(
    'info',
    await buildLogMessage(`deleted team member "${teamMember.firstName} ${teamMember.lastName}"`, actor, context),
    {
      teamMemberId: teamMember.id,
      name: `${teamMember.firstName} ${teamMember.lastName}`,
      deletedBy: actor,
      request: context
    }
  ).catch(() => null)

  return { success: true }
}

export async function deleteEvent(id: string) {
  await verifySuperUser()
  if (!id) return { success: false, error: 'Event ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const event = await prisma.event.delete({ where: { id } }).catch(() => null)
  if (!event) return { success: false, error: 'Failed to delete event' }

  await createLog('info', await buildLogMessage(`deleted event "${event.title}"`, actor, context), {
    eventId: event.id,
    title: event.title,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  return { success: true }
}

export async function deleteTestimonial(id: string) {
  await verifySuperUser()
  if (!id) return { success: false, error: 'Testimonial ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const testimonial = await prisma.testimonial.delete({ where: { id } }).catch(() => null)
  if (!testimonial) return { success: false, error: 'Failed to delete testimonial' }

  await createLog('info', await buildLogMessage(`deleted testimonial by "${testimonial.author}"`, actor, context), {
    testimonialId: testimonial.id,
    author: testimonial.author,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  return { success: true }
}

export async function deleteSponsor(id: string) {
  await verifySuperUser()
  if (!id) return { success: false, error: 'Sponsor ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const sponsor = await prisma.sponsor.delete({ where: { id } }).catch(() => null)
  if (!sponsor) return { success: false, error: 'Failed to delete sponsor' }

  await createLog('info', await buildLogMessage(`deleted sponsor "${sponsor.name}"`, actor, context), {
    sponsorId: sponsor.id,
    name: sponsor.name,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  return { success: true }
}

export async function deleteQuestion(id: string) {
  await verifySuperUser()
  if (!id) return { success: false, error: 'Question ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const question = await prisma.question.delete({ where: { id } }).catch(() => null)
  if (!question) return { success: false, error: 'Failed to delete question' }

  await createLog('info', await buildLogMessage(`deleted question from "${question.name}"`, actor, context), {
    questionId: question.id,
    name: question.name,
    email: question.email,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  return { success: true }
}

export async function deleteUser(id: string) {
  await verifySuperUser()
  if (!id) return { success: false, error: 'User ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const user = await prisma.user.delete({ where: { id } }).catch(() => null)
  if (!user) return { success: false, error: 'Failed to delete user' }

  await createLog('info', await buildLogMessage(`deleted user "${user.email}"`, actor, context), {
    userId: user.id,
    email: user.email,
    role: user.role,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  return { success: true }
}
