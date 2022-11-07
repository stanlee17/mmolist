import React from "react";

import styled from "styled-components";

import useAuth from "../../hooks/useAuth";

import AuthCard from "../../components/common/AuthCard";
import MMOButton from "../../components/common/MMOButton";

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <AuthCard title="Profile">
        <div className="text-center mb-4">Cannot Retrieve User</div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Profile">
      <div className="text-center mb-4">
        <h4>Welcome {user.username}</h4>
        <p>Email: {user.email}</p>
      </div>
      {user.isAdmin && (
        <p className="text-center">
          <strong>Secret:</strong> Hi Admin - nice to see you here!
        </p>
      )}
      <div className="mt-5">
        <MMOButton
          onClick={() => {
            logout();
          }}
        >
          Logout
        </MMOButton>
      </div>
    </AuthCard>
  );
};

export default Dashboard;
