import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';

const Footer = () => {
  let today = new Date();
  return (
    <footer className="bg-dark text-light py-4 footer mt-lg-3">
        <Container>
            <Row>
                <Col xs={12} md={12} className="text-center">
                <p className="mb-0"> &copy; {today.getFullYear()}Bookify Hotel</p>
                </Col>
            </Row>
        </Container>
      
    </footer>

  )
}

export default Footer