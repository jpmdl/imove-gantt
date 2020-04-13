import styled, { css, createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

body {
  margin: 0;
  padding: 0;
  /*font-family: 'Dosis', sans-serif;*/
  font-family: 'Rajdhani', sans-serif;
}
`;

const appointmentPalette = {
  blue: "color: #286e84; background-color: #add8e6; border: 1px solid #3a9fbf;",
  red: "color: white; background-color: #d3091f; border: 1px solid #a20717;",
  green: "color: 2d7c31; background-color: #ace1af; border: 1px solid #41b447;",
  break: "color: grey; background-color: lightgrey; border: 1px dashed grey;",
};

const linkPalette = {
  green: "color: #004b00; border-bottom: 1px dotted #004b00;",
};

const firstColumnSize = "190px";

const chartPeriod = css`
  background-color: #d3091f;
  color: white;
  font-weight: bold;
  height: 30px;
  z-index: 2;
  grid-template-columns: ${({ columns }) =>
    `${firstColumnSize} repeat(${columns}, 1fr)`};
`;

const chartLines = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  grid-template-columns: ${({ columns }) =>
    `${firstColumnSize} repeat(${columns}, 1fr)`};
`;

const setStartAndFinish = css`
  /* properties for each item */
  grid-column: ${({ start, finish }) => `${start}/${finish}`};
`;

export const Container = styled.div`
  max-width: 100%;
  min-width: 95%;
  padding: 5px;
`;

export const Chart = styled.div`
  display: grid;
  position: relative;
  overflow: hidden;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${firstColumnSize} 1fr;
  background-color: white;
  border-right: 1px solid white;
  ${({ period }) => (period ? chartPeriod : null)}
  ${({ lines }) => (lines ? chartLines : null)}
`;

export const LineSpan = styled.span`
  display: block;
  z-index: 3;
  ${({ now }) => `
    &:nth-child(${now + 2}) {
      border-left: 1px solid red;
    }
  `}
`;

export const FirstColumnItem = styled.div`
  background-color: ${({ title }) => (title ? "#d3091f" : "lightgrey")};
  color: ${({ title }) => (title ? "white" : "grey")};
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  padding: 5px 15px;
  font-size: 15px;
  font-weight: ${({ title }) => (title ? "bold" : "unset")};
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const SecondColumnItem = styled.div`
  list-style: none;
  display: grid;
  padding: 5px 0;
  margin: 0;
  grid-template-columns: ${({ columns }) =>
    `repeat(${columns}, calc(100%/${columns}))`};
  border-bottom: 1px solid lightgrey;
`;

export const HeaderItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  min-height: 15px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  grid-column: ${({ start, finish }) => `${start + 2}/${finish + 2}`};

  &:last-child {
    border-right: 0;
  }
`;

export const Appointment = styled.span`
  text-align: ${({ lunch }) => (lunch ? "center" : "left")};
  font-size: 14px;
  max-height: 25px;
  padding: 2px 2px;
  margin: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border-top-left-radius: ${({ lunch }) => (lunch ? "0px" : "5px")};
  border-top-right-radius: ${({ lunch }) => (lunch ? "0px" : "5px")};
  ${({ color }) => `${appointmentPalette[color]}`}
  ${setStartAndFinish}
  z-index: 4;
`;

export const Link = styled.span`
  text-align: center;
  font-size: 9px;
  font-weight: 450px;
  max-height: 10px;
  padding: 10px 0px;
  color: #000;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  z-index: 5;
  ${({ color }) => `${linkPalette[color]}`}
  ${setStartAndFinish}
`;
