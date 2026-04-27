import prisma from '@/prisma/client'

export const getQuestions = async () => {
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
}
