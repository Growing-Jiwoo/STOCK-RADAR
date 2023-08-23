import { S } from './styled';
import { InputField } from './Input';
import { useForm } from 'react-hook-form';
import { Auth } from '../../types/auth';
import { useSignIn } from '../../services/auth';

export function SignInForm() {
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
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="text"
        placeholder="아이디 (영소문자, 숫자 3~10자)"
        value={watch('username') ?? ''}
        error={errors.username?.message}
        register={register('username', {
          required: '아이디는 필수 입력 사항입니다.',
          pattern: {
            value: /^[a-z0-9]{3,10}$/i,
            message: '아이디는 영소문자와 숫자 3~10자리로 이루어져야 합니다.',
          },
        })}
      />

      <InputField
        type="password"
        placeholder="비밀번호 (3~10자)"
        value={watch('password') ?? ''}
        error={errors.password?.message}
        register={register('password', {
          required: '비밀번호는 필수 입력 사항입니다.',
          minLength: {
            value: 3,
            message: '비밀번호는 3자리 이상이어야 합니다.',
          },
          maxLength: {
            value: 10,
            message: '비밀번호는 10자리 이하여야 합니다.',
          },
        })}
      />

      <S.Button className="login" isValid={isValid} disabled={!isValid}>
        로그인
      </S.Button>
    </S.Form>
  );
}
