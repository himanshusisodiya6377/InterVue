import { SignInButton } from '@clerk/clerk-react'
import './App.css'

//we have user in clerk but not in database as both are different dont know about each other thats why we use ingest that
//runs a function and send user to mongodb and videostream
function App() {

  return (
    <>
     <h1>welcome to the app</h1>
     <SignInButton mode="modal"/>
    </>
  )
}

export default App
