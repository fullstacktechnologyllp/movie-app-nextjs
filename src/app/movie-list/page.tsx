"use client";
import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function MovieList() {
    return (
        <Form>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group controlId="formBasicYear">
                <Form.Label>Publishing year</Form.Label>
                <Form.Control type="number" placeholder="Enter year" />
            </Form.Group>

            <Form.Group>
                {/* <Form.File id="exampleFormControlFile1" label="Drop an image here" /> */}
            </Form.Group>

            <Button variant="secondary" type="button">
                Cancel
            </Button>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
