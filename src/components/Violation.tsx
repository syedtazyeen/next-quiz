import { QuizContext } from '@/config/providers/QuizProvider';
import React, { useContext, useEffect, useState } from 'react'

const Violation = () => {
    const [violationCount, setViolationCount] = useState<number>(0);
    const { quiz, addViolation } = useContext(QuizContext);


    useEffect(() => {

        if (quiz.violations > 0) setViolationCount(quiz.violations)
        if (violationCount > 0) addViolation()

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                setViolationCount(violationCount + 1);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [violationCount]);

    if (violationCount <= 0) return

    return (
        <div className='fixed top-0 left-[44%]'>
            <div className='bg-red-500 m-2 p-2 rounded-xl w-fit text-white font-bold'>
                <h1>You have {violationCount} violation{violationCount > 1 ? 's' : ''}</h1>
            </div>
        </div>
    );
}

export default Violation