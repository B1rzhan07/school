import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login/Login'
import HorizontalLinearStepper from '../components/Stepper'
import Commission from '../components/comission/Comission'

const RoutesComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stepper" element={<HorizontalLinearStepper />} />
        <Route path="/commission" element={<Commission />} />
      </Routes>
    </div>
  )
}

export default RoutesComponent
