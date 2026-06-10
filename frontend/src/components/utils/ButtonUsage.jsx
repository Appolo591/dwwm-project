import Button from '@mui/material/Button';
import styles from "./ButtonUsage.module.css"

export default function ButtonUsage({title}) {
  return <Button variant="contained" color="primary" className={styles.myCustomButton}>
            {title}
        </Button >;
}
