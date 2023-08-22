import { useForm } from 'react-hook-form';
import { Auth } from '../types/auth';
import { useSignIn } from '../services/auth';
import { SignUpButton } from '../components/Auth/Button';
import { SignInForm } from '../components/Auth/SignInForm';
import { S } from './style';
import { ReactComponent as TitleLogo } from '../assets/icons/titleLogo_small.svg';

function SignIn(): JSX.Element {
  const signInMutation = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Auth>({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const onSubmit = async (values: Auth) => {
    await signInMutation.mutateAsync(values);
  };

  return (
    <S.Container>
      <TitleLogo />
      <SignInForm
        onSubmit={handleSubmit(onSubmit)}
        watch={watch}
        errors={errors}
        register={register}
        isValid={isValid}
      />
      <SignUpButton />
    </S.Container>
  );
}

export default SignIn;
