import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import {
  GlobalStyle,
  Container,
  Chart,
  Row,
  FirstColumnItem,
  LineSpan,
  SecondColumnItem,
  HeaderItem,
  Appointment,
  Link,
} from "./GanttApp.styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";

import { data } from "./data";

// each timeslot of chart
const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

// distinct teams
const teams = [...new Set(data.map(({ team }) => team))];

const Header = () => (
  <React.Fragment>
    <Row columns={diffMins} period>
      <FirstColumnItem title>iMOVE Dispatch Map</FirstColumnItem>
      {hours.map((hour, id) => (
        <HeaderItem key={id} start={id * 60} finish={id * 60 + 60}>
          {`${hour}:00 - ${hour + 1}:00`}
        </HeaderItem>
      ))}
    </Row>
  </React.Fragment>
);

const diffMins =
  (new Date(new Date().setHours(22, 0, 0, 0)) -
    new Date(new Date().setHours(7, 0, 0, 0))) /
  1000 /
  60; // milliseconds between endTime and initTime
const columns = new Array(diffMins).fill(0);

const firstNow = Math.floor(
  (new Date() - new Date(new Date().setHours(7, 0, 0, 0))) / 1000 / 60
);

const getDate = (date) => {
  const time = date.split("T")[1];
  return new Date(
    new Date().setHours(
      parseInt(time.split(":")[0]),
      parseInt(time.split(":")[1]),
      parseInt(time.split(":")[2])
    )
  );
};

const getMinutesFromDate = (date) =>
  Math.floor(
    (getDate(date) - new Date(new Date().setHours(7, 0, 0, 0))) / 1000 / 60
  );

// const getMinutesFromDate = (date) =>
//   Math.floor(
//     (new Date(Date.parse(date)) - new Date(new Date().setHours(7, 0, 0, 0))) /
//       1000 /
//       60
//   );

const debug = false;

function GanttApp() {
  const [now, setNow] = useState(firstNow);

  // setInterval(
  //   () =>
  //     setNow(
  //       Math.floor(
  //         (new Date() - new Date(new Date().setHours(7, 0, 0, 0))) / 1000 / 60
  //       )
  //     ),
  //   20000
  // );

  return (
    <Container>
      <GlobalStyle />
      {debug ? null : (
        <Chart>
          <Header />
          <Row columns={diffMins + 1} lines>
            {columns.map((_, id) => (
              <LineSpan key={id} now={now} />
            ))}
          </Row>
          {teams.map((team, id) => (
            <Row key={id}>
              <FirstColumnItem>{team}</FirstColumnItem>
              <SecondColumnItem columns={diffMins}>
                {data
                  .filter((item) => item.team === team)
                  .map((order) => {
                    const diff =
                      getMinutesFromDate(order.finish) -
                      getMinutesFromDate(order.start);
                    return order.link ? (
                      diff > 0 ? (
                        <React.Fragment key={order.id}>
                          <Link
                            start={getMinutesFromDate(order.start)}
                            finish={getMinutesFromDate(order.finish)}
                            color="green"
                            data-tip
                            data-for={order.id.toString()}
                          >
                            {diff}
                          </Link>
                          <ReactTooltip
                            id={order.id.toString()}
                            place="top"
                            type="light"
                            border
                            borderColor="grey"
                          >
                            <p>
                              <FontAwesomeIcon icon={faCarSide} />
                              {"   " + diff + " minutos"}
                            </p>
                          </ReactTooltip>
                        </React.Fragment>
                      ) : null
                    ) : (
                      <React.Fragment key={order.id}>
                        <Appointment
                          start={getMinutesFromDate(order.start)}
                          finish={getMinutesFromDate(order.finish)}
                          color={
                            order.break
                              ? "break"
                              : order.scheduled
                              ? "green"
                              : "blue"
                          }
                          lunch={order.break}
                          data-tip
                          data-for={order.id.toString()}
                        >
                          {order.break ? (
                            <React.Fragment>
                              <FontAwesomeIcon icon={faCoffee} />
                              {"   " + order.order}
                            </React.Fragment>
                          ) : (
                            order.order
                          )}
                        </Appointment>
                        <ReactTooltip
                          id={order.id.toString()}
                          place="top"
                          border={!order.break}
                          borderColor={order.scheduled ? "green" : "darkblue"}
                          type={
                            order.break
                              ? "dark"
                              : order.scheduled
                              ? "success"
                              : "info"
                          }
                        >
                          <p>
                            <FontAwesomeIcon
                              icon={order.break ? faCoffee : faFileAlt}
                            />
                            {"   " + order.order}
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faClock} />
                            {"   " + order.start.replace("T", " ")}
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faClock} />
                            {"   " + order.finish.replace("T", " ")}
                          </p>
                        </ReactTooltip>
                      </React.Fragment>
                    );
                  })}
              </SecondColumnItem>
            </Row>
          ))}
        </Chart>
      )}
    </Container>
  );
}

export default GanttApp;
