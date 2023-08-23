import { S } from './styled';
import { useNavigate } from 'react-router-dom';

export function SignUpButton() {
  const navigate = useNavigate();

  return (
    <S.Button
      className="signup"
      onClick={() => {
        navigate('/signup');
      }}
    >
      회원가입
    </S.Button>
  );
}

export function SignInButton() {
  const navigate = useNavigate();

  return (
    <S.Button
      onClick={() => {
        navigate('/signin');
      }}
    >
      로그인 화면으로 가기
    </S.Button>
  );
}
