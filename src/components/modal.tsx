
//Import da folha de Estilos
import { useState } from 'react'
import styles from '../styles/components/Modal.module.css'

export default function Modal() {
    const [overlay, setOverlay] = useState(styles.overlay)

    function closeModal() {
        setOverlay(styles.overlayHide)
    }

    return (
        <div className={overlay}>
            <div className={styles.container}>

                <strong>Erro!</strong>
                <p>Tente novamente por favor</p>

                <button type='button'>
                    <img src="/icons/close.svg" alt="Fechar modal" onClick={closeModal}/>
                </button>
            </div>
        </div>
    )
} 