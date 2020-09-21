import React, { useState } from 'react';
import { Form, Segment, Grid } from 'semantic-ui-react';

const api_host = 'http://localhost:8080';

export const CreatePage = () => {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 800 }}>
                <Segment>
                    <Form>
                        <Form.Input
                            fluid
                            label="Nombre"
                            type="text"
                            placeholder="Nombre completo"
                            value={nombre}
                            onChange={ (event) => {
                                if (event.target.value.length <= 100)
                                    setNombre(event.target.value.replace(/([^a-zA-ZáéíóúüÁÉÍÓÚÜ ])/,''));
                            }}
                        />
                        <Form.Input
                            fluid
                            label="Teléfono"
                            type="text"
                            placeholder="Teléfono"
                            value={telefono}
                            onChange={ (event) => {
                                if (event.target.value.length <= 8)
                                    setTelefono(event.target.value.replace(/\D/,''));
                            }}
                        />
                        <Form.Input
                            fluid
                            label="Dirección"
                            type="text"
                            placeholder="Dirección"
                            value={direccion}
                            onChange={ (event) => {
                                if (event.target.value.length <= 200)
                                    setDireccion(event.target.value);
                            }}
                        />
                        <Form.Button
                            fluid
                            color="green"
                            size="large"
                            onClick={ async (event) => {
                                
                                //Validaciones
                                if (nombre === "") {
                                    alert('Debe ingresar su nombre');
                                    return;
                                } else if (telefono === "") {
                                    alert('Debe ingresar su telefono');
                                    return;
                                } else if (direccion === "") {
                                    alert('Debe ingresar su direccion');
                                    return;
                                }

                                if (telefono.length !== 8) {
                                    alert('Ingrese exactamente los 8 digitos de su telefono');
                                    return;
                                }

                                console.log('Creando...');
                                const response = await fetch(`${api_host}/mp/fiscalias`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        "nombre": nombre,
                                        "telefono": telefono,
                                        "direccion": direccion
                                    })
                                });
                                console.log(`status: ${response.status}`);
                                if (response.status === 201){
                                    alert('Fiscalia creada');
                                    setNombre("");
                                    setTelefono("");
                                    setDireccion("");
                                } else {
                                    alert('Problema durante la creación');
                                }
                            }}
                        >Crear</Form.Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}