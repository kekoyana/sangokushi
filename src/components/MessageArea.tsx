import React from 'react'
import './MessageArea.css'

interface MessageAreaProps {
  message: string
  'data-testid'?: string
}

const MessageArea: React.FC<MessageAreaProps> = ({ 
  message,
  'data-testid': testId 
}) => {
  return (
    <div className="message-area" data-testid={testId}>
      <h3>メッセージ</h3>
      <div className="message-content">
        {message || 'ゲームを開始してください'}
      </div>
    </div>
  )
}

export default MessageArea