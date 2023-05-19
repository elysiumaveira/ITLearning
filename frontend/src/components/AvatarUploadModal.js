import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

import s from '../css/AvatarUploadModal.module.css';

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

export default function AvatarUploadModal({ handleFileChange }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const hiddenFileInput = useRef(null);

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    }

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#FFAE4D",
        },
        width: "180px",
        height: "50px",
        padding: "2px",
    }));

    return (
        <div>
            <ColorButton onClick={ handleOpen }>Изменить фото</ColorButton>
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Загрузите изображение
                    </Typography>
                    <div className={ s.modalButton }>
                        <ColorButton onClick={ handleClick }>Загрузить</ColorButton>
                    </div>
                    <input
                        type='file'
                        ref={ hiddenFileInput }
                        style={{display: "none"}}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={ handleFileChange }
                    />
                </Box>
            </Modal>
        </div>
    );
}