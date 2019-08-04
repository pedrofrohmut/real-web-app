import React, { useState } from "react"
import { Container } from "semantic-ui-react"

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
          <a type="a" className={`nav-link ${currentStep === 1 && "active"}`}>
            <h4>Step 1</h4>
            <p>Choose Race</p>
          </a>
        </li>

        <li className="nav-item">
          <a type="a" className={`nav-link ${currentStep === 2 && "active"}`}>
            <h4>Step 2</h4>
            <p>Class</p>
          </a>
        </li>

        <li className="nav-item">
          <a type="a" className={`nav-link ${currentStep === 3 && "active"}`}>
            <h4>Step 3</h4>
            <p>Background</p>
          </a>
        </li>

        <li className="nav-item">
          <a type="a" className={`nav-link ${currentStep === 4 && "active"}`}>
            <h4>Step 4</h4>
            <p>Faction</p>
          </a>
        </li>

        <li className="nav-item">
          <a type="a" className={`nav-link ${currentStep === 5 && "active"}`}>
            <h4>Step 5</h4>
            <p>Name</p>
          </a>
        </li>
      </ul>
    </Container>
  )
}
export default NewCharacterPage
