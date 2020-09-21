import React, { useState, useEffect } from 'react';
import { Segment, Grid, Table } from 'semantic-ui-react';

const api_host = 'http://localhost:8080';

export const ViewAllPage = () => {
    const [fiscalias, setFiscalias] = useState([]);

    useEffect(() => {
        const fetchFiscalias = async () => {
            const response = await fetch(`${api_host}/mp/fiscalias`);
            const data = await response.json();
            setFiscalias(data.map((fiscalia) => {
                return {
                    id: fiscalia.id,
                    nombre: fiscalia.nombre,
                    telefono: fiscalia.telefono,
                    direccion: fiscalia.direccion
                }
            }));
        }

        fetchFiscalias();
    }, []);

    

    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 800 }}>
                <Segment inverted>
                    
                    <Table celled inverted selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Id</Table.HeaderCell>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>Teléfono</Table.HeaderCell>
                                <Table.HeaderCell>Dirección</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {
                            fiscalias.map((fiscalia, index) => {
                                return (<Table.Row key={fiscalia.id}>
                                    <Table.Cell>{fiscalia.id}</Table.Cell>
                                    <Table.Cell>{fiscalia.nombre}</Table.Cell>
                                    <Table.Cell>{fiscalia.telefono}</Table.Cell>
                                    <Table.Cell>{fiscalia.direccion}</Table.Cell>
                                </Table.Row>)
                            })
                        }
                        </Table.Body>
                        
                    </Table>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}