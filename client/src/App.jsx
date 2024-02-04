import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import CoordinateChart from "./components/CoordinateChart";
import CoordinateForm from "./components/CoordinateForm";

function App() {
   return (
    <>
      <div className="chart-body">
        <Suspense fallback={<h2>......loading</h2>}>
          <Routes>
            <Route path="/" element={<CoordinateChart />}></Route>
            <Route path="/form/:id?" element={<CoordinateForm />}></Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
