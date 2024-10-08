import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Banner from './Banner';
import CameraDescription from './CameraDescription';
import Register from './Register';
import ImagenA from './ImagenA';
import supabase from './supabase/supabaseClient';
import Footer from './Footer';
import Price from './Price'; 
import Beneficios from './Beneficios'; 
import MemoriaGratis from './MemoriaGratis';  
import DeteccionDeHumanos from './DeteccionDeHumanos';
import VisionNocturna from './VisionNocturna'; 



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const registerRef = useRef(null); // Referencia para el formulario de registro

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
    } else {
      setIsAuthenticated(false); // Actualiza el estado al cerrar sesión
    }
  };

  // Función para desplazar hacia el formulario de registro
  const scrollToRegister = () => {
    if (registerRef.current) {
      registerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <Header />

      {/* Sección ImagenA */}
      <Container fluid className="my-4">
          <Col xs={12} md={8}>
            <ImagenA 
              imagenSrc={`${process.env.PUBLIC_URL}/1.png`} 
              altTexto="Descripción de la imagen"
              scrollToRegister={scrollToRegister}
            />
          </Col>
      </Container>


 {/* Sección CameraDescription */}
<Container fluid className="my-4">
    <Col xs={12} md={8}>
      <CameraDescription 
        imageSrc={`${process.env.PUBLIC_URL}/1.png`} 
        buttonText="Ir al Registro"
        scrollToRegister={scrollToRegister}
      />
    </Col>
</Container>






      <Banner 
        title="¡Garantía de satisfacción! O la devolución de su dinero"
        description="Producto en caja original + 1 año de garantía por defectos de fábrica."
        buttonText="Ir al Registro"
        scrollToRegister={scrollToRegister}
      />


      {/* Agrega el componente Price aquí, antes del formulario de registro */}
        <Col xs={12} md={7}>
          <Price 
            title="Precio" 
            amount={165000} 
            imageSrc={`${process.env.PUBLIC_URL}/5.png`} 
            productDetails={[
              "Cámara en caja original",
              "Fuente de energía incluida",
              "Manual de instalación y base",
              "No contiene memoria micro SD",
              "Garantía de 1 año por defectos de fábrica"
            ]}
          />
        </Col>





        <Col xs={12} md={7}>
          <MemoriaGratis 
            title="Memoria Gratis con tu compra"
            imageSrc={`${process.env.PUBLIC_URL}/5.png`} 
            description="Obtén una memoria micro SD de 32GB gratis al comprar tu cámara de seguridad."
          />
        </Col>





      <Beneficios
        title=""
        description=""
        buttonText="Regístrate Ahora"
        scrollToRegister={scrollToRegister}
      />

<DeteccionDeHumanos 
  title="Detección de Humanos"
  imageSrc={`${process.env.PUBLIC_URL}/2.png`} 
  description="Esta función de detección de humanos permite reconocer y alertar sobre la presencia de personas en áreas sensibles, aumentando la seguridad y la supervisión."
  scrollToRegister={scrollToRegister} // Pasar la función aquí
/>



<VisionNocturna 
  title="Visión Nocturna"
  imageSrc={`${process.env.PUBLIC_URL}/3.png`} 
  description="La función de visión nocturna garantiza una supervisión constante, incluso en condiciones de poca luz, asegurando la seguridad en todo momento."
  scrollToRegister={scrollToRegister} // Pasar la función aquí
/>



<DeteccionDeHumanos 
  title="Detección de Humanos"
  imageSrc={`${process.env.PUBLIC_URL}/2.png`} 
  description="Esta función de detección de humanos permite reconocer y alertar sobre la presencia de personas en áreas sensibles, aumentando la seguridad y la supervisión."
  scrollToRegister={scrollToRegister} // Pasar la función aquí
/>

<VisionNocturna 
  title="Visión Nocturna"
  imageSrc={`${process.env.PUBLIC_URL}/3.png`} 
  description="La función de visión nocturna garantiza una supervisión constante, incluso en condiciones de poca luz, asegurando la seguridad en todo momento."
  scrollToRegister={scrollToRegister} // Pasar la función aquí
/>




    {/* Main content */}
<Container className="py-4" fluid>
  <Row className="justify-content-center">
    <Col xs={12} md={12}>
      <div ref={registerRef}>
        <Register />
      </div>
    </Col>
  </Row>
</Container>



      {/* Si el usuario está autenticado, mostrar botón de cerrar sesión */}
      {isAuthenticated && (
        <div className="text-center mb-4">
          <Button variant="danger" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
