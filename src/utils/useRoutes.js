import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { RecoverPasswordPage } from '../pages/RecoverPasswordPage';
import MainPage from '../pages/MainPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { VerifyEmailPage } from '../pages/VerifyEmailPage';
import { LoginPage } from '../pages/LoginPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import EventView from '../components/EventView';


export const useRoutes = (isAuthenticated) => {

    if (isAuthenticated) {
        return (
            <>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/events/:id" element={<EventView />} />
                    <Route path='verify/:token' element={<VerifyEmailPage />} />
                </Routes>
            </>
        )
    } else {
        return (
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/auth/resetPassword" element={<RecoverPasswordPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path='recover/:token' element={<ResetPasswordPage />} />
                <Route path='verify/:token' element={<VerifyEmailPage />} />
            </Routes>
        )
    }
}