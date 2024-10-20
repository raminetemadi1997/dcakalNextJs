import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import UnPower from '../../public/images/page/unpower.png';
import styles from '@/assets/css/NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.body}>
        <div className={styles.parentPage}>
          <Image src={UnPower} alt='404-image' />
          
          <div className={styles.errorReturn}>
            <h1>Not Found</h1>
            <h1>404</h1>
          </div>
        </div>
      </div>
    );
};

export default NotFound;