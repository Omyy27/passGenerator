import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardGenerator from "../components/cardGenerator";
import PasswordHistory from "../components/passwordHistory";
import BatchGenerator from "../components/batchGenerator";
import PasswordChecker from "../components/passwordChecker";
import TabBar from "../components/tabBar";
import ToolsMenu, { ArrowLeftIcon } from "../components/toolsMenu";
import usePasswordHistory from "../hooks/usePasswordHistory";

const Home = () => {
  const { entries, addEntry, clearHistory, exportCSV } = usePasswordHistory();
  const [activeTab, setActiveTab] = useState("generator");
  const [activeTool, setActiveTool] = useState(null);

  return (
    <Container style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: 0 }}>
      <Row className="justify-content-center flex-grow-1" style={{ paddingTop: "40px", paddingBottom: "80px", overflow: "auto", margin: 0 }}>
        <Col md={4}>
          {activeTab === "generator" && (
            <>
              <h4 className="text-center title mb-3">Password Generator</h4>
              <CardGenerator onPasswordGenerated={addEntry} />
            </>
          )}
          {activeTab === "history" && (
            <>
              <h4 className="text-center title mb-3">Password History</h4>
              <PasswordHistory entries={entries} clearHistory={clearHistory} exportCSV={exportCSV} />
            </>
          )}
          {activeTab === "tools" && (
            <>
              {activeTool === null && (
                <>
                  <h4 className="text-center title mb-3">Tools</h4>
                  <ToolsMenu onSelect={setActiveTool} />
                </>
              )}
              {activeTool === "checker" && (
                <>
                  <button type="button" className="tools-back-btn" onClick={() => setActiveTool(null)}>
                    <ArrowLeftIcon /> Back
                  </button>
                  <h4 className="text-center title mb-3">Password Checker</h4>
                  <PasswordChecker />
                </>
              )}
              {activeTool === "batch" && (
                <>
                  <button type="button" className="tools-back-btn" onClick={() => setActiveTool(null)}>
                    <ArrowLeftIcon /> Back
                  </button>
                  <h4 className="text-center title mb-3">Batch Generator</h4>
                  <BatchGenerator
                    charOptions={{ uppercase: true, lowercase: true, numbers: true, symbols: true }}
                    passwordLength={14}
                    excludeAmbiguous={false}
                  />
                </>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000, margin: 0 }}>
        <Col className="p-0">
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
