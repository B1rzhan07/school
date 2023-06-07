import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { useLoginMutation } from '../../services/pokemon'
import { LoginRequest } from './typesLogin'

export type LoginError = {
  outOfDate: boolean
  values: LoginRequest
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(
    false,
  )

  console.log(email, password)

  const showResetPasswordModal = () => {
    setResetPasswordModalVisible(true)
  }

  const handleResetPassword = () => {
    setResetPasswordModalVisible(false)
  }
  console.log(email, password)
  const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation()
  console.log(isLoading, isError, isSuccess, data)

  const onFinish = () => {
    login({
      email: 'admin',
      password: 'admin',
    })
  }

  const onFinishFailed = (errorInfo: LoginError) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <div style={{ width: '30%', minWidth: 500 }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            backgroundColor: 'white',
            padding: 40,
            borderRadius: 15,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Логин</h2>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Введите email!' },
              { type: 'email', message: 'Введите корректный email!' },
            ]}
          >
            <Input
              size="large"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password
              size="large"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Войти
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="link" onClick={showResetPasswordModal}>
              Забыли пароль?
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="Сброс пароля"
          visible={resetPasswordModalVisible}
          onOk={handleResetPassword}
          onCancel={() => setResetPasswordModalVisible(false)}
        >
          <p>Введите ваш email для сброса пароля:</p>
          <Input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <p>Либо</p>
          <Input
            placeholder="Пароль"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Login
