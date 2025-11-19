import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
  const navigate = useNavigate()
  return (
    <div className={styles.card}>
      <h1 className={styles.title} onClick={() => navigate(props.menu_path)}>{props.menu_label}</h1>
    </div>
  )
}

export default Card