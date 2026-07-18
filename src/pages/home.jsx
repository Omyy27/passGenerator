import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardGenerator from "../components/cardGenerator";
import AuthorFooter from "../components/authorFooter";
import PasswordHistory from "../components/passwordHistory";
import BatchGenerator from "../components/batchGenerator";
import PasswordChecker from "../components/passwordChecker";
import usePasswordHistory from "../hooks/usePasswordHistory";

const TABS = [
  { key: "history", label: "History" },
  { key: "batch", label: "Batch" },
  { key: "checker", label: "Checker" },
];

const Home = () => {
  const { entries, addEntry, clearHistory, exportCSV } = usePasswordHistory();
  const [activeTab, setActiveTab] = useState(null);

  return (
    <Container style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Row className="justify-content-center flex-grow-1" style={{ paddingTop: "40px" }}>
        <Col md={4}>
          <h4 className="text-center title">Password Generator</h4>
          <CardGenerator onPasswordGenerated={addEntry} />

          <div className="d-flex gap-2 mt-4 justify-content-center">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`history-btn ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(activeTab === tab.key ? null : tab.key)}
                style={
                  activeTab === tab.key
                    ? { background: "var(--color-primary)", color: "var(--color-primary-text)" }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "history" && (
            <PasswordHistory entries={entries} clearHistory={clearHistory} exportCSV={exportCSV} />
          )}
          {activeTab === "batch" && (
            <BatchGenerator
              charOptions={{ uppercase: true, lowercase: true, numbers: true, symbols: true }}
              passwordLength={14}
              excludeAmbiguous={false}
            />
          )}
          {activeTab === "checker" && <PasswordChecker />}
        </Col>
      </Row>
      <Row>
        <Col>
          <AuthorFooter />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
