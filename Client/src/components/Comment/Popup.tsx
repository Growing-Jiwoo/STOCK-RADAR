import Modal, { Styles } from 'react-modal';
import { AgreeButton } from '../Commons/styled';
import { useRecoilValue } from 'recoil';
import { commentIdState } from '../../recoil/board/atoms';
import {
  Title,
  CloseBtn,
  SubMentContainer,
  BtnContainer,
  ClosePopupButton,
} from './styled';
import { useDeleteComment } from '../../services/board';

Modal.setAppElement('#root');

const customStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(43, 43, 43, 0.6)',
    zIndex: 1001,
  },
  content: {
    width: '450px',
    height: '250px',
    padding: '0px 0px',
    borderRadius: '4px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
  },
};

function Popup({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  console.log('popup 렌더링');
  const commentId = useRecoilValue(commentIdState);

  const deleteCommentMutation = useDeleteComment();

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(commentId);
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} contentLabel="Popup Modal" style={customStyles}>
        <Title>
          삭제하기
          <CloseBtn onClick={closeModal} />
        </Title>

        <SubMentContainer>
          삭제 시 데이터 복구가 불가능하며 <br /> 모든 데이터가 삭제됩니다.
        </SubMentContainer>

        <BtnContainer>
          <ClosePopupButton width="80px" height="38px" onClick={closeModal}>
            취소
          </ClosePopupButton>
          <AgreeButton
            width="80px"
            height="38px"
            onClick={() => {
              handleDeleteComment();
            }}
          >
            확인
          </AgreeButton>
        </BtnContainer>
      </Modal>
    </>
  );
}

export default Popup;
