import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { useHistory, useParams } from "react-router-dom";

import { useTickets } from "../resources";
import { View } from "../ui";
import { TicketForm } from "../form";

const FullTicket = ({ className }) => {
  const { workspaceSlug, boardSlug, ticketSlug } = useParams();
  // TODO should we fetch only `ticketSlug` here?
  const { tickets, isLoading } = useTickets([
    "tickets",
    { workspaceSlug, boardSlug }
  ]);

  const history = useHistory();
  useEffect(() => {
    const onEscape = evt => {
      if (evt.key === "Escape") {
        history.goBack();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [history]);

  if (!tickets || isLoading) {
    return null;
  }

  const ticket = tickets.find(({ key }) => key === ticketSlug) || {}

  return (
    <View className={className}>
      <TicketForm {...ticket} onSubmit={() => history.goBack()} />
    </View>
  );
};

export default styled(FullTicket)`
  background-color: ${({ theme }) => theme.foreground};
  flex-direction: column;
  padding: 10px;
  height: 100%;
  min-width: 400px;
  max-width: 800px;
`;
