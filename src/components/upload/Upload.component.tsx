import React from 'react'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, message, Upload } from 'antd'
import { API_URL } from '../../app/store'

const props: UploadProps = {
  name: 'file',
  action: API_URL + '/participant/1/uploadFiles',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  multiple: true,
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
}

const UploadComponent: React.FC = () => (
  <div style={{ width: 500 }}>
    <Upload {...props}>
      <Button icon={<UploadOutlined />} size="large">
        Click to Upload
      </Button>
    </Upload>
  </div>
)

export default UploadComponent
