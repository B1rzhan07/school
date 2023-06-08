import React, { useState } from 'react'
import { Button, Input, Typography } from 'antd'
import './SelfGrading.css' // Import custom styles

const { Title, Text } = Typography

const SelfGrading: React.FC = () => {
  const [userAnswer, setUserAnswer] = useState('')
  const [grade, setGrade] = useState('')

  const checkAnswer = () => {
    const userNumber = parseInt(userAnswer, 10)

    if (isNaN(userNumber) || userNumber < 0 || userNumber > 100) {
      setGrade('Invalid')
    } else if (userNumber < 50) {
      setGrade('Fail')
    } else if (userNumber >= 50 && userNumber < 70) {
      setGrade('Pass')
    } else {
      setGrade('Excellent')
    }
  }

  return (
    <div className="self-grading-container">
      <Title level={3}>Self-Grading Component</Title>
      <Text>Enter a number from 0 to 100:</Text>
      <Input
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="self-grading-input" // Apply custom input style
      />
      <Button
        type="primary"
        onClick={checkAnswer}
        className="self-grading-button"
      >
        Check
      </Button>
      {grade && (
        <div className="self-grading-grade">
          <Text strong>Grade: </Text>
          <Text className={`grade-text grade-${grade.toLowerCase()}`}>
            {grade}
          </Text>
        </div>
      )}
    </div>
  )
}

export default SelfGrading
