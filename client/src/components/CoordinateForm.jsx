import { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Link,
  CssBaseline,
  Button,
  Grid,
  Container,
  Box,
  Typography,
  TextField,
  Alert
  
} from "@mui/material";

import { useParams } from "react-router-dom";
import { saveCoordinates, getCoordinateById, updateCoordinateById } from "../api";

const defaultTheme = createTheme();

export default function CoordinateForm() {
  const params = useParams();
  const coordinateId = params?.id;
  const [isLoading, setIsLoading] = useState(true);
  const [coordinateData, setCoordinateData] = useState(false);
  const [successFlag, setSuccessFlag] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const postData = {
        coordinateId: data.get("coordinateId"),
        label: data.get("coordinateLabel"),
        xCoordinate: data.get("xCoordinate"),
        yCoordinate: data.get("yCoordinate"),
      };
      if( coordinateId == undefined){
        const res = await saveCoordinates(postData);
      }else{
        const res = await updateCoordinateById(coordinateId, postData);
      }
      setSuccessFlag(true);
      setTimeout(() => {
        window.location.href="/";
      }, 500);
    } catch (error) {
      console.error("Error saving coordinates:", error.response);
      setErrorData(error.response.data.data);
    }
  };

  useEffect(()=>{
    if( coordinateId != undefined){
      fetchData();
    }else{
      setIsLoading( false);
    }
  }, [errorData]);

  const fetchData = async () => {
    const resp = await getCoordinateById(coordinateId);
    setCoordinateData( resp?.data?.data);
    setIsLoading( false);
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
          }}
        >
          <Link href="/" color="inherit">
            {" "}
            View Coordinates
          </Link>
        </Box>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Location Coordinates Form 
          </Typography>
          
          {
              successFlag ?<Alert severity="success">Coordinate Saved successfully</Alert>: ''
          }
          { isLoading ? 'Loading':
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
            type="POST"
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="coordinateId"
                  label="Id"
                  name="coordinateId"
                  helperText={errorData?.coordinateId}
                  error={errorData?.coordinateId ? true:false}
                  defaultValue={coordinateData?.coordinateId}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  name="coordinateLabel"
                  label="Coordinate Label"
                  id="coordinateLabel"
                  helperText={errorData?.label}
                  error={errorData?.label ? true:false}
                  defaultValue={coordinateData?.label}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="xCoordinate"
                  required
                  fullWidth
                  id="xCoordinate"
                  label="X Coordinate"
                  helperText={errorData?.xCoordinate}
                  error={errorData?.xCoordinate ? true:false}
                  defaultValue={coordinateData?.xCoordinate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="yCoordinate"
                  fullWidth
                  id="yCoordinate"
                  label="Y Coordinate"
                  helperText={errorData?.yCoordinate}
                  error={errorData?.yCoordinate ? true:false}
                  defaultValue={coordinateData?.yCoordinate}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2, mb: 2 }}
                  onClick={() => (window.location.href = "/")}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
            <Box component="div" noValidate sx={{ mt: 3 }}>
              {errorMessage ? (
                <Typography component="h1" variant="h5">
                  {errorMessage}
                </Typography>
              ) : (
                ""
              )}
            </Box>
          </Box>
          }
        </Box>
      </Container>
    </ThemeProvider>
  );
}
