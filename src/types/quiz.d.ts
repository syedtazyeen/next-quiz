import Question from "./question.d";
import Response from "./response.d";

interface Quiz {
    questions: Question[]
    sequence: String[]
    responses: Response[]
    violations: Number
}

export default Quiz