'use client'
import ButtonPrimary from '@/components/ButtonPrimary';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import React from 'react';

const Homepage: React.FC = () => {
  const router = useRouter()
  return (
    <div className='h-screen flex items-center'>
      <Modal>
        <h1 className='font-bold text-center'>Welcome to the Quiz</h1>
        <ol className='list-decimal ml-6'>
          <li>The quiz consists of 10 questions.</li>
          <li>You will be asked one question at a time.</li>
          <li>You must take the test in full-screen mode.</li>
          <li>If you switch to another tab during the test, it will be marked as a violation.</li>
          <li>At the end of the test, your marks will be displayed.</li>
          <li>If you refresh the page, the test will resume from where you left off.</li>
        </ol>
        <ButtonPrimary label='Start quiz' onClick={() => router.push('/quiz')} />
      </Modal>
    </div>
  );
};

export default Homepage;
