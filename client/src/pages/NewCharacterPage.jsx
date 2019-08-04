import React, { useState } from "react"

import { Container } from "semantic-ui-react"
import * as glamor from "glamor"
import glamorous from "glamorous"
import { fadeIn } from "react-animations"

const FadeInDiv = glamorous.div({
  animation: `1s ${glamor.css.keyframes(fadeIn)}`,
})

const NewCharacterPage = () => {
  const [currentStep, _setCurrentStep] = useState(1)

  const setCurrentStep = (step) => {
    const validStep = step > 5 ? 1 : step
    _setCurrentStep(validStep)
  }

  return (
    <Container>
      <h1>New Character Page</h1>
      <ul className="nav nav-pills nav-fill text-center">
        <li className="nav-item">
          <a
            role="button"
            tabIndex={-1}
            onClick={() => setCurrentStep(1)}
            className={`nav-link ${currentStep === 1 && "active"}`}
          >
            <h4>Step 1</h4>
            <p>Choose Race</p>
          </a>
        </li>

        <li className="nav-item">
          <a
            role="button"
            tabIndex={-2}
            onClick={() => setCurrentStep(2)}
            className={`nav-link ${currentStep === 2 && "active"}`}
          >
            <h4>Step 2</h4>
            <p>Class</p>
          </a>
        </li>

        <li className="nav-item">
          <a
            role="button"
            tabIndex={-3}
            onClick={() => setCurrentStep(3)}
            className={`nav-link ${currentStep === 3 && "active"}`}
          >
            <h4>Step 3</h4>
            <p>Background</p>
          </a>
        </li>

        <li className="nav-item">
          <a
            role="button"
            tabIndex={-4}
            onClick={() => setCurrentStep(4)}
            className={`nav-link ${currentStep === 4 && "active"}`}
          >
            <h4>Step 4</h4>
            <p>Faction</p>
          </a>
        </li>

        <li className="nav-item">
          <a
            role="button"
            tabIndex={-5}
            onClick={() => setCurrentStep(5)}
            className={`nav-link ${currentStep === 5 && "active"}`}
          >
            <h4>Step 5</h4>
            <p>Name</p>
          </a>
        </li>
      </ul>

      <div>
        {currentStep === 1 && (
          <FadeInDiv>
            <h2>Step 1</h2>
          </FadeInDiv>
        )}

        {currentStep === 2 && (
          <FadeInDiv>
            <h2>Step 2</h2>
          </FadeInDiv>
        )}

        {currentStep === 3 && (
          <FadeInDiv>
            <h2>Step 3</h2>
          </FadeInDiv>
        )}

        {currentStep === 4 && (
          <FadeInDiv>
            <h2>Step 4</h2>
          </FadeInDiv>
        )}

        {currentStep === 5 && (
          <FadeInDiv>
            <h2>Step 5</h2>
          </FadeInDiv>
        )}
      </div>
    </Container>
  )
}

export default NewCharacterPage
