import './App.css';
import React, { useState, useEffect } from 'react'

function App() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  useEffect(() => {
    validateForm()
  }, [formData])

  const validateForm = () => {

    const newErrors = {}

    if (formData.firstName.length < 1) {
      newErrors.firstName = 'First Name Required'
    }

    if (formData.lastName.length < 1) {
      newErrors.lastName = 'Last Name Required'
    }

    if (!emailRegex.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Invalid email address'
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validateForm()
    if (isValid) {
      alert(`Welcome, ${formData.firstName} ${formData.lastName}!`)
    }
  }

  const renderErrors = () => {
    return (
      <div className="form-errors">
        {Object.values(errors).map((error, index) => (
          <p key={index} className="error">{error}</p>
        ))}
      </div>
    )
  }

  return (
    <div className="App">
      <div className="form-container">
        <header className="App-header">
          <div className="form-inputs">
            <form onSubmit={handleSubmit}>
              <div className="field-container">
                <p>First Name</p>
                <input id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  name="firstName"
                />
                <p>Last Name</p>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  name="lastName"
                />
                <p>Email Address</p>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                  name="emailAddress"
                />
                <p>Password</p>
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  name="password"
                />
                <p>Confirm Password</p>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  name="confirmPassword"
                />
                <div className="button-container">
                  <button className="register" type="submit">Register</button>
                </div>
                {renderErrors()}
              </div>
            </form>
          </div>
        </header >
      </div >
    </div >
  );
}

export default App;
