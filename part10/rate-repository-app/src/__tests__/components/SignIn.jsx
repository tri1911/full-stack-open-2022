import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // create the mock function
      const mockFn = jest.fn();

      // render the SignInContainer component,
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={mockFn} />
      );

      // fill the text inputs
      fireEvent.changeText(getByPlaceholderText("Username"), "kalle");
      fireEvent.changeText(getByPlaceholderText("Password"), "password");
      // and press the submit button
      fireEvent.press(getByText("Sign in"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once
        expect(mockFn).toHaveBeenCalledTimes(1);
        // and with a correct first argument
        expect(mockFn.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
