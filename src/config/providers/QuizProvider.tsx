import React, { createContext, useState, useEffect } from 'react';
import Question from '@/types/question';
import Response from '@/types/response';
import { calculateResult } from '@/utils';
import { useRouter } from 'next/navigation';

interface QuizContextProps {
    quiz: Quiz;
    setResponses: (response: Response) => void;
    addViolation: () => void;
    updateCurrentIndex: () => void;
    submitQuiz: () => void
}

interface Quiz {
    questions: Question[];
    sequence: string[];
    responses: Response[];
    violations: number;
    currentIndex: number;
}

const defaultQuiz: Quiz = {
    questions: [],
    sequence: [],
    responses: [],
    violations: 0,
    currentIndex: 0,
};

export const QuizContext = createContext<QuizContextProps>({
    quiz: defaultQuiz,
    setResponses: () => { },
    addViolation: () => { },
    updateCurrentIndex: () => { },
    submitQuiz: () => { }
});

const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedQuiz = localStorage.getItem('quiz');
    const initialQuiz = storedQuiz ? JSON.parse(storedQuiz) : defaultQuiz;
    const [quiz, setQuiz] = useState<Quiz>(initialQuiz);
    const router = useRouter()


    useEffect(() => {
        if (storedQuiz && storedQuiz !== initialQuiz) {
            setQuiz(JSON.parse(storedQuiz));
        } else {
            fetchQuizFromApi();
        }
    }, []);


    const fetchQuizFromApi = async () => {
        try {
            const response = await fetch('/api/quiz');
            if (!response.ok) {
                throw new Error('Failed to fetch quiz');
            }
            const data = await response.json();
            const res: Quiz = {
                questions: data.data.questions,
                sequence: data.data.sequence,
                responses: [],
                violations: 0,
                currentIndex: 0
            }
            setQuiz(res)
            localStorage.setItem('quiz', JSON.stringify(res));
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    const setResponses = (response: Response) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            responses: prevQuiz ? [...prevQuiz.responses, response] : [response],
        }));
    };


    const addViolation = () => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            violations: prevQuiz.violations + 1,
        }));
    };

    const updateCurrentIndex = () => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            currentIndex: prevQuiz.currentIndex + 1,
        }));
    };

    const submitQuiz = async () => {
        try {
            const res = await calculateResult(quiz.questions, quiz.responses, quiz.violations);
            localStorage.removeItem('quiz');
            localStorage.setItem('result', JSON.stringify(res));
            router.push('/result');
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    useEffect(() => {
        localStorage.setItem('quiz', JSON.stringify(quiz));
    }, [quiz]);

    return (
        <QuizContext.Provider value={{ quiz, setResponses, addViolation, updateCurrentIndex, submitQuiz }}>
            {children}
        </QuizContext.Provider>
    );
};

export default QuizProvider;
