/* eslint-disable import/named */
/* eslint-disable import/namespace */
import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModel: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
    // setting state in a verbose way
    //   this.setState({
    //       loading: false,
    //       name: json.pets[0].name,
    //       breed: json.pets[0].breed,
    //       animal:json.pets[0].animal,
    //   });
  }

  toggleModal = () => this.setState({ showModel: !this.state.showModel });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    const {
      animal,
      breed,
      city,
      state,
      description,
      name,
      images,
      showModel,
    } = this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          {/* class component context */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModel ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <ThemeContext.Consumer>
                  {([theme]) => (
                    <div className="buttons">
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.adopt}
                      >
                        Yes
                      </button>
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.toggleModal}
                      >
                        No, I am a monster!
                      </button>
                    </div>
                  )}
                </ThemeContext.Consumer>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
