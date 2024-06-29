import { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const RecSenha = ({ open, onClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Recuperação de Senha
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <p className="p-2">
            Você solicitou a recuperação de senha para a sua conta. Por favor,
            siga as instruções abaixo:
          </p>
          <p className="p-2">
            1. Verifique sua caixa de entrada: Procure por um email com o
            assunto “Recuperação de Senha” vindo de nossa plataforma. Ele deve
            conter um link ou código para redefinir sua senha.
          </p>
          <p className="p-2">
            2. Verifique sua pasta de spam: Às vezes, os emails automáticos
            podem ser filtrados para a pasta de spam. Certifique-se de verificar
            lá também.
          </p>
          <p className="p-2">
            3. Clique no link ou siga as instruções: Ao encontrar o email,
            clique no link fornecido ou siga as instruções para criar uma nova
            senha.
          </p>
          Se você não recebeu o email ou precisa de mais assistência, entre em
          contato com nosso suporte.
        </Typography>
      </Box>
    </Modal>
  );
};

export default RecSenha;
