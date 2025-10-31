import React from "react";

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: "",
      author: "",
      isLoading: true,
      error: null,
      quoteCount: 0,
    };

    this.fallbackQuotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
      },
      {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
      },
      {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
      },
      {
        text: "Be the change that you wish to see in the world",
        author: "Mahatma Gandhi.",
      },
      {
        text: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde",
      },
      {
        text: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein",
      },
      {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        author: "Ralph Waldo Emerson",
      },
    ];

    this.fetchQuote = this.fetchQuote.bind(this);
  }

  componentDidMount() {
    this.fetchQuote();
    // this.fetchQuote();
  }

  fetchQuote() {
    this.setState({
      quote:
        "Success is a marathon not a sprint. So let’s keep grinding, mastering skills and impacting lives - Our hustle will pay off.",
      author: "Abdul",
      isLoading: true,
      error: null,
    });
    //     replace this with api call
    fetch("https://api.quotable.io/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API unavailable");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          quote: data.content,
          author: data.author,
          isLoading: false,
          error: null,
          quoteCount: this.state.quoteCount + 1,
        });
      })
      .catch((error) => {
        // console.log("using fallback quotes");

        const randomQuote =
          this.fallbackQuotes[
            Math.floor(Math.random() * this.fallbackQuotes.length)
          ];

        this.setState((prevState) => ({
          quote: randomQuote.text,
          author: randomQuote.author,
          isLoading: false,
          error: "Offline mode - Using local quotes",
          quoteCount: prevState.quoteCount + 1,
        }));
      });
  }

  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>💫 Daily Motivation</h1>
        <h2
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "40px",
            fontSize: "16px",
          }}
        >
          Quote #{this.state.quoteCount} • Get inspired every day!
        </h2>
        <div id="quote-box">
          <div id="text">
            <h1>{this.state.quote}</h1>
          </div>
          <div id="author">
            <h3>{this.state.author}</h3>
          </div>
          <div className="btn">
            <button id="new-quote" onClick={this.fetchQuote}>
              🎲 Get New Quote
            </button>
            <button>
              <a
                id="tweet-quote"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `"${this.state.quote}" - ${this.state.author}`
                )}`}
                target="_blank"
              >
                <i className="fa-brands fa-square-x-twitter"></i>
                Tweet Quote
              </a>
            </button>
          </div>
        </div>
        <p
          className="footer"
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#666",
            marginTop: "40px",
          }}
        >
          Thank you for checking this out
          <strong> {this.props.user} </strong>
        </p>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="span">
          <>{Date()}</>
          <h4>
            developed by{" "}
            <a href="https://x.com/techftabdul" target="_blank">
              {" "}
              abdul
            </a>
          </h4>
        </div>
        <RandomQuoteMachine user="estemeed user" />
      </div>
    );
  }
}

export default App;
