import { Button, Checkbox, Form, Input, Modal, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useLoginMutation } from '../../services/pokemon'
import { useNavigate } from 'react-router-dom'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(
    false,
  )
  console.log('email', email)
  console.log('password', password)

  const [login, { isError, isSuccess, data }] = useLoginMutation()

  const showResetPasswordModal = () => {
    setResetPasswordModalVisible(true)
  }
  const handleResetPassword = () => {
    setResetPasswordModalVisible(false)
  }

  const onFinish = () => {
    login({
      email: 'participant',
      password: 'admin',
    })
  }

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    notification[type]({
      message,
      description,
    })
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      openNotificationWithIcon(
        'success',
        'Успешно',
        'Вы успешно авторизовались!',
      )
      localStorage.setItem('log', JSON.stringify(data))
      navigate('/stepper')
    }

    if (isError) {
      openNotificationWithIcon('error', 'Ошибка', 'Неверный логин или пароль!')
    }
  }, [isSuccess, isError, data, navigate])

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
