import Modal, { Styles } from 'react-modal';
import { AgreeButton } from '../Commons/styled';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/board/atoms';
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

function Popup() {
  console.log('popup 렌더링');
  const [modal, setModal] = useRecoilState(modalState);
  const closeModal = () => {
    setModal({ isOpen: false });
  };

  const deleteCommentMutation = useDeleteComment();

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
    closeModal();
  };

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        contentLabel="Popup Modal"
        style={customStyles}
        shouldCloseOnOverlayClick={true} // 모달 외부 클릭 시 닫힘
      >
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
              handleDeleteComment(3);
              // to do list
              // 이후에 인자값을 commentId로 변경
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
