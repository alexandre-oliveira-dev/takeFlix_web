import React from "react";


const Title = (props) => {
    return (
        <h2 style={{
            color: props.color,
            fontSize: "30px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
            height: "100px",
            alignItems:"center"
        }}>
            {props.texto}
        </h2>
    )
}
export default Title;