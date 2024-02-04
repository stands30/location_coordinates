import {
  Box,
  Typography,
} from "@mui/material";

const ErrorDialog = (props) => {
    return (
        <Box component="div">
        <Typography component="h1" variant="h5">
          {props.message ? props.message : ""}
        </Typography>
      </Box>
    );
}

export default ErrorDialog;