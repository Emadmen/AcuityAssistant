import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatPage from "../ChatPage";

test("shows welcome text", () => {
  render(<ChatPage />);
  expect(screen.getByText(/What can I help you with/i)).toBeInTheDocument();
});

