import React from "react";

export function PrimaryButton (props) {

  const button = {
    background: "#1136FC",
    borderRadius: "3px",
    padding: "12px 24px",
    color: "white",
    fontFamily: "sans-serif",
    fontSize: "18px",
    overflow: "hidden",
    whiteSpace: "nowrap",

  }

  return (
    <button style={button} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export function SecondaryButton (props) {

  const button = {
    border: "1px solid #1136FC",
    borderRadius: "3px",
    padding: "12px 24px",
    color: "#1136FC",
    fontFamily: "sans-serif",
    fontSize: "18px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    alignText: "center"
  }

  return (
    <button style={button} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export function TertiartyButton(props) {

  const button = {
    borderRadius: "3px",
    background: "#14ba49",
    padding: "12px 24px",
    color: "white",
    fontFamily: "sans-serif",
    fontSize: "18px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    alignText: "center"
  }

  return (
    <button style={button} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
