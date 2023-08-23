import { SignInButton } from '../components/Auth/Button';
import { SignUpForm } from '../components/Auth/SignUpForm';
import { S } from './style';

function SignUp(): JSX.Element {
  return (
    <S.Container>
      <h1>회원가입</h1>
      <SignUpForm />
      <SignInButton />
    </S.Container>
  );
}

export default SignUp;
