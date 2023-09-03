import React, { useEffect, Suspense } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Dashboard from "./containers/Dashboard";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { get } from "./Utils/apiFunctions";
import PageLoder from "./components/PageLoder";

const Login = React.lazy(() => import('./containers/auth/Login'));//"./containers/auth/Login";
const Register = React.lazy(() => import('./containers/auth/Register'))//"./containers/auth/Register";
const ReportComp = React.lazy(() => import('./containers/reports/Reports'))//"./containers/reports/Reports";
const CustomerDetails = React.lazy(() => import('./containers/customerDetails/CustomerDetails'))//"./containers/customerDetails/CustomerDetails";
const CustomerinformationCom = React.lazy(() => import('./containers/customerDetails/customerinformation/Customerinformation'))//"./containers/customerDetails/customerinformation/Customerinformation";
const CaptureImageComp = React.lazy(() => import('./containers/customerDetails/captureimage/CaptureImage'))//"./containers/customerDetails/captureimage/CaptureImage";
const PreviewInformationComp = React.lazy(() => import('./containers/customerDetails/previewinformation/PreviewInformation'))//from "./containers/customerDetails/previewinformation/PreviewInformation";
const Unauthorized = React.lazy(() => import('./containers/Unauthorized'))//"./containers/Unauthorized";
const EditCustomerInformationCom = React.lazy(() => import('./containers/customerDetails/customerinformation/EditCustomerInformation'))//"./containers/customerDetails/customerinformation/EditCustomerInformation";
const EditCaptureImageComp = React.lazy(() => import('./containers/customerDetails/captureimage/EditCaptureImage'))//"./containers/customerDetails/captureimage/EditCaptureImage";
const EditPreviewInformationComp = React.lazy(() => import('./containers/customerDetails/previewinformation/EditPreviewInformation'))//"./containers/customerDetails/previewinformation/EditPreviewInformation";
const ViewInformationComp = React.lazy(() => import('./containers/customerDetails/previewinformation/ViewInformation'))//"./containers/customerDetails/previewinformation/ViewInformation";
const HistoryComp = React.lazy(() => import('./containers/reports/History'))//"./containers/reports/History";
const Home = React.lazy(() => import('./containers/home/Home'))//"./containers/home/Home";
const PendingComp = React.lazy(() => import('./containers/reports/Pending'));
const CompletedComp = React.lazy(() => import('./containers/reports/Completed'));



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const authorization = async () => {
    if (location.pathname !== "/Register") {
      const getResponse = await get("http://localhost:8081/authorization");
      if (getResponse.status === 403) {
        navigate("/Unauthorized");
      }
    }
  };
  useEffect(() => {
    authorization();
    if (location.pathname !== "/Register") {
      const getToken = localStorage.getItem("token");
      if (!getToken) {
        navigate("/Login");
      } else {
        navigate(location.pathname || "");
      }
    }

  }, []);
  return (
    <Suspense fallback={<PageLoder className="full-height-width"/>}>
      <Container fluid>
      <Routes>
        <Route index path="Login" element={<Login />} />
        <Route index path="Register" element={<Register />} />
        <Route path="" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="CustomerDetails" element={<CustomerDetails />}>
            <Route index path="" element={<CustomerinformationCom />} />
            <Route path="CaptureImage" element={<CaptureImageComp />} />
            <Route
              path="PreviewInformation"
              element={<PreviewInformationComp />}
            />
            <Route
              path={`EditCustomerInformation/:id`}
              element={<EditCustomerInformationCom />}
            />
            <Route
              path={`EditCaptureImage/:id`}
              element={<EditCaptureImageComp />}
            />
            <Route
              path={`EditPreviewInformation/:id`}
              element={<EditPreviewInformationComp />}
            />
            <Route
              path={`ViewInformation/:id`}
              element={<ViewInformationComp />}
            />
          </Route>
          <Route path="Report" element={<ReportComp />} />
          <Route path="PendingTransactions" element={<PendingComp />} />
          <Route path="CompletedTransactions" element={<CompletedComp />} />
          <Route path={`History/:id`} element={<HistoryComp />} />
        </Route>
        <Route path="Unauthorized" element={<Unauthorized />} />
      </Routes>
    </Container>
    </Suspense>
    
  );
}

export default App;
