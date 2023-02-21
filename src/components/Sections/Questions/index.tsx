import React, { useState } from "react";
import Styles from "./Questions.module.scss";

interface QuestionsProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

function Questions({ questions }: QuestionsProps) {
  const [query, setQuery] = useState("");

  const filteredQuestions = questions.filter(({ question, answer }) => {
    if (query === "") {
      return true;
    }
    const passes =
      question.toLowerCase().includes(query.toLowerCase()) ||
      answer.toLowerCase().includes(query.toLowerCase());
    return passes;
  });

  return (
    <div>
      <div className={Styles.search}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={Styles.questions}>
        {filteredQuestions.map(({ question, answer }) => (
          <div className={Styles.question}>
            <h3>{question}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: answer,
              }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;
