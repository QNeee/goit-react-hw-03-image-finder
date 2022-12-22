import { ButtonLoadMore } from "./Button.styled"
export const Button = ({ onClickLoadMore, onKeyDown }) => {
    return <ButtonLoadMore type="button" onClick={(e) => onClickLoadMore(e)}>Load More </ButtonLoadMore>
}