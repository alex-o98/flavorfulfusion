import React from 'react'
import EmailContent from './components/EmailContent'
import EmailSender from './components/EmailSender'

function Contact() {
  return (
<>
    <div className='h-[100vh] bg-background'>
      <EmailContent/>
      <EmailSender/>
    </div>
    </>
  )
}

export default Contact