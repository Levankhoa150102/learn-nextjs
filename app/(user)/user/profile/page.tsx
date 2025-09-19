import UserLayout from '@/components/Layout/UserLayout';
import Profile from '@/components/Profile';
import React from 'react';

function UserProfilePage() {
    return (
        <UserLayout>
            <Profile />
        </UserLayout>
    );
}

export default UserProfilePage;