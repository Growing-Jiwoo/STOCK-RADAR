import { SignUpButton } from '../components/Auth/Button';
import { SignInForm } from '../components/Auth/SignInForm';
import { S } from './style';

function SignIn(): JSX.Element {
  return (
    <S.Container>
      <S.TitleLogoImg />
      <SignInForm />
      <SignUpButton />
    </S.Container>
  );
}

export default SignIn;
