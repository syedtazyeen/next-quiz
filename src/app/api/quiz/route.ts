import { generateQuiz } from "@/utils"
import { NextResponse } from "next/server"
import question_data from '@/db/quiz_questions.json'

async function gethandler() {
    try {
        const quiz = generateQuiz(question_data)
        return NextResponse.json({
            status: 200,
            data: quiz
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}


export { gethandler as GET }