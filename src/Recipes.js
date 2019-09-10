import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query =   gql`
    query recipes($vegetarian: Boolean!) {
      recipes(vegetarian: $vegetarian) {
        id
        title
      }
    }
  `;

class Recipes extends Component {

  state = {
    vegetarian: false
  }

  updateVegetarian = ({target: { checked} }) => {
    this.setState({ vegetarian: checked });
  }

  render() {
    return (
      <React.Fragment>
        <label>
          <input
            type="checkbox"
            checked={this.state.vegetarian}
            onChange={this.updateVegetarian}
          />
          <span> Only Vegetarian </span>
        </label>
        <Query
          query={query}
          variables={{ vegetarian: this.state.vegetarian }}
        >

        {({ data, loading, error }) => {
          if (loading) return <p> loading </p>;
          if (error) return <p> error </p>;

          return (
            <ul>
              {
                data.recipes.map(({id, title}) =>
                  <li key={id}> {title} </li>
                )
              }
            </ul>
          )
        }}

        </Query>
      </React.Fragment>
    )
  }
}

export default Recipes;