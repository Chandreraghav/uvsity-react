import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const FullSizeModal = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.modal}
    >
      <div className={classes.paper}>
        {/* Content of the modal */}
        This is a full-size modal content.
      </div>
    </Modal>
  );
};
