import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment, Modal } from "semantic-ui-react";
import calculateService from "../../utils/calculateService";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loader/Loader";

export default function HomePage({ user, handleSignUpOrLogin }) {

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    firstNumber: '',
    secondNumber: '',
  })

  const navigate = useNavigate()

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    for (let key in state){
      formData.append(key, state[key])
    }
    try {
      setLoading(true);
      await calculateService.add(formData)
      console.log('calculateService.add is done')
      setLoading(false);
      navigate('/stripe-onboard')
    } catch(err){
      setError(err.message)
    }
  }

  if (error) {
    return (
        <>
            <Header user={user} />
            <ErrorMessage error={error} />
        </>
    ) 
  }

if (loading) {
    return (
        <>
            <Header user={user} />
            <Loading />
        </>
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
                  name="firstNumber"
                  placeholder="First Number"
                  label="First Number"
                  value={state.firstNumber}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  fluid
                  type="number"
                  name="secondNumber"
                  placeholder="Second Number"
                  label="Second Number"
                  value={state.secondNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn">
                Add Two Numbers
              </Button>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
}