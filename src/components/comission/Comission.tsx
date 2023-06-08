import React, { useState } from 'react'
import { Table, Modal, Button, List, InputNumber } from 'antd'
import { UserOutlined } from '@ant-design/icons'

interface Assignment {
  name: string
  grade: number | null
}

interface Participant {
  id: number
  name: string
  email: string
  assignments: {
    step: number
    files: Assignment[]
  }[]
}

const participantsData: Participant[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    assignments: [
      {
        step: 1,
        files: [
          { name: 'file1.pdf', grade: null },
          { name: 'file2.pdf', grade: null },
        ],
      },
      {
        step: 2,
        files: [{ name: 'file3.pdf', grade: null }],
      },
      // Add more assignments for the participant
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    assignments: [
      {
        step: 1,
        files: [
          { name: 'file4.pdf', grade: null },
          { name: 'file5.pdf', grade: null },
        ],
      },
      // Add more assignments for the participant
    ],
  },
  // Add more participants as needed
]

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text: string) => <span>{text}</span>,
  },
]

const ParticipantList: React.FC = () => {
  const [
    selectedParticipant,
    setSelectedParticipant,
  ] = useState<Participant | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleRowClick = (participant: Participant) => {
    setSelectedParticipant(participant)
    setModalVisible(true)
  }

  const closeModal = () => {
    setSelectedParticipant(null)
    setModalVisible(false)
  }

  const handleGradeChange = (
    assignmentIndex: number,
    fileIndex: number,
    grade: number | null,
  ) => {
    if (selectedParticipant) {
      const updatedParticipantsData = [...participantsData]
      const selectedAssignment =
        selectedParticipant.assignments[assignmentIndex]
      selectedAssignment.files[fileIndex].grade = grade
      setParticipantsData(updatedParticipantsData)
    }
  }

  const getAssignmentList = () => {
    if (!selectedParticipant) {
      return null
    }

    const { assignments } = selectedParticipant
    return (
      <List
        itemLayout="horizontal"
        dataSource={assignments}
        renderItem={(assignment, assignmentIndex) => (
          <List.Item>
            <List.Item.Meta
              title={`Step ${assignment.step}`}
              description={
                <div>
                  {assignment.files.map((file, fileIndex) => (
                    <div key={file.name}>
                      <span>{file.name}</span> - Grade:{' '}
                      <InputNumber
                        min={0}
                        max={100}
                        value={file.grade}
                        onChange={(grade) =>
                          handleGradeChange(assignmentIndex, fileIndex, grade)
                        }
                      />
                    </div>
                  ))}
                </div>
              }
            />
          </List.Item>
        )}
      />
    )
  }

  return (
    <>
      <Table
        dataSource={participantsData}
        columns={columns}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <Modal
        title={`Assignments for ${
          selectedParticipant ? selectedParticipant.name : ''
        }`}
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        {getAssignmentList()}
      </Modal>
    </>
  )
}

export default ParticipantList
