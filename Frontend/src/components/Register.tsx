'use client'
import { useState } from "react"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog"

const Register = () => {
  const [isOPen, setisOPen] = useState<boolean>(false)
  return (
    <AlertDialog open={isOPen}>
      <AlertDialogTrigger className="cursor-pointer">Register</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <h1>Register</h1>
            <p onClick={ () => setisOPen(false)}>x</p>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Register