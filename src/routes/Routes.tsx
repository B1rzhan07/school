import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login/Login'
import HorizontalLinearStepper from '../components/Stepper'

const RoutesComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stepper" element={<HorizontalLinearStepper />} />
      </Routes>
    </div>
  )
}

export default RoutesComponent
