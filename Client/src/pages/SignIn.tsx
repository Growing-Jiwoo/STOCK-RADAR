import { SignUpButton } from '../components/Auth/Button';
import { SignInForm } from '../components/Auth/SignInForm';
import { S } from './style';
import { ReactComponent as TitleLogo } from '../assets/icons/titleLogo_small.svg';

function SignIn(): JSX.Element {
  return (
    <S.Container>
      <TitleLogo />
      <SignInForm />
      <SignUpButton />
    </S.Container>
  );
}

export default SignIn;
