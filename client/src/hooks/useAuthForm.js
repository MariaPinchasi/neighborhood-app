import React from 'react'
import { useState } from "react";
import { useGlobalUserContext } from "../hooks/useGlobalUserContext";
import { useNavigate } from 'react-router'

const useAuthForm = (type) => {
  const navigate = useNavigate();
  const { login, register } = useGlobalUserContext();

  const [userFormData, setUserFormData] = useState({
    location: "",
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    location: null,
    name: null,
    email: null,
    password: null
  })
  const formDataReg = [
    {
      id: '1',
      label: 'User Name',
      type: 'text',
      name: 'name',
      value: userFormData.name,
      error: errors.name,
    },
    {
      id: '2',
      label: 'Email',
      type: 'email',
      name: 'email',
      value: userFormData.email,
      error: errors.email,
    },
    {
      id: '3',
      label: 'Password',
      type: 'password',
      name: 'password',
      value: userFormData.password,
      error: errors.password,
    },
  ]
  const formDataLog = formDataReg.slice(1);
  const handleChange = (e) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
    setErrors(prevState => (
      {
        ...prevState,
        [e.target.name]: null
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = true;
    const newErrors = {};
    if (type !== "login" && userFormData.location === "Select Your Neighborhood") {
      newErrors.location = "Please select location";
      isValid = false;
    }
    if (type !== "login" && userFormData.name.length < 3) {
      newErrors.name = "name must bo at least 3 characters long";
      isValid = false;
    }
    if (!emailRegex.test(userFormData.email)) {
      newErrors.email = "Email not valid";
      isValid = false;
    }
    if (userFormData.password.length < 6) {
      newErrors.password = "password must bo at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      if (type === 'login') {
        login(userFormData.email, userFormData.password, navigate);
      }
      else {
        register(userFormData, navigate);
      }

    }
  };

  return { handleChange, handleSubmit, formDataLog, formDataReg, errors }
}

export default useAuthForm