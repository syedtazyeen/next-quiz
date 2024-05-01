'use client'
import Result from '@/types/result.d'
import { formatMilliseconds } from '@/utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ResultPage = () => {
    const router = useRouter()
    const [result, setResult] = useState<Result | undefined>(undefined)

    useEffect(() => {
        const storedResult = localStorage.getItem('result');
        
        if (storedResult) {
            const parsedResult = JSON.parse(storedResult) as Result;
            setResult({
                attempted: parsedResult.attempted,
                timeStamp: parsedResult.timeStamp,
                correct: parsedResult.correct,
                violations : parsedResult.violations,
                questions: parsedResult.questions
            });
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
                {result ? (
                    <>
                        <h2 className="text-4xl font-semibold text-gray-800 mb-4">Quiz Result</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <p className="text-lg text-gray-700 mb-1">Correct:</p>
                                <p className="text-3xl text-blue-500 font-semibold">{result.correct}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg text-gray-700 mb-1">Attempted:</p>
                                <p className="text-3xl text-blue-500 font-semibold">{result.attempted}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg text-gray-700 mb-1">Violations:</p>
                                <p className="text-3xl text-blue-500 font-semibold">{result.violations}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg text-gray-700 mb-1">Questions:</p>
                                <p className="text-3xl text-blue-500 font-semibold">{result.questions}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg text-gray-700 mb-1">Quiz time:</p>
                                <p className="text-3xl text-blue-500 font-semibold">{formatMilliseconds(result.timeStamp)}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/')}
                            className='my-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Go to home</button>
                    </>
                ) : (
                    <p className="text-lg text-gray-700">No result found!</p>
                )}
            </div>
        </div>
    )
}

export default ResultPage