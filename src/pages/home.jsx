import { Col, Container, Row } from "react-bootstrap";
import CardGenerator from "../components/cardGenerator";
import AuthorFooter from "../components/authorFooter";

const Home = () => {

  return (
    <>
      <Container className="vh-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col md={4}>
            <h4 className="text-center title">Password Generator</h4>
            <CardGenerator />
          </Col>
          <AuthorFooter />
        </Row>
      </Container>
    </>
  );
};

export default Home;
