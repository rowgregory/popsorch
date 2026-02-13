import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getQuestions = unstable_cache(
  async () => {
    try {
      const questions = await prisma.question.findMany({ orderBy: { createdAt: 'desc' } })

      return {
        questions,
        count: questions.length,
        noQuestions: questions.length === 0
      }
    } catch (error) {
      return {
        questions: [],
        count: 0,
        noQuestions: 0
      }
    }
  },
  ['getQuestions'],
  {
    tags: ['Question']
  }
)
