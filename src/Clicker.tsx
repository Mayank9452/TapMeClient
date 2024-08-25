// src/Clicker.tsx
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import styles from "./ClickerGame.module.css"

// Define GraphQL query to fetch user data
const GET_USER_COINS = gql`
  query GetUserCoins($id: ID!) {
    user(id: $id) {
      id
      coins
    }
  }
`;

// Define GraphQL mutation to update user coins
const ADD_COINS = gql`
  mutation AddCoins($userId: ID!, $amount: Int!) {
    addCoins(userId: $userId, amount: $amount) {
      id
      coins
    }
  }
`;

// Function to get query parameters
const useQueryParam = (param: string) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  return query.get(param);
};

const Clicker: React.FC = () => {
  const userId = useQueryParam('userId'); // Read userId from query parameters

  // Query to fetch user data
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_USER_COINS, {
    variables: { id: userId },
    skip: !userId // Skip the query if userId is not available
  });

  // Mutation to add coins
  const [addCoins, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(ADD_COINS);

  // Handle button click to add coins
  const handleTap = () => {
    if (userId) {
      addCoins({ variables: { userId, amount: 50 } }); // Add 50 coins
    }
  };

  // Show loading and error states
  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error fetching data: {queryError.message}</p>;

  if (mutationLoading) return <p>Updating coins...</p>;
  if (mutationError) return <p>Error updating coins: {mutationError.message}</p>;

  return (
    <div className={styles.centerAlign}>
      <h1 className={styles.heading}>Welcome to TapMe Game</h1>
      <h3 className={styles.balance}>Coins Earned: {data?.user.coins}</h3>
      
      {/* {mutationData && <h2>Toal Balance: {mutationData.addCoins.coins}</h2>} */}

      <button onClick={handleTap} className={styles.buttonLayout}>Tap to Earn Coins</button>
    </div>
  );
};

export default Clicker;
