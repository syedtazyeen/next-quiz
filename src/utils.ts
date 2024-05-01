import Question from "./types/question.d";
import Quiz from "./types/quiz.d";
import Response from "./types/response.d";
import Result from "./types/result.d";

export function generateQuiz(questions: Question[]) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    const shuffledIds = questions.map(question => question.id);
    const quiz: Quiz = {
        questions: questions,
        sequence: shuffledIds,
        responses: [],
        violations: 0
    }
    return quiz;
}



export function calculateResult(questions: Question[], responses: Response[], violations: number): Promise<Result> {
    return new Promise((resolve, reject) => {
        const totalAttempted = responses.filter(response => response.response !== -1).length;
        console.log(responses);
        const totalCorrect = responses.reduce((acc, response) => {
            const question = questions.find(q => q.id === response.questionId);
            if (question && response.response === question.answer) {
                console.log('correct');
                return acc + 1;
            }
            return acc;
        }, 0);

        resolve({
            attempted: totalAttempted,
            correct: totalCorrect,
            questions: questions.length,
            violations: violations,
            timeStamp: Date.now()
        });
    });
}










// export function calculateResult(questions: Question[], responses: Response[]): Result {
//     const totalAttempted = responses.filter(response => response.response !== -1).length;

//     const totalCorrect = responses.reduce((acc, response) => {
//         const question = questions.find(q => q.id === response.questionId);
//         if (question && response.response === question.answer) {
//             return acc + 1;
//         }
//         return acc;
//     }, 0);

//     console.log(totalCorrect);


//     return {
//         attempted: totalAttempted,
//         correct: totalCorrect,
//         questions: questions.length,
//         timeStamp: Date.now()
//     };
// }





// export function calculateResult(questions: Question[], responses: Response[]): Result {
//     let totalAttempted = 0;
//     let totalCorrect = 0;
//     for (const question of questions) {
//         const response = responses.find(response => response.questionId === question.id);
//         if (response && response.response != -1) {
//             totalAttempted++;
//             if (response.response == question.answer) {
//                 console.log(response);
//                 totalCorrect++;
//             }
//         }
//     }
//     return {
//         attempted: totalAttempted,
//         correct: totalCorrect,
//         questions: responses.length,
//         timeStamp: Date.now()
//     };
// }


export function formatMilliseconds(milliseconds: number) {
    const date = new Date(milliseconds);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[monthIndex];

    if (!milliseconds) return

    return `${hours}:${minutes}, ${day} ${month}, ${year}`;
}