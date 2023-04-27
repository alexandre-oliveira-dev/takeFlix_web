import React from "react";

const Title = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height:"100px",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "max-content",
          color: props.color,
          fontSize: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {props.texto}
      </div>
    </div>
  );
};
export default Title;
