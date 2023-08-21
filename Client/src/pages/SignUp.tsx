import { useForm } from 'react-hook-form';
import { SignInButton } from '../components/Auth/Button';
import { SignUpForm } from '../components/Auth/SignUpForm';
import { Auth } from '../types/auth';
import { useSignUp } from '../services/auth';
import { S } from './style';

function SignUp(): JSX.Element {
  const signUpMutation = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Auth>({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const onSubmit = async (values: Auth) => {
    await signUpMutation.mutateAsync(values);
  };

  return (
    <S.Container>
      <h1>회원가입</h1>
      <SignUpForm
        onSubmit={handleSubmit(onSubmit)}
        watch={watch}
        register={register}
        errors={errors}
      />
      <SignInButton />
    </S.Container>
  );
}

export default SignUp;
