import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button type='button' onClick={() => navigate(-1)}>
        Page Not found
      </button>
    </div>
  );
};
