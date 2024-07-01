import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

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
          Verifique sua caixa de entrada para um email com o assunto
          “Recuperação de Senha”. Ele deve conter um link ou código para
          redefinir sua senha. Verifique sua pasta de spam, pois às vezes os
          emails automáticos vão para lá. Clique no link ou siga as instruções
          no email para criar uma nova senha. Se precisar de mais ajuda, entre
          em contato com nosso suporte.
        </Typography>
      </Box>
    </Modal>
  );
};

export default RecSenha;
