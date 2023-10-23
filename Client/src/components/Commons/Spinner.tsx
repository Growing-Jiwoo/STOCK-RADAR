import spinnerImg from '../../assets/icons/spinner.gif';
import { S } from './styled';

function Spinner() {
  return (
    <S.SpinnerWrapper>
      <img src={spinnerImg} alt="Loading..." />
    </S.SpinnerWrapper>
  );
}

export default Spinner;
