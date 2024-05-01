'use client'
import QuizProvider from '@/config/providers/QuizProvider'
import React from 'react'

const QuizLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QuizProvider>
            {children}
        </QuizProvider>
    )
}

export default QuizLayout