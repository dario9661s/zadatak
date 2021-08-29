
import axios from "axios"
import {useField, ErrorMessage} from "formik"
import React, { useState } from "react"


function Input({...props}:any) {
    const [field, meta] = useField(props)

    

  return (
   <div className={`field ${meta.touched && meta.error? "error" : null}`}>
       <input  autoComplete="off" {...field} {...props} />
       <ErrorMessage component="div" className="errorMsg" name =  {field.name} />
   </div>
  )
}

export default Input
