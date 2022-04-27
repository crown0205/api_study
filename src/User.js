import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const User = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setUsers(null);
      setError(null);
      setLoading(true);
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      setUsers(response.data);
      console.log(users);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에어가 발생했습니다</div>;
  if (!users) return null;

  return (
    <React.Fragment>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </React.Fragment>
  );
};

export default User;
