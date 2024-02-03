/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'

// Render the App on the root div
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<App/>)
