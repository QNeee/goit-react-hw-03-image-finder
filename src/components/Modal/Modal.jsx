import { Overlay, ModalWindow, Img } from "./Modal.styled"
export const Modal = ({ options }) => {
    return <Overlay>
        <ModalWindow>
            <Img src={options} alt={options} />
        </ModalWindow>
    </Overlay >
}