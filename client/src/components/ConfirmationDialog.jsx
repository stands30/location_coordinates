import { useEffect, forwardRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { deleteCoordinate } from '../api';
import ErrorDialog from "./ErrorDialog";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function confirmationDialog(props) {
  const [open, setOpen] = useState(false);
  let coordinateId = props.coordinateId;
  
  useEffect(()=>{
    setOpen(true);
    return ()=>{
        setOpen(false);
        setOpenUpdateModal( false);
        coordinateId = '';
    }
  },[]);
  const handleClose = () => {
    setOpen(false);
  };
  const [ errorMessage, setErrorMessage] = useState("");
  const handleDeleteTrigger = async ()=>{
    try {
      if( coordinateId == ''){
        handleClose(false);
        return;
      }
        const resp = await deleteCoordinate(coordinateId);
        handleClose(false);
        setErrorMessage(resp?.data?.message);
        setTimeout(() => {
            setErrorMessage("");
            window.location.href = "/";
        }, 1500);
        
    } catch (error) {
      console.error("Error deleting coordinates:", error);
      handleClose(false);
      setErrorMessage(error?.response?.data?.message);
      setTimeout(() => {
         setErrorMessage("");
      }, 500);
    }
  };
  const handleUpdateTrigger = ()=>{
    handleClose(false);
    window.location.href = `/form/${coordinateId}`;
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Would you like to update or delete this coordinate?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Choose "Update" to modify this coordinate or select "Delete" to remove it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteTrigger}>Delete</Button>
          <Button onClick={handleUpdateTrigger}>Update</Button>
        </DialogActions>
      </Dialog>
      { errorMessage ? <ErrorDialog message={errorMessage} />:'' }
    </>
  );
}
