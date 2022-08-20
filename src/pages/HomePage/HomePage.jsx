import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment, Modal } from "semantic-ui-react";
import calculateService from "../../utils/calculateService";
import Loading from "../../components/Loader/Loader";

export default function HomePage({ user, handleSignUpOrLogin }) {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [numbers, setNumbers] = useState({
        first: '',
        second: '',
    })
    const [sum, setSum] = useState();

    function handleChange(e){
        setNumbers({
        ...numbers,
        [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        fetch("/api/calculate/add", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify(numbers),
        })
        .then(res => res.json())
        .then(
            (result) => {
                setLoading(false);
                setSum(result.sum);
            },
            (error) => {
                setLoading(false);
                setError(error);
            })
    }

    function handleClear() {
        
    }

    if (error) {
        return (
            <ErrorMessage error={error} />
        ) 
    }

    if (loading) {
        return (
            <Loading />
        ) 
    }

    return (
        <>
        <Grid style={{ height: "100vh" }} verticalAlign="middle" centered>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
                Adding Two Numbers
            </Header>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Segment stacked>
                <Form.Group widths='equal'>
                    <Form.Input
                    fluid
                    type="number"
                    name="first"
                    placeholder="First Number"
                    label="First Number"
                    value={numbers.first}
                    onChange={handleChange}
                    required
                    />
                    <Form.Input
                    fluid
                    type="number"
                    name="second"
                    placeholder="Second Number"
                    label="Second Number"
                    value={numbers.second}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Button type="submit" className="btn">
                    Add Two Numbers
                </Button>
                <Button onClick={handleClear} className="btn">
                    Clear
                </Button>
                </Segment>
                {error ? <ErrorMessage error={error} /> : null}
            </Form>
            { sum && 
                <Header as="h2" textAlign="center">
                    Solution: {sum}
                </Header>
            }
            </Grid.Column>
        </Grid>
        </>
    );
}