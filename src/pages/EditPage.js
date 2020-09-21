import React, { useState, useEffect } from 'react';
import { Form, Segment, Grid } from 'semantic-ui-react';

const api_host = 'http://localhost:8080';

export const EditPage = () => {
    const [fiscalias, setFiscalias] = useState([]);
    const [id, setId] = useState(0);
    const [reload, setReload] = useState(true);

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    useEffect(() => {
        const fetchFiscalias = async () => {
            const response = await fetch(`${api_host}/mp/fiscalias`);
            const data = await response.json();
            setFiscalias(data.map((fiscalia) => {
                return {
                    key: fiscalia.id,
                    text: `${fiscalia.id} - ${fiscalia.nombre}`,
                    value: `${fiscalia.id} - ${fiscalia.nombre}`,
                }
            }));
        }

        setNombre("");
        setTelefono("");
        setDireccion("");

        fetchFiscalias();
    }, [reload]);

    useEffect(() => {
        console.log(`id ${id}`);

        const fetchFiscalia = async () => {
            const response = await fetch(`${api_host}/mp/fiscalias/${id}`);
            const data = await response.json();
            console.log(JSON.stringify(data));
            setNombre(data.nombre);
            setTelefono(data.telefono);
            setDireccion(data.direccion);
        }
        if (id === 0) return;
        fetchFiscalia();
    }, [id])

    function handleSelectOnChange (event, data) {
        setId((data.options?.find((d) => {return d.value === data.value}))?.key || 0)
    }

    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 800 }}>
                <Segment>
                    <Form>
                        <Form.Select
                            fluid
                            label="Id"
                            options={fiscalias}
                            onChange={handleSelectOnChange}
                        />
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
                            color="olive"
                            size="large"
                            onClick={ async (event) => {
                                
                                if (id === 0) {
                                    alert('Seleccione una fiscalia');
                                    return;
                                }
                                
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
                                const response = await fetch(`${api_host}/mp/fiscalias/${id}`, {
                                    method: 'PUT',
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
                                if (response.status === 201) {
                                    alert('Fiscalia actualizada');
                                    setReload(reload => !reload);
                                    setId(0);
                                } else {
                                    alert('Problema durante la actualización');
                                }
                            }}
                        >Actualizar</Form.Button>
                        <Form.Button
                            fluid
                            color="red"
                            size="large"
                            onClick={ async () => {
                                if (id === 0) {
                                    alert('Seleccione una fiscalia');
                                    return;
                                }
                                const response = await fetch(`${api_host}/mp/fiscalias/${id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                });
                                if (response.status === 200) {
                                    alert('Fiscalia eliminada');
                                    setReload(reload => !reload);
                                    setId(0);
                                } else {
                                    alert('Problema durante la eliminación');
                                }
                            }}
                        >Eliminar</Form.Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}