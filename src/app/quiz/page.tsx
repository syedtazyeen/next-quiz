"use client"
import React, { useState, useEffect, useContext } from 'react';
import { QuizContext } from '@/config/providers/QuizProvider';
import Violation from '@/components/Violation';
import Question from '@/types/question';
import Modal from '@/components/Modal';
import ButtonPrimary from '@/components/ButtonPrimary';


const QuizPage = () => {
  const { quiz, setResponses, updateCurrentIndex, submitQuiz } = useContext(QuizContext);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number>(-1);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  useEffect(() => {
    setQuestions(quiz.questions)
    quiz.currentIndex && setCurrentQuestionIndex(quiz.currentIndex)
  }, [quiz])

  // Function to render choices
  const renderChoices = () => {
    return questions[currentQuestionIndex]?.options.map((choice, index) => (
      <div
        key={index}
        className={`p-2 border-2 rounded-md cursor-pointer bg-white ${selectedChoiceIndex === index ? 'border-blue-500' : 'border-white'}`}
        onClick={() => handleChoiceSelection(index)}
      >
        {choice}
      </div>
    ));
  };

  const handleChoiceSelection = (choiceIndex: number) => {
    setSelectedChoiceIndex(choiceIndex);
  };


  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsBlocked(true);
      } else {
        setIsBlocked(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Set fullscreen by default on load
    document.documentElement.requestFullscreen()
      .then(() => setIsBlocked(false))
      .catch(() => setIsBlocked(true));

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleFullScreen = () => {
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen()
        .then(() => {
          setIsBlocked(false);
        })
        .catch(() => {
          setIsBlocked(true);
        });
    } else {
      setIsBlocked(true);
    }
  };

  const handleAnswer = (callback?: Function) => {
    // Save response
    setResponses({
      questionId: questions[currentQuestionIndex].id,
      response: selectedChoiceIndex
    })

    // Call the callback function if provided
    if (callback) {
      callback();
    }

    updateCurrentIndex()
    // Move to the next question
    setSelectedChoiceIndex(-1);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleSkip = () => {
    setResponses({
      questionId: questions[currentQuestionIndex].id,
      response: -1
    })
    updateCurrentIndex()
    setSelectedChoiceIndex(-1);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleSubmit = () => {
    handleAnswer(() => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      submitQuiz();
    });
  }


  return (
    <>
      {isBlocked && <BlockModal fullScreen={handleFullScreen} />}
      <Violation />
      <div className='h-screen flex items-center'>
        {questions?.length > 0 && (
          <Modal>
            <div>
              <div className="text-xl font-bold my-4">{currentQuestionIndex + 1} . {questions[currentQuestionIndex]?.question}</div>
              <div className="mb-4 flex flex-col gap-4">{renderChoices()}</div>
            </div>
            {currentQuestionIndex < questions.length - 1 ? (
              <div className="flex justify-between">
                <ButtonPrimary label='Answer' onClick={() => handleAnswer()} disabled={selectedChoiceIndex === -1} />
                <button className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500" onClick={handleSkip}>Skip</button>
              </div>) : (
              <button className="w-fit self-end px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmit}>Finish quiz</button>
            )}
          </Modal>
        )}
      </div>
    </>
  );
}

export default QuizPage;



const BlockModal: React.FC<{ fullScreen: () => void }> = ({ fullScreen }) => {
  return (
    <div className='h-screen w-full bg-red-500 flex justify-center items-center'>
      <ButtonPrimary onClick={fullScreen} label='Fullscreen' />
    </div>
  )
}

