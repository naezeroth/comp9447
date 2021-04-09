import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "../Overview.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import ButtonAppBar from "../buttonAppBar";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import { Hidden, NativeSelect } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CreateFlow2 from "./CreateFlow2";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
        margin: "dense",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CreateFlow1(props) {
    const classes = useStyles();
    const [state, setState] = useState({ name: "", resourceName: "" });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    React.useEffect(() => {
        if (props.onChange) {
            console.log("inside useEffect createFlow1", state);
            props.onChange(state);
        }
    }, [state.name, state.resourceName]);

    return (
        <div>
            <div>
                <ButtonAppBar />
            </div>
            <div style={styles.dropDown}>
                <ul class="navBar">
                    <li>
                        <a href="./Home">Home</a>
                    </li>
                    <li>
                        <a href="./">Services</a>
                    </li>
                    <li>
                        <a href="./Overview">Overview</a>
                    </li>
                    <li>
                        <a href="./">History</a>
                    </li>
                </ul>
            </div>
            <Container>
            {/* <Typography
                style={{
                    textAlign: "left",
                    fontFamily: "sans-serif",
                    fontSize: "25px",
                    marginLeft: "18vh",
                    marginTop: "4vh",
                }}
            >
                Create a Flow:
            </Typography>         */}
            <Container style={styles.flowCard}>
            <Card variant="filled" style={{backgroundColor: "#C4C4C4",borderRadius: 10, paddingBottom: 25}}>
            <CardHeader style={{color: "white", backgroundColor:"#4D4D4D" ,borderRadius: 10, }}
            title="Create a Flow"
            />                                                   
                {/* <Typography
                    style={{
                        textAlign: "center",
                        fontFamily: "sans-serif",
                        fontSize: "35px",
                    }}
                >
                    Select resource
                </Typography> */}

                <TextField
                    value={state.name}
                    onChange={handleChange}
                    inputProps={{
                        name: "name",
                    }}
                    style={{
                        minWidth: 400,
                        margin: "dense",
                        marginTop: "10vh",
                        fontSize: "20px",
                    }}
                    id="standard-helperText"
                    label="Name"
                    variant="filled"
                    helperText="Enter a name for your flow"
                    // color="secondary
                />
                <div style={{ alignItems: "center", marginTop: "10vh" }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            variant="outlined"
                            htmlFor="resourceName-native-helper">
                            Resource
                        </InputLabel>
                        <NativeSelect
                            value={state.resourceName}
                            onChange={handleChange}
                            inputProps={{
                                name: "resourceName",
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={"EC2"}>EC2</option>
                            <option value={"IAM"}>IAM</option>
                            <option value={"S3"}>S3</option>
                        </NativeSelect>

                        <FormHelperText>
                            Select the resource name
                        </FormHelperText>
                    </FormControl>
                </div>
                <Button
                    onClick={(event) => props.setState("CreateFlow2")}
                    style={{ marginTop: "10vh", backgroundColor: "#F9B15D", borderRadius: 10, padding: 20, }}
                >
                    {" "}
                    Continue{" "}
                </Button>
                </Card> 
            </Container>
            </Container>
        </div>
    );
}

const styles = {
    title: {
        backgroundColor: "#12293B",
        position: "static",
    },

    headerBar: {
        display: "flex",
        // justifyContent: "space-between",
        // flexFlow: "row wrap",
    },

    acName: {
        color: "inherit",
        float: "right",
    },

    menuList: {
        float: "right",
    },

    containerS: {
        backgroundColor: "#C4C4C4",
        Bottom: 0,
        height: "100%"
    },
    
    flowCard: {
        marginTop: "10%",
        },
};