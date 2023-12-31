import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from "../styles/Card.module.css";


interface Props {
    title: string;
    url?: string;
    img?: string;
    clickFunction?: () => void;
}

export const DefaultCard = ({title, url, img, clickFunction}: Props) => {

    return (
        <Card className={`${styles.defaultCard}`} as={url ? Link : undefined} to={url ? `/${url}` : "#"} onClick={clickFunction}>
            <Card.Body className={`${styles.defaultCardBody}`}>
                <Card.Img variant="top" src={img ? process.env.REACT_APP_IMG_ENPOINT + img : ""} alt="Movies" />
                <Card.Title className={`${styles.card_title}`}>{title}</Card.Title>
            </Card.Body>
        </Card>
    )
}
