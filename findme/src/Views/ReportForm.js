import React from 'react';
import NavBar from "../components/NavBar";
import FooterContent from "../components/FooterContent"
import {FormControl, Row, Col, Form, InputGroup, Card, Button} from "react-bootstrap";
import axios from "../api/axios";

class ReportForm extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {
                itemName: "", category: "", value: "", desc: "",
                firstName: "", lastName: "", date: "", phone: "", time: "", email: "", ID: "", AUID: ""
            },
            errors: {},
            inputValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }


    formatPhoneNumber(value) {
        // if input value is falsy eg if the user deletes the input, then just return
        if (!value) return value;
        console.log(value);
        // clean the input for any non-digit values.
        const phoneNumber = value.replace(/[^\d]/g, "");

        // phoneNumberLength is used to know when to apply our formatting for the phone number
        const phoneNumberLength = phoneNumber.length;

        // we need to return the value with no formatting if its less then four digits
        // this is to avoid weird behavior that occurs if you  format the area code to early
        if (phoneNumberLength < 4) return phoneNumber;

        // if phoneNumberLength is greater than 4 and less the 7 we start to return
        // the formatted number
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        // finally, if the phoneNumberLength is greater then seven, we add the last
        // bit of formatting and return it.
        return (`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`);
    }


    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({input});

    }


    handleInput(event) {
        let input = this.state.input;
        input[event.target.name] = this.formatPhoneNumber(event.target.value);
        this.setState({input});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validate()) {

            let input = {};
            input["itemName"] = "";
            input["category"] = "";
            input["value"] = "";
            input["location"] = "";
            input["desc"] = "";
            input["firstName"] = "";
            input["lastName"] = "";
            input["date"] = "";
            input["phone"] = "";
            input["time"] = "";
            input["email"] = "";


            const response = axios.post('/api/insertLost', JSON.stringify(this.state.input), {
                headers: {'Content-Type': 'application/json'},
            })
            this.setState({input: input});
            alert('Item has been submitted!');
        }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["itemName"]) {
            isValid = false;
            errors["itemName"] = "Please enter item name.";
        }
        if (!input["category"]) {
            isValid = false;
            errors["category"] = "Please pick a category.";
        }

        if (!input["desc"]) {
            isValid = false;
            errors["desc"] = "Please enter a small description.";
        }
        if (!input["value"]) {
            isValid = false;
            errors["value"] = "Enter Estimate of Item's Value.";
        }
        if (typeof input["value"] !== "undefined") {

            const pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(input["value"])) {
                isValid = false;
                errors["value"] = "Please enter only numbers without any characters.";
            }
        }
        if (!input["firstName"]) {
            isValid = false;
            errors["firstName"] = "Please enter your first name.";
        }
        if (!input["lastName"]) {
            isValid = false;
            errors["lastName"] = "Please enter your last name.";
        }
        if (!input["date"]) {
            isValid = false;
            errors["date"] = "Please enter a date.";
        }
        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email address.";
        }

        if (typeof input["email"] !== "undefined") {

            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }


        this.setState({
            errors: errors
        });

        return isValid;
    }


    render() {
        return (
            <div className="ReportBackground">
                <NavBar/>

                <br/>
                <div className={"container"}>
                    <Card className={"container"}
                          style={{width: "80%", background: "#fff"}}>
                        <br/>
                        <h1 className={"fw-bold text-center"}>AU Lost 'N' Found Report From</h1>
                        <form style={{background: "#fff"}}>

                            <Row className="centered">
                                <Col className="smallLabel">
                                    <Form.Label>Item Information</Form.Label>
                                </Col>
                            </Row>

                            {/* Item Information Section [Item Lost/Item Category] */}
                            <Row>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Group as={Col} controlId="formGridItemName">
                                        <Form.Label>Item Name</Form.Label>
                                        <Form.Control type="email" placeholder="Ex: Black Iphone, Red Beanie..."/>
                                    </Form.Group>
                                </Col>

                                <Col xs={"12"} md={"6"}>
                                    <Form.Group as={Col} controlId="fromGridItemCategory">
                                        <Form.Label>Item Category</Form.Label>
                                        <select className="form-select" id="inputGroupSelect04"
                                                name="category"
                                                onChange={this.handleChange}
                                                aria-label="Example select with button addon">
                                            <option defaultValue="">---Categories---</option>
                                            <option value="electronic">Electronic</option>
                                            <option value="clothing">Clothing</option>
                                            <option value="accessory">Accessory</option>
                                            <option value="key">Key</option>
                                            <option value="id">Identification</option>
                                            <option value="misc">Misc</option>
                                        </select>
                                        <div className="text-danger">{this.state.errors.category}</div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Label>Item Value</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl name="value" value={this.state.input.value}
                                                     onChange={this.handleChange}
                                                     aria-label="Amount (to the nearest dollar)"/>
                                        <InputGroup.Text>.00</InputGroup.Text>
                                    </InputGroup>
                                    <div className="text-danger">{this.state.errors.value}</div>
                                </Col>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Label>Location Item Was Lost</Form.Label>
                                    <select className="form-select" id="inputGroupSelect05"
                                            name="location"
                                            onChange={this.handleChange}
                                            aria-label="Example select with button addon">
                                        {this.props.locations.map((i) => (
                                            <option key={i} value={i}>{i}</option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Group>
                                        <Form.Label>Date Lost</Form.Label>
                                        <Form.Control type="date" name="date" onChange={this.handleChange}
                                                      value={this.state.input.date}/>
                                        <div className="text-danger">{this.state.errors.date}</div>
                                    </Form.Group>
                                </Col>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Group>
                                        <Form.Label>Time Lost (Estimate)</Form.Label>
                                        <Form.Control type="time" name="time" onChange={this.handleChange}
                                                      value={this.state.input.time}></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Lost Item Description</Form.Label>
                                        <Form.Control as="textarea" rows="3" name="description"
                                                      onChange={this.handleChange}
                                                      value={this.state.input.description}/>
                                        <div className="text-danger">{this.state.errors.description}</div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/*    REPORTER INFORMATION SECTION */}
                            <Row className="centered">
                                <Col className="smallLabel">
                                    <Form.Label>Reporter Information</Form.Label>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <FormControl type="text"
                                                     name="firstName"
                                                     value={this.state.input.firstName}
                                                     onChange={this.handleChange}
                                                     maxLength="35"
                                                     placeholder="Enter First Name"/>
                                        <div className="text-danger">{this.state.errors.firstName}</div>
                                    </Form.Group>
                                </Col>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <FormControl type="text"
                                                     name="lastName"
                                                     maxLength="35"
                                                     value={this.state.input.lastName}
                                                     onChange={this.handleChange}
                                                     placeholder="Enter Last Name"/>
                                        <div className="text-danger">{this.state.errors.lastName}</div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Group>
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email"
                                                      name="email"
                                                      value={this.state.input.email}
                                                      onChange={this.handleChange}
                                                      maxLength="50"
                                                      placeholder="Enter Email">
                                        </Form.Control>
                                        <Form.Text className="form-text text-muted">
                                            *Please use your AU email address if possible.
                                        </Form.Text>
                                        <div className="text-danger">{this.state.errors.email}</div>
                                    </Form.Group>
                                </Col>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Group>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="input" name="phone" onChange={this.handleInput}
                                                      value={this.state.input.phone} placeholder="(123) 456-7890"/>
                                        <div className="text-danger">{this.state.errors.phone}</div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row md={2}>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Group>
                                        <Form.Label>Driver's License/State ID (Optional)</Form.Label>
                                        <Form.Control type="input" name="ID"
                                                      onChange={this.handleChange}
                                                      value={this.state.input.ID}
                                                      maxLength="20"
                                                      placeholder="Enter Driver's License/State ID"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={"12"} md={"6"}>
                                    <Form.Group>
                                        <Form.Label>AU ID (Optional)</Form.Label>
                                        <Form.Control type="input"
                                                      name="AUID"
                                                      onChange={this.handleChange}
                                                      maxLength="20"
                                                      value={this.state.input.AUID}
                                                      placeholder="Enter AU ID"/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <br/>
                            <Row md={2}>
                                <Col>
                                    <Button variant={"danger"} type={"reset"} className={"float-end"}>Clear
                                        Fields</Button>
                                </Col>
                                <Col>
                                    <Button variant={"primary"} type={"submit"} className={"float-start"}>Submit
                                        Form</Button>
                                </Col>
                            </Row>

                        </form>
                        <br/>
                    </Card>
                </div>

                <br/>

                <FooterContent/>
            </div>
        )
    }
}

export default ReportForm;
