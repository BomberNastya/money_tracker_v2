import React from 'react';

const getUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'userName' }), 3000);
  });
};

const useGetUser = () => {
  const [user, setUser] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const cognitoUser = await getUser();
        setUser(cognitoUser);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [setUser]);
  return {
    user,
    setUser,
    isLoading,
    error,
  };
};

export default useGetUser;
