import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RecoverPasswordPage } from '../pages/RecoverPasswordPage';
import MainPage from '../pages/MainPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { VerifyEmailPage } from '../pages/VerifyEmailPage';
import { LoginPage } from '../pages/LoginPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import EventView from '../components/EventView';
import { Profile } from '../pages/Profile';
import CheckOutSuccess from '../pages/CheckOutSuccess';
import { EditUserPage } from '../pages/EditUserPage';
import CalendarPage from '../pages/CalendarPage';
import Header from '../components/Header';
import { VerifyCompanyEmailPage } from '../pages/VerifyCompanyEmailPage';

export const useRoutes = (isAuthenticated) => {

    if (isAuthenticated) {
        return (
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/checkout-success/:cartItems" element={<CheckOutSuccess />} />
                    <Route path="/events/:id" element={<EventView />} />
                    <Route path="/calendar" element={<CalendarPage />} />

                    <Route path='verify/:token' element={<VerifyEmailPage />} />

                    <Route path="verify_company/:token" element={<VerifyCompanyEmailPage />} />

                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/edit' element={<EditUserPage />} />

                    <Route path="*" element={<Navigate to="/" />} />
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

                <Route path="verify_company/:token" element={<VerifyCompanyEmailPage />} />
            </Routes>
        )
    }
}