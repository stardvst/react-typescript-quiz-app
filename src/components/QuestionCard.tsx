import React from 'react';
import { Answer } from "../App";
import { ButtonWrapper, Wrapper } from './QuestionCard.styles';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answer | undefined;
  questionNum: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNum} / {totalQuestions}
      </p>

      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer) => (
          <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer}>
            <button disabled={!!userAnswer} value={answer} type="button" onClick={callback} title="answer">
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  )
}

export default QuestionCard;
