
import Image from "next/image";
import styles from '../assets/css/ServerNotFound.module.css';
import server from '../../public/images/page/server.png';
import HomeIcon from '@mui/icons-material/Home';
export default function ServerNotFound() {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.parentPage}>
                    <Image src={server} alt='server-icon' />
                    <div className={styles.formReturn}>
                        <p>خطای سرور</p>
                        <span>
                            <HomeIcon sx={{ position: 'absolute', top: '20px' }} />
                            
                        
                        </span>
                    </div>
                    <div className={styles.errorReturn}>
                        <h1>Internal Server Error</h1>
                        <h1>500</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
