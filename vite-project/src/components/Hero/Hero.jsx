import React from "react";
import "./Hero.css";
import cardFront from "/bg-card-front.png";
import cardBack from "/bg-card-back.png";
import logo from "/card-logo.svg";
import tick from "/icon-complete.svg";
import { useState } from "react";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  const [save, setSave] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("2023-01");
  const [cvc, setCvc] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Checking for empty fields
    if (name.trim() === "" || cardNumber.trim() === "" || cvc.trim() === "") {
      toast.error("Input fields are empty!", { position: "top-right" });
      return;
    }

    // Checking for correct formats
    const cardNumberRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      toast.error("wrong format, numbers only!", { position: "top-right" });
      return;
    }
    const cvcRegex = /^\d{3}$/;
    if (!cvcRegex.test(cvc)) {
      toast.error("Enter a valid cvv", { position: "top-right" });
      return;
    }

    // If all validations pass, update the states
    setConfirmed(true);
    toast.success("Your details have been saved", { position: "top-right" });
    setSave(true);
  };

  return (
    <main>
      <div className="left-hero">
        <div className="card-front">
          <img src={cardFront} />
          <div className="texts">
            <span className="card-no">
              {" "}
              {save ? cardNumber : "0000 0000 0000 0000"}{" "}
            </span>
            <img src={logo} alt="logo" />
          </div>

          <div className="lower-text">
          <p className="card-name"> {save ? name.toUpperCase() : "FELICIA LEIRE"}</p>


            <span className="expiry"> {format(new Date(date), "MM / yy")}</span>
          </div>
        </div>

        <div className="card-back">
          <img src={cardBack} alt="back" />
          <div className="cvv">
            <span className="cvc"> {save ? cvc : "000"} </span>
          </div>
        </div>
      </div>

      <div className="right-hero">
        <div className="container">
          {!confirmed && (
            <form>
              <div class="form-group">
                <label for="cardholder">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholder_name"
                  id="cardholder_name"
                  placeholder="e.g. Jane Appleseed"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="cardnumber">Card Number</label>
                <input
                  type="text"
                  name="card_number"
                  id="card_number"
                  placeholder="e.g. 1234 5678 9123 0000"
                  required
                  maxLength={19}
                  value={cardNumber
                    .replace(/\s/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>

              <div class="last-div">
                <div className="exp">
                  <label for="expiration">Exp. Date (MM / YY)</label>

                  <label className="cvv" for="cvv">
                    CVV
                  </label>

                  <div className="inputs">
                    <input
                      type="month"
                      name="expiry_date"
                      id="expiry_date"
                      placeholder="MM YY"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />

                    <input
                      className="cvv"
                      type="text"
                      name="cvc"
                      id="cvc"
                      placeholder="e.g. 123"
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button onClick={handleSubmit}>Confirm</button>
              </div>
            </form>
          )}
          {confirmed && <ThankYou setConfirmed={setConfirmed} />}
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Hero;




function ThankYou({ setConfirmed }) {
  const handleContinue = () => {
    setConfirmed(false);
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="complete">
      <img src={tick} alt="" className="tick" />
      <h1>Thank you!</h1>
      <p>We've added your card details</p>
      <button onClick={handleContinue} className="btn">
        Continue
      </button>
    </div>
  );
}

