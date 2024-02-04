import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter, getElementAtEvent } from "react-chartjs-2";
import { getCoordinates } from "../api";
import {
  Link,
  CssBaseline,
  Grid,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ConfirmationDialog from "./ConfirmationDialog";
import ErrorDialog from "./ErrorDialog";
function CoordinateChart() {
  const [errorMessage, setErrorMessage] = useState("");
  const [coordinates, setCoordinates] = useState({ datasets: [] });
  const [showAlert, setShowAlert] = useState(false);
  const [coordinateId, setCoordinateId] = useState(false);
  const chartRef = useRef();
  useEffect(() => {
    initCoordinates();
    setCoordinateId(false);
  }, []);
  const initCoordinates = async () => {
    try {
      const response = await getCoordinates();
      let dataSet = new Map();
      response.data?.data?.forEach((key) => {
        if (dataSet.has(key.label)) {
          let currentData = dataSet.get(key.label);
          currentData.push({
            x: key.xCoordinate,
            y: key.yCoordinate,
            _id: key._id,
          });
          dataSet.set(key.label, currentData);
        } else {
          dataSet.set(key.label, [
            {
              x: key.xCoordinate,
              y: key.yCoordinate,
              _id: key._id,
            },
          ]);
        }
      });
      const coordinateData = [];
      const colorList = ["green", "orange", "red", "blue"];
      let colorIndex = 0;
      const colorLength = colorList.length;
      for (const el of dataSet) {
        coordinateData.push({
          label: el[0],
          data: el[1],
          backgroundColor: colorList[colorIndex],
        });
        colorIndex++;
        if (colorIndex == colorLength) colorIndex = 0;
      }
      setCoordinates({
        datasets: coordinateData,
      });
      ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
    } catch (error) {
      console.error(
        "Error fetching coordinates:",
        error?.response?.data?.message,
        error
      );
      setErrorMessage(error?.response?.data?.message);
    }
  };

  const handleClick = (e) => {
    const curEl = getElementAtEvent(chartRef.current, e);
    if (curEl.length) {
      const _id = curEl[0]?.element?.$context?.raw?._id;
      setCoordinateId(_id);
      setShowAlert(true);
    }
  };
  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  const defaultTheme = createTheme();
  return (
    <div className="chart-container">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Link href="/form" color="inherit">
              Add Coordinates
            </Link>
          </Box>
          <CssBaseline />
          {showAlert ? <ConfirmationDialog coordinateId={coordinateId} /> : ""}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {coordinates?.datasets?.length ? (
              <Grid container spacing={2}>
                <Scatter
                  ref={chartRef}
                  onClick={handleClick}
                  options={options}
                  data={coordinates}
                />
              </Grid>
            ) : (
              <ErrorDialog message={errorMessage} />
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default CoordinateChart;
